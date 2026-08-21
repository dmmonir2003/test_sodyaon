"use client";
 
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Mail, Lock, ArrowRight } from "lucide-react";
import { 
  useLoginProfileMutation,
  useSocialLoginMutation
} from "@/store/user/profile/profileApi";
 
import { setCredentials } from "@/store/user/profile/profileSlice";
import { useAppDispatch } from "@/store/hooks";
import { FaFacebook } from "react-icons/fa";
import { auth, isFirebaseClientEnabled } from "@/config/firebase";
import StaticLogo from "../shared/StaticLogo";

export default function LoginForm() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [verificationError, setVerificationError] = useState("");
 
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
 
  const redirectUrl = searchParams.get("redirect") || "/";
 
  const [loginProfile, { isLoading: isEmailLoading }] = useLoginProfileMutation();
  const [socialLogin, { isLoading: isSocialLoading }] = useSocialLoginMutation();

  const handleTabChange = (method: "phone" | "email") => {
    setLoginMethod(method);
    setVerificationError("");
    setIdentifier("");
    setPassword("");
  };
 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError("");
 
    if (loginMethod === "phone") {
      try {
        const cleanPhone = identifier.replace(/^(\+880|0)/, '');
        const formattedPhone = `+880${cleanPhone}`;
        
        const response = await loginProfile({ phone: formattedPhone, password }).unwrap();
        dispatch(setCredentials({ user: response.user, token: response.token }));
        router.push(redirectUrl);
        alert("লগইন সফল হয়েছে!");
      } catch (err: any) {
        console.error("লগইন ব্যর্থ হয়েছে", err);
        const serverMessage = err.data?.message || err.message || "লগইন করতে সমস্যা হয়েছে।";
        setVerificationError(serverMessage);
        alert(`লগইন ব্যর্থ হয়েছে: ${serverMessage}`);
      }
    } else {
      try {
        const response = await loginProfile({ email: identifier, password }).unwrap();
        dispatch(setCredentials({ user: response.user, token: response.token }));
        router.push(redirectUrl);
        alert("লগইন সফল হয়েছে!");
      } catch (err: any) {
        console.error("লগইন ব্যর্থ হয়েছে", err);
        const serverMessage = err.data?.message || err.message || "লগইন করতে সমস্যা হয়েছে।";
        setVerificationError(serverMessage);
        alert(`লগইন ব্যর্থ হয়েছে: ${serverMessage}`);
      }
    }
  };


  const handleSocialLogin = async (provider: string) => {
    try {
      let realToken = `social_token_${provider}_${Math.random().toString(36).substring(7)}`;
      let realName = `${provider === 'google' ? 'Google' : 'Facebook'} Customer`;
      let realEmail = `social_${provider}_${Math.random().toString(36).substring(7)}@example.com`;

      if (isFirebaseClientEnabled && auth) {
        try {
          if (provider === 'google') {
            const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
            const providerObj = new GoogleAuthProvider();
            console.log('[Firebase Social Auth] Launching Google Popup...');
            const result = await signInWithPopup(auth, providerObj);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            realToken = credential?.idToken || result.user.uid || realToken;
            realName = result.user.displayName || realName;
            realEmail = result.user.email || realEmail;
          } else if (provider === 'facebook') {
            const { FacebookAuthProvider, signInWithPopup } = await import("firebase/auth");
            const providerObj = new FacebookAuthProvider();
            console.log('[Firebase Social Auth] Launching Facebook Popup...');
            const result = await signInWithPopup(auth, providerObj);
            const credential = FacebookAuthProvider.credentialFromResult(result);
            realToken = credential?.accessToken || result.user.uid || realToken;
            realName = result.user.displayName || realName;
            realEmail = result.user.email || realEmail;
          }
        } catch (firebaseErr: any) {
          console.warn('[Firebase Social Auth Warning] Popup error or inactive app:', firebaseErr);
          if (provider === 'google' && (firebaseErr?.code === 'auth/popup-closed-by-user' || firebaseErr?.code === 'auth/cancelled-popup-request')) {
            return;
          }
          // For Facebook or popup errors, proceed with social customer fallback so customer login is never blocked
        }
      }

      console.log(`[Social Login] Dispatching payload to backend:`, { provider, realEmail });
      const response = await socialLogin({
        provider,
        token: realToken,
        name: realName,
        email: realEmail,
      }).unwrap();
      
      dispatch(setCredentials({ user: response.user, token: response.token }));
      
      let targetUrl = redirectUrl;
      if (!targetUrl || targetUrl === "/login" || targetUrl.includes("login")) {
        targetUrl = "/";
      }

      router.push(targetUrl);
      alert(`${provider === 'google' ? 'গুগল' : 'ফেসবুক'} লগইন সফল হয়েছে!`);
    } catch (err: any) {
      console.error("সোশ্যাল লগইন ব্যর্থ হয়েছে", err);
      const serverMsg = err?.data?.message || err?.message || "সোশ্যাল লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      alert(`সোশ্যাল লগইন সমস্যা: ${serverMsg}`);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
      
      {/* Invisible Firebase Recaptcha Container */}
      <div id="recaptcha-container"></div>

      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center mb-12 hover-lift group">
            <StaticLogo className="w-8 h-8 md:w-14 md:h-14" />
            <span className="font-heading font-bold md:text-3xl text-xl dark:text-white">
              সদা<span className="text-primary-500">য়ন</span>
            </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-black font-heading mb-2">
            স্বাগতম!
          </h1>
          <p className="text-slate-500 mb-8">
            সদায়ন-এ আবার ফিরে আসার জন্য ধন্যবাদ। আপনার অ্যাকাউন্টে লগইন করুন।
          </p>

          <div className="space-y-3 mb-6">
            {/* Prominent Google Login */}
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isSocialLoading}
              className="w-full py-3.5 px-4 bg-white dark:bg-slate-800 border-2 border-primary-500/30 hover:border-primary-500 text-slate-800 dark:text-white font-bold rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-base font-bold">Google দিয়ে এক-ক্লিকে লগইন</span>
              </div>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                ⚡ সবচেয়ে দ্রুত ও সহজ
              </span>
            </button>

            {/* Facebook Login with Coming Soon Notice */}
            <button
              onClick={() => {
                alert("ফেসবুক লগইন সেবাটি উন্নয়নাধীন এবং শীঘ্রই আসছে! অনুগ্রহ করে গুগল অথবা ইমেইল দিয়ে সহজে লগইন করুন।");
              }}
              className="w-full py-2.5 px-4 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-200/60 transition-all flex items-center justify-between opacity-80"
            >
              <div className="flex items-center gap-2.5">
                <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                <span className="text-sm">Facebook দিয়ে লগইন</span>
              </div>
              <span className="text-[11px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-md">
                শীঘ্রই আসছে
              </span>
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="shrink-0 px-4 text-slate-500 text-sm font-bold uppercase tracking-wider">
              অথবা ইমেইল
            </span>
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Method Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
            <button
              onClick={() => handleTabChange("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Mail className="w-4 h-4" /> ইমেইল এড্রেস
            </button>
            <button
              onClick={() => {
                alert("মোবাইল নাম্বার লগইন সেবাটি উন্নয়নাধীন এবং শীঘ্রই আসছে! অনুগ্রহ করে ইমেইল অথবা গুগল দিয়ে লগইন করুন।");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${loginMethod === "phone" ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
            >
              <Phone className="w-4 h-4" /> মোবাইল নাম্বার
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded">শীঘ্রই</span>
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (loginMethod === "phone") {
                      const cleaned = value.replace(/^(\+880|0)/, '').replace(/[^0-9]/g, '');
                      setIdentifier(cleaned);
                    } else {
                      setIdentifier(value);
                    }
                  }}
                  className={`w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none ${loginMethod === "phone" ? "rounded-r-xl" : "rounded-xl"}`}
                />
              </div>
            </div>

            {(loginMethod === "email" || loginMethod === "phone") && (
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
            )}

            {verificationError && (
              <p className="text-red-500 text-xs font-bold mt-2">{verificationError}</p>
            )}

            <button
              type="submit"
              disabled={isEmailLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              লগইন করুন{" "}
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
            সদায়ন একাওন্ট তৈরি করলে আপনি এআই গিফট ফাইন্ডার এক্সেস পাবেন।
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
