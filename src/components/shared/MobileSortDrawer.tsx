'use client';

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const SORT_OPTIONS = [
  "ফিচারড",
  "মূল্য: কম থেকে বেশি",
  "মূল্য: বেশি থেকে কম",
  "নতুন কালেকশন",
  "কাস্টমার রিভিউ"
];

export default function MobileSortDrawer({ isOpen, onClose }: any) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop (Non-blocking) */}
      <div
        className={`fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300 pointer-events-none ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden bg-white dark:bg-slate-800 rounded-t-3xl 
        h-[40vh] transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        flex flex-col ${animate ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 flex-shrink-0" />

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">সাজান</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-2">
            {SORT_OPTIONS.map((opt) => (
              <label 
                key={opt} 
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                  selectedSort === opt 
                    ? 'bg-primary-50 border-primary-200 border dark:bg-slate-700 dark:border-slate-600' 
                    : 'bg-slate-50 border-transparent border hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <span className={`font-medium ${selectedSort === opt ? 'text-primary-700 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {opt}
                </span>
                <input
                  type="radio"
                  className="hidden"
                  checked={selectedSort === opt}
                  onChange={() => setSelectedSort(opt)}
                />
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedSort === opt ? 'border-primary-600 bg-primary-600' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {selectedSort === opt && <Check className="w-3 h-3 text-white" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex gap-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
           <button onClick={onClose} className="flex-1 py-3 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
            বাতিল
          </button>
          <button onClick={onClose} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors shadow-sm">
            প্রয়োগ করুন
          </button>
        </div>
      </div>
    </>
  );
}