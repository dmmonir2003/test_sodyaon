"use client";

import { useState } from "react";
import { Plus, X, Baby } from "lucide-react";

export default function AddChildForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> নতুন যোগ করুন
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 w-full max-w-xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">সন্তানের প্রোফাইল যোগ করুন</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto font-bengali">
              <form className="space-y-5 text-right" dir="rtl">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="text-left" dir="ltr">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                       নাম (Name) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="সন্তানের নাম লিখুন"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                    />
                  </div>
                  <div className="text-left" dir="ltr">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      লিঙ্গ (Gender) <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                      <option>নির্বাচন করুন</option>
                      <option>ছেলে</option>
                      <option>মেয়ে</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="text-left" dir="ltr">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      জন্ম তারিখ (Date of Birth) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                    />
                  </div>
                  <div className="text-left" dir="ltr">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      আগ্রহের বিষয় (Interests)
                    </label>
                    <input 
                      type="text" 
                      placeholder="যেমন: কার্টুন, ছবি আঁকা"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                    />
                  </div>
                </div>

                <div className="text-left" dir="ltr">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    অতিরিক্ত তথ্য (Additional Info)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="সন্তানের সম্পর্কে আরও কিছু বলুন যা চমৎকার উপহার খুঁজে পেতে আমাদের এআইকে সাহায্য করবে"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none resize-none" 
                  ></textarea>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-slate-500 hover:bg-slate-600 text-white transition-colors uppercase tracking-wider"
              >
                বাতিল করুন
              </button>
              <button 
                className="px-5 py-2 rounded-lg text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white transition-colors uppercase tracking-wider"
              >
                সংরক্ষণ করুন
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
