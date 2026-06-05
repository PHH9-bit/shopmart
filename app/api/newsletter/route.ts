import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// مسیر فایل ذخیره‌سازی
const filePath = path.join(process.cwd(), 'subscribers.json');

// خواندن لیست اعضا از فایل
const readSubscribers = (): string[] => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
  return [];
};

// نوشتن لیست اعضا در فایل
const writeSubscribers = (subscribers: string[]) => {
  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
  console.log(`✅ ذخیره شد: ${subscribers.length} عضو در خبرنامه`);
};

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'لطفاً یک ایمیل معتبر وارد کنید' },
        { status: 400 }
      );
    }

    let subscribers = readSubscribers();

    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'این ایمیل قبلاً در خبرنامه ثبت شده است' },
        { status: 400 }
      );
    }

    subscribers.push(email);
    writeSubscribers(subscribers);

    // لاگ در ترمینال
    console.log(`📧 ایمیل جدید: ${email}`);
    console.log(`📊 تعداد کل اعضا: ${subscribers.length}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'عضویت شما با موفقیت ثبت شد',
        count: subscribers.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'خطا در ثبت نام، لطفاً دوباره تلاش کنید' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (token !== 'admin123') {
    return NextResponse.json(
      { error: 'دسترسی غیرمجاز' },
      { status: 401 }
    );
  }

  const subscribers = readSubscribers();

  console.log(`📊 درخواست مشاهده لیست - تعداد: ${subscribers.length}`);

  return NextResponse.json({
    success: true,
    total: subscribers.length,
    subscribers: subscribers
  });
}

export async function DELETE(request: Request) {
  try {
    const { email, token } = await request.json();
    
    if (token !== 'admin123') {
      return NextResponse.json(
        { error: 'دسترسی غیرمجاز' },
        { status: 401 }
      );
    }

    let subscribers = readSubscribers();
    const index = subscribers.indexOf(email);
    
    if (index > -1) {
      subscribers.splice(index, 1);
      writeSubscribers(subscribers);
      console.log(`🗑️ ایمیل حذف شد: ${email}`);
      return NextResponse.json({
        success: true,
        message: 'ایمیل با موفقیت حذف شد'
      });
    } else {
      return NextResponse.json({
        error: 'ایمیل یافت نشد'
      }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در حذف ایمیل' },
      { status: 500 }
    );
  }
}