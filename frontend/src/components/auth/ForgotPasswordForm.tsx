"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from "@/store/user/profile/profileApi";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await forgotPassword({ identifier }).unwrap();
      setStep(2);
    } catch (err) {
      setErrorMsg("নেটওয়ার্ক বা সিস্টেমে সমস্যা হয়েছে।");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await verifyOtp({ identifier, otp }).unwrap();
      setResetToken(response.token);
      setStep(3);
    } catch (err) {
      setErrorMsg("ভুল OTP দিয়েছেন। ডামি OTP হিসেবে '123456' ব্যবহার করুন।");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (newPassword !== confirmPassword) {
      setErrorMsg("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      await resetPassword({ token: resetToken, newPassword }).unwrap();
      alert("আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে। এখন লগইন করুন।");
      router.push("/login");
    } catch (err) {
      setErrorMsg("পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        {/* Header */}
        <div className="bg-primary-600 p-8 text-center text-white relative">
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>
          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black font-heading relative z-10">
            পাসওয়ার্ড রিকভারি
          </h2>
          <p className="text-primary-100 text-sm mt-2 relative z-10">
            আপনার একাউন্টের অ্যাক্সেস ফিরে পান
          </p>
        </div>

        <div className="p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
            <div
              className={`w-8 h-1 rounded-full ${step >= 2 ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
            <div
              className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
            <div
              className={`w-8 h-1 rounded-full ${step >= 3 ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
            <div
              className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
          </div>

          {errorMsg && (
            <div className="bg-danger-50 dark:bg-danger-900/20 text-danger-600 dark:text-danger-400 p-3 rounded-lg text-sm font-bold mb-6 text-center border border-danger-200 dark:border-danger-800/50">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Request OTP */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium">
                আপনার রেজিস্ট্রিকৃত মোবাইল নাম্বার বা ইমেইল প্রদান করুন। আমরা
                একটি সিকিউরিটি কোড পাঠাবো।
              </p>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  মোবাইল নাম্বার বা ইমেইল
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="example@mail.com বা 01XXXXXXXXX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isForgotLoading || !identifier}
                className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition disabled:opacity-70"
              >
                {isForgotLoading ? "খোঁজা হচ্ছে..." : "কোড পাঠান"}{" "}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                  আমরা <strong>{identifier}</strong> নাম্বারে/ইমেইলে একটি
                  ৬-সংখ্যার কোড পাঠিয়েছি।
                </p>
                <p className="text-xs text-primary-600 font-bold mt-2">
                  (টেস্টিং এর জন্য ডামি OTP: 123456 ব্যবহার করুন)
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  OTP ইনপুট করুন
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 focus:bg-white outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isVerifyLoading || otp.length < 6}
                className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition disabled:opacity-70"
              >
                {isVerifyLoading ? "ভেরিফাই হচ্ছে..." : "যাচাই করুন"}{" "}
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                নাম্বার পরিবর্তন করুন
              </button>
            </form>
          )}

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium">
                আপনার পরিচয় সফলভাবে যাচাই করা হয়েছে। এখন নতুন একটি শক্তিশালী
                পাসওয়ার্ড সেট করুন।
              </p>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  পুনরায় নতুন পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-primary-400 focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isResetLoading || !newPassword || !confirmPassword}
                className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 transition disabled:opacity-70"
              >
                {isResetLoading
                  ? "সেভ হচ্ছে..."
                  : "নতুন পাসওয়ার্ড কনফার্ম করুন"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-700 pt-6">
            <Link
              href="/login"
              className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 font-bold text-sm"
            >
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
