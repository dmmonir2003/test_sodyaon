"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const CATEGORIES = ["অ্যাকশন ফিগার", "বিল্ডিং সেট", "শিক্ষামূলক", "পুতুল", "আউটডোর", "প্রিটেন্ড প্লে"];
const AGE_RANGES = ["০-১ বছর", "১-৩ বছর", "৪-৬ বছর", "৭-৯ বছর", "১০-১২ বছর", "১৩+ বছর"];
const PRICES = ["২৫০০ টাকার নিচে", "২৫০০ থেকে ৫০০০ টাকা", "৫০০০ থেকে ১০০০০ টাকা", "১০০০০ টাকা এবং উপরে"];

export default function FiltersSidebar() {
  const [openSection, setOpenSection] = useState<string | null>("Categories");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sticky top-24 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold font-heading text-lg text-slate-900 dark:text-white">ফিল্টারসমূহ</h3>
        <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">সব মুছুন</button>
      </div>

      <div className="space-y-4">
        {/* Categories Filter */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
          <button 
            className="flex justify-between items-center w-full font-semibold text-slate-800 dark:text-slate-200"
            onClick={() => toggleSection("Categories")}
          >
            ক্যাটাগরি
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Categories" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "Categories" && (
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((cat, i) => (
                <FilterCheckbox key={cat} label={cat} defaultChecked={i === 1} />
              ))}
            </div>
          )}
        </div>

        {/* Age Range Filter */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
          <button 
            className="flex justify-between items-center w-full font-semibold text-slate-800 dark:text-slate-200"
            onClick={() => toggleSection("Age")}
          >
            বয়সসীমা
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Age" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "Age" && (
            <div className="mt-3 space-y-2">
              {AGE_RANGES.map((age) => (
                <FilterCheckbox key={age} label={age} />
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
          <button 
            className="flex justify-between items-center w-full font-semibold text-slate-800 dark:text-slate-200"
            onClick={() => toggleSection("Price")}
          >
            মূল্য
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Price" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "Price" && (
            <div className="mt-3 space-y-2">
              {PRICES.map((price) => (
                <FilterCheckbox key={price} label={price} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <button className="w-full mt-6 py-3 bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-700 text-white rounded-xl font-bold transition-colors">
        ফিল্টার প্রয়োগ করুন
      </button>
    </div>
  );
}

function FilterCheckbox({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-400'}`}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
        {label}
      </span>
      <input type="checkbox" className="hidden" checked={checked} onChange={() => setChecked(!checked)} />
    </label>
  );
}
