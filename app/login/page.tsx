'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, KeyRound, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const ADMIN_EMAIL = 'p.h.h.d.b.a20911911@gmail.com';

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('ایمیل معتبر وارد کنید');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStep('code');
        setCountdown(60);
        toast.success('کد تایید ارسال شد');
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) clearInterval(timer);
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('خطا در ارسال کد');
    } finally {
      setLoading(false);
    }
  };

const handleVerifyCode = async (e: React.FormEvent) => {
  e.preventDefault();
  if (code.length !== 6) {
    toast.error('کد 6 رقمی را وارد کنید');
    return;
  }

  setLoading(true);
  try {
    // توجه: متد درخواست از 'POST' به 'PUT' تغییر کرده است
    const res = await fetch('/api/auth/send-code', {
      method: 'PUT', // <-- تغییر در این خط
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success('خوش آمدید!');
      router.push(data.user?.role === 'admin' ? '/admin' : '/');
    } else {
      toast.error(data.error);
    }
  } catch {
    toast.error('خطا در تایید کد');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20 -z-10" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
          <div className="p-6 text-center border-b border-border">
            <h1 className="text-2xl font-bold">ورود به شاپ‌مارت</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {step === 'email' ? 'ایمیل خود را وارد کنید' : 'کد تایید را وارد کنید'}
            </p>
          </div>

          <div className="p-6">
            {step === 'email' ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ایمیل</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@email.com"
                      disabled={loading}
                    />
                  </div>
                  {email === ADMIN_EMAIL && (
                    <p className="text-xs text-primary mt-1">✓ ایمیل مدیر</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>ارسال کد تایید <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">کد تایید</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-center text-xl tracking-widest"
                    placeholder="••••••"
                    maxLength={6}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground mt-2">کد 6 رقمی به ایمیل {email} ارسال شد</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>تایید و ورود <CheckCircle className="w-4 h-4" /></>}
                </button>
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep('email')} className="text-sm text-muted-foreground hover:text-primary">
                    ← ایمیل دیگری وارد کنید
                  </button>
                  <button type="button" onClick={handleSendCode} disabled={countdown > 0} className="text-sm text-primary hover:underline disabled:opacity-50">
                    {countdown > 0 ? `ارسال مجدد ${countdown} ثانیه` : 'ارسال مجدد کد'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}