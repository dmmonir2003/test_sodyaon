"use client";

import { useState } from "react";

export default function DeleteAccountForm() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
      <div className="max-w-4xl space-y-6">
        
        <div className="border border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Warning!</h2>
          <p className="text-sm text-red-600 dark:text-red-400">
            Deleting your account is permanent and cannot be undone. All your personal information, reviews, and saved addresses will be permanently removed.
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input 
            type="checkbox" 
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600" 
          />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            I understand that this action cannot be undone
          </span>
        </label>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button className="px-8 py-3 bg-[#0a1f24] hover:bg-[#061418] text-white text-xs font-bold rounded shadow-sm transition-colors uppercase tracking-wider">
            Cancel
          </button>
          <button 
            disabled={!isChecked}
            className="px-8 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase tracking-wider"
          >
            Delete My Account
          </button>
        </div>

      </div>
    </div>
  );
}
