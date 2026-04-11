"use client";

import { useState } from "react";
import { ChevronDown, ListFilter } from "lucide-react";

const SORT_OPTIONS = [
  "ফিচারড",
  "মূল্য: কম থেকে বেশি",
  "মূল্য: বেশি থেকে কম",
  "নতুন কালেকশন",
  "কাস্টমার রিভিউ"
];

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:border-primary-400 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <ListFilter className="w-4 h-4 text-slate-400" />
        <span className="hidden sm:inline">সাজান:</span> {selected}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 py-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selected === option 
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-semibold' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
