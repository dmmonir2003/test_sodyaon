"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useChangePasswordMutation } from "@/store/user/profile/profileApi";
import { Lock, Save } from "lucide-react";

export default function SettingsPage() {
  const { data: user } = useAppSelector((state) => state.profile);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    
    if (newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "নতুন পাসওয়ার্ড দুটি মিলছে না।" });
      return;
    }
    if (newPassword.length < 8) {
      setMsg({ type: "error", text: "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।" });
      return;
    }

    try {
      const response = await changePassword({ currentPassword, newPassword }).unwrap();
      setMsg({ type: "success", text: response.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg({ type: "error", text: "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে। সঠিক তথ্য দিন।" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 dark:text-white">একাউন্ট সেটিংস</h1>
        <p className="text-slate-500 dark:text-slate-400">আপনার ব্যক্তিগত তথ্য এবং সিকিউরিটি সেটিংস আপডেট করুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info Form */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 h-fit">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">সাধারণ তথ্য</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">নাম</label>
              <input 
                type="text" 
                defaultValue={user?.name || ""}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">ইমেইল</label>
              <input 
                type="email" 
                defaultValue={user?.email || ""}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">মোবাইল</label>
              <div className="flex">
                <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl px-4 text-slate-600 dark:text-slate-400 font-bold">
                  +880
                </div>
                <input 
                  type="text" 
                  defaultValue={user?.phone?.replace("+880", "") || ""}
                  className="w-full px-4 py-3 rounded-r-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none" 
                />
              </div>
            </div>
            <button type="button" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:-translate-y-0.5">
              <Save className="w-4 h-4" /> আপডেট করুন
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 h-fit">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">পাসওয়ার্ড পরিবর্তন</h2>
          
          {msg.text && (
            <div className={`p-3 rounded-lg text-sm font-bold mb-6 border ${msg.type === 'error' ? 'bg-danger-50 text-danger-600 border-danger-200 dark:bg-danger-900/20 dark:border-danger-800/50' : 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50'}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">বর্তমান পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="বর্তমান পাসওয়ার্ড দিন" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none text-sm" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">নতুন পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="নতুন পাসওয়ার্ড লিখুন" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none text-sm" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">কনফার্ম নতুন পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 outline-none text-sm" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-bold shadow-md transition-all mt-6 disabled:opacity-70"
            >
              {isLoading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড সেভ করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
