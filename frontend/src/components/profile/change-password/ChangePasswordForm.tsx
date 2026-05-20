"use client";

import { EyeOff } from "lucide-react";

export default function ChangePasswordForm() {
  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 w-full max-w-lg">
        <form className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Set a new password</label>
            <div className="relative">
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none pr-10" 
              />
              <button type="button" className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm password</label>
            <div className="relative">
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none pr-10" 
              />
              <button type="button" className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="button" 
              className="w-full flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-lg font-bold shadow-md transition-all"
            >
              Update Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
