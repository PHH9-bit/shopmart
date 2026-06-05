import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const verificationCodes = new Map();
const loginLogPath = path.join(process.cwd(), 'login-logs.json');

// تابع ذخیره لاگ لاگین
const saveLoginLog = (email: string, role: string) => {
  try {
    let logs: any[] = [];
    
    if (fs.existsSync(loginLogPath)) {
      const data = fs.readFileSync(loginLogPath, 'utf-8');
      logs = JSON.parse(data);
    }
    
    logs.push({
      email,
      role,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('fa-IR'),
    });
    
    fs.writeFileSync(loginLogPath, JSON.stringify(logs, null, 2));
    console.log(`✅ لاگین ثبت شد: ${email} - ${new Date().toLocaleString('fa-IR')}`);
  } catch (error) {
    console.error('خطا در ذخیره لاگ:', error);
  }
};

const getTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ SMTP_USER یا SMTP_PASS در .env.local تنظیم نشده است');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ==================== ارسال کد ====================
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'ایمیل معتبر وارد کنید' },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    if (!transporter) {
      return NextResponse.json(
        { error: 'تنظیمات ایمیل مشکل دارد' },
        { status: 500 }
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    verificationCodes.set(email, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await transporter.verify();
    console.log('✅ اتصال SMTP برقرار شد');

    await transporter.sendMail({
      from: `"شاپ‌مارت" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'کد تایید ورود به شاپ‌مارت',
      html: `
        <div dir="rtl" style="font-family: Tahoma, sans-serif; text-align: center;">
          <h2 style="color: #3b82f6;">کد ورود شما</h2>
          <div style="font-size: 32px; background: #f3f4f6; padding: 20px; border-radius: 12px;">
            <strong>${code}</strong>
          </div>
          <p>این کد تا ۱۰ دقیقه اعتبار دارد.</p>
        </div>
      `,
    });

    console.log(`✅ ایمیل به ${email} ارسال شد - کد: ${code}`);

    return NextResponse.json({
      success: true,
      message: 'کد تایید ارسال شد'
    });

  } catch (error: any) {
    console.error('❌ خطا در ارسال کد:', error.message);
    return NextResponse.json(
      { error: `خطا: ${error.message}` },
      { status: 500 }
    );
  }
}

// ==================== تایید کد ====================
export async function PUT(request: Request) {
  try {
    const { email, code } = await request.json();

    const stored = verificationCodes.get(email);

    if (!stored) {
      return NextResponse.json(
        { error: 'کد نامعتبر است. ابتدا درخواست کد جدید دهید.' },
        { status: 400 }
      );
    }

    if (stored.code !== code) {
      return NextResponse.json(
        { error: 'کد اشتباه است. دوباره تلاش کنید.' },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expiresAt) {
      verificationCodes.delete(email);
      return NextResponse.json(
        { error: 'کد منقضی شده است. درخواست کد جدید دهید.' },
        { status: 400 }
      );
    }

    verificationCodes.delete(email);

    const adminEmail = process.env.ADMIN_EMAIL || 'p.h.h.d.b.a20911911@gmail.com';
    const role = email === adminEmail ? 'admin' : 'user';

    // ثبت لاگ لاگین
    saveLoginLog(email, role);

    const token = jwt.sign(
      { email, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: { email, role }
    });

  } catch (error: any) {
    console.error('❌ خطا در تایید کد:', error.message);
    return NextResponse.json(
      { error: 'خطای داخلی سرور' },
      { status: 500 }
    );
  }
}