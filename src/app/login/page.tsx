import Link from "next/link";
import { Package } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-12 hover-lift">
            <div className="bg-primary-500 text-white p-1.5 rounded-xl shadow-md rotate-3">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-heading font-bold text-2xl text-slate-800 dark:text-white tracking-tight">
              Play<span className="text-primary-600">Time</span>
            </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-black font-heading mb-2">Welcome Back</h1>
          <p className="text-slate-500 mb-8">Sign in to access your child's toy recommendations and wishlist.</p>

          <div className="space-y-4 mb-6">
            <button className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Sign in with Google
            </button>
            <button className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.6 1.83.05 3.12.86 4 2.2-3.1 1.94-2.58 5.75.52 7.02-.68 1.4-1.57 2.65-3.18 3.55zm-6.28-13.6c-.22-1.8 1-3.66 2.76-4.04.38 2.06-1.58 3.8-2.76 4.04z" /></svg>
              Sign in with Apple
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 px-4 text-slate-500 text-sm">or continue with email</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <form className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                <Link href="#" className="flex-shrink-0 text-sm text-primary-600 font-bold hover:text-primary-800">Forgot?</Link>
              </div>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all outline-none" />
            </div>
            <button type="button" className="w-full py-3 mt-4 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition text-lg">
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-500">
            Don't have an account? <Link href="/register" className="text-primary-600 font-bold underline">Sign up</Link>
          </p>

        </div>
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-indigo-50 dark:bg-slate-800 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-primary-600 dark:bg-primary-900 opacity-10 blur-3xl transform rotate-12 scale-150"></div>
        <div className="max-w-lg z-10 text-center">
          <h2 className="text-4xl font-black font-heading text-slate-900 dark:text-white mb-6">Create Custom Child Profiles</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            When you create a PlayTime account, you gain access to our AI Gift Finder. Save your children's ages and interests to automatically receive tailored toy recommendations sent directly to you before every birthday and holiday.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="text-3xl mb-2 block">🎁</span>
              <h3 className="font-bold text-slate-900 dark:text-white">Smart Match</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="text-3xl mb-2 block">🎂</span>
              <h3 className="font-bold text-slate-900 dark:text-white">Birthday Reminders</h3>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
