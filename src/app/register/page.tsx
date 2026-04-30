"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Mail, Lock, User, ArrowRight, CheckCircle2,  } from "lucide-react";
import AnimatedLogo from "@/components/shared/AnimatedLogo";
import { useRegisterProfileMutation } from "@/store/user/profile/profileApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/user/profile/profileSlice";
import { FaFacebook } from "react-icons/fa";

function RegisterContent() {
  const [registerMethod, setRegisterMethod] = useState<"phone" | "email">("phone");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [registerProfile, { isLoading }] = useRegisterProfileMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = registerMethod === "phone" 
        ? { name, phone: identifier, password } 
        : { name, email: identifier, password };
        
      const response = await registerProfile(payload).unwrap();
      // Auto-login after register
      dispatch(setCredentials({ user: response.user, token: response.token }));
      
      const redirectUrl = searchParams.get("redirect") || "/profile";
      router.push(redirectUrl);
    } catch (err) {
      console.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে", err);
      alert("রেজিস্ট্রেশন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  const handleSocialRegister = async (provider: string) => {
    try {
      const response = await registerProfile({ name: `Social User`, email: `social_${provider}@dummy.com`, password: "social_dummy" }).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      
      const redirectUrl = searchParams.get("redirect") || "/profile";
      router.push(redirectUrl);
    } catch (err) {
      console.error("সোশ্যাল রেজিস্ট্রেশন ব্যর্থ হয়েছে", err);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
      
      {/* Left Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-secondary-50 dark:bg-slate-800 relative overflow-hidden flex-col justify-center p-12 lg:p-24 border-r border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-secondary-400 dark:bg-secondary-900 opacity-20 blur-3xl transform -rotate-12 scale-150 -translate-y-1/2"></div>
        
        <Link href="/" className="flex items-center gap-2 mb-16 relative z-10 hover-lift group">
          <AnimatedLogo className="h-10 w-10 md:h-12 md:w-12" />
          <span className="font-heading font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
            সদা<span className="text-primary-600">য়ন</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-black font-heading mb-6">খেলার নতুন দুনিয়ায় যোগ দিন</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            একাউন্ট তৈরি করে আপনার অর্ডার ট্র্যাক করুন, উইশলিস্ট সংরক্ষণ করুন এবং আমাদের শক্তিশালী এআই প্যারেন্টিং টুলগুলোর সুবিধা নিন।
          </p>
          
          <ul className="space-y-4">
            {['বয়স অনুযায়ী সঠিক খেলনার সুপারিশ', 'আপনার অর্ডার হিস্ট্রি ট্র্যাক ও পরিচালনা', 'এআই প্যারেন্টিং অ্যাসিস্ট্যান্ট ব্যবহার', 'কাস্টম চাইল্ড প্রোফাইল তৈরি'].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          
          <h1 className="text-3xl md:text-4xl font-black font-heading mb-2">রেজিস্টার করুন</h1>
          <p className="text-slate-500 mb-8">সদায়ন-এ আপনার ফ্রী একাউন্ট তৈরি করুন।</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              onClick={() => handleSocialRegister('google')}
              className="py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button 
              onClick={() => handleSocialRegister('facebook')}
              className="py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3"
            >
              <FaFacebook className="w-5 h-5 text-[#1877F2]" fill="currentColor" />
              Facebook
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 px-4 text-slate-500 text-sm font-bold uppercase tracking-wider">অথবা</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Method Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
            <button
              onClick={() => setRegisterMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${registerMethod === "phone" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Phone className="w-4 h-4" /> মোবাইল
            </button>
            <button
              onClick={() => setRegisterMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${registerMethod === "email" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Mail className="w-4 h-4" /> ইমেইল
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">আপনার নাম</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="সম্পূর্ণ নাম লিখুন" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                {registerMethod === "phone" ? "মোবাইল নাম্বার" : "ইমেইল এড্রেস"}
              </label>
              <div className="relative flex">
                {registerMethod === "phone" && (
                  <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl px-4 text-slate-600 dark:text-slate-300 font-bold">
                    +880
                  </div>
                )}
                <input 
                  type={registerMethod === "phone" ? "tel" : "email"} 
                  required
                  placeholder={registerMethod === "phone" ? "1XXXXXXXXX" : "your@email.com"} 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none ${registerMethod === "phone" ? "rounded-r-xl" : "rounded-xl"}`} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">পাসওয়ার্ড</label>
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
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">কমপক্ষে ৮ অক্ষরের হতে হবে।</p>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? "অপেক্ষা করুন..." : "একাউন্ট তৈরি করুন"} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium">
            আগে থেকেই একাউন্ট আছে? 
            <Link 
              href={`/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`} 
              className="text-primary-600 font-bold underline ml-1"
            >
              লগইন করুন
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 border-2 border-primary-500 rounded-full w-12 h-12 border-t-transparent animate-spin mx-auto mt-20"></div>}>
      <RegisterContent />
    </Suspense>
  );
}
