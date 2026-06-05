'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'احمد رضایی',
    email: 'ahmad@example.com',
    phone: '09123456789',
    address: 'تهران، خیابان ولیعصر',
    joinDate: '1402/01/15',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">پروفایل کاربری</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? 'ذخیره تغییرات' : 'ویرایش پروفایل'}
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-muted-foreground">عضو از {userData.joinDate}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="flex-1 bg-transparent outline-none"
                />
              ) : (
                <span>{userData.name}</span>
              )}
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="flex-1 bg-transparent outline-none"
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
              {isEditing ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="flex-1 bg-transparent outline-none"
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              {isEditing ? (
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  className="flex-1 bg-transparent outline-none"
                />
              ) : (
                <span>{userData.address}</span>
              )}
            </div>
          </div>
        </div>

        {/* سفارشات قبلی */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">سفارشات اخیر</h2>
          <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
            هنوز سفارشی ثبت نشده است
          </div>
        </div>
      </div>
    </div>
  );
}