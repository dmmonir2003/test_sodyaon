"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Mail, Lock, ArrowRight } from "lucide-react";
import AnimatedLogo from "@/components/shared/AnimatedLogo";
import { useLoginProfileMutation } from "@/store/user/profile/profileApi";

import { setCredentials } from "@/store/user/profile/profileSlice";
import { useAppDispatch } from "@/store/hooks";
import { FaFacebook } from "react-icons/fa";
import StaticLogo from "../shared/StaticLogo";

export default function LoginForm() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const redirectUrl = searchParams.get("redirect") || "/";

  const [loginProfile, { isLoading }] = useLoginProfileMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload =
        loginMethod === "phone"
          ? { phone: identifier, password }
          : { email: identifier, password };

      const response = await loginProfile(payload).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      router.push(redirectUrl);
    } catch (err) {
      console.error("লগইন ব্যর্থ হয়েছে", err);
      alert("লগইন করতে সমস্যা হয়েছে। সঠিক তথ্য দিন।");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await loginProfile({
        email: `social_${provider}@dummy.com`,
        password: "social_dummy",
      }).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      router.push(redirectUrl);
    } catch (err) {
      console.error("সোশ্যাল লগইন ব্যর্থ হয়েছে", err);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center  mb-12 hover-lift group">
            <StaticLogo className="w-8 h-8 md:w-14 md:h-14" />
                          <span className="font-heading font-bold md:text-3xl text-xl  dark:text-white">
                            সদা<span className="text-primary-500">য়ন</span>
                          </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-black font-heading mb-2">
            স্বাগতম!
          </h1>
          <p className="text-slate-500 mb-8">
            সদায়ন-এ আবার ফিরে আসার জন্য ধন্যবাদ। আপনার অ্যাকাউন্টে লগইন করুন।
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSocialLogin("google")}
              className="py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3"
            >
              <FaFacebook
                className="w-5 h-5 text-[#1877F2]"
                fill="currentColor"
              />
              Facebook
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="shrink-0 px-4 text-slate-500 text-sm font-bold uppercase tracking-wider">
              অথবা
            </span>
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Method Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${loginMethod === "phone" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Phone className="w-4 h-4" /> মোবাইল
            </button>
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Mail className="w-4 h-4" /> ইমেইল
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                {loginMethod === "phone" ? "মোবাইল নাম্বার" : "ইমেইল এড্রেস"}
              </label>
              <div className="relative flex">
                {loginMethod === "phone" && (
                  <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl px-4 text-slate-600 dark:text-slate-300 font-bold">
                    +880
                  </div>
                )}
                <input
                  type={loginMethod === "phone" ? "tel" : "email"}
                  required
                  placeholder={
                    loginMethod === "phone" ? "1XXXXXXXXX" : "your@email.com"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none ${loginMethod === "phone" ? "rounded-r-xl" : "rounded-xl"}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  পাসওয়ার্ড
                </label>
                <Link
                  href="/forgot-password"
                  className="shrink-0 text-sm text-primary-600 font-bold hover:text-primary-800 transition-colors"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? "অপেক্ষা করুন..." : "লগইন করুন"}{" "}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium">
            একাউন্ট নেই?{" "}
            <Link
              href={redirectUrl !== "/" ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"}
              className="text-primary-600 font-bold underline ml-1"
            >
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-indigo-50 dark:bg-slate-800 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-primary-600 dark:bg-primary-900 opacity-10 blur-3xl transform rotate-12 scale-150"></div>
        <div className="max-w-lg z-10 text-center">
          <h2 className="text-4xl font-black font-heading text-slate-900 dark:text-white mb-6">
            চাইল্ড প্রোফাইল তৈরি করুন
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            সদায়ন একাউন্ট তৈরি করলে আপনি এআই গিফট ফাইন্ডার এক্সেস পাবেন।
            আপনার সন্তানের বয়স এবং পছন্দের বিষয় সংরক্ষণ করুন, আর
            স্বয়ংক্রিয়ভাবে প্রতিটি জন্মদিনে দারুণ খেলনার সুপারিশ পান।
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform">
              <span className="text-3xl mb-2 block">🎁</span>
              <h3 className="font-bold text-slate-900 dark:text-white">
                স্মার্ট ম্যাচ
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform">
              <span className="text-3xl mb-2 block">🎂</span>
              <h3 className="font-bold text-slate-900 dark:text-white">
                জন্মদিন রিমাইন্ডার
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
