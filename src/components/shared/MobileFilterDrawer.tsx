'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

const CATEGORIES = ["অ্যাকশন ফিগার", "বিল্ডিং সেট", "শিক্ষামূলক", "পুতুল", "আউটডোর", "প্রিটেন্ড প্লে"];
const AGE_RANGES = ["০-১ বছর", "১-৩ বছর", "৪-৬ বছর", "৭-৯ বছর", "১০-১২ বছর", "১৩+ বছর"];
const PRICES = ["২৫০০ টাকার নিচে", "২৫০০ থেকে ৫০০০ টাকা", "৫০০০ থেকে ১০০০০ টাকা", "১০০০০ টাকা এবং উপরে"];

export default function MobileFilterDrawer({ isOpen, onClose }: any) {
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

  const [expandedSection, setExpandedSection] = useState<string | null>('Categories');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    categories: [],
    ages: [],
    prices: [],
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFilter = (section: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value],
    }));
  };

  const handleReset = () => {
    setSelectedFilters({
      categories: [],
      ages: [],
      prices: [],
    });
  };

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
        className={`fixed flex flex-col inset-x-0 bottom-0 z-50 md:hidden bg-white dark:bg-slate-800 rounded-t-3xl 
        h-[40vh] transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${animate ? 'translate-y-0' : 'translate-y-full'} shadow-2xl`}
      >
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3 flex-shrink-0" />

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">ফিল্টারসমূহ</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1">
          
          {/* Categories */}
          <div className="border-b border-slate-100 dark:border-slate-700 pb-2">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-slate-800 dark:text-slate-200"
              onClick={() => toggleSection("Categories")}
            >
              ক্যাটাগরি
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "Categories" ? "rotate-180" : ""}`} />
            </button>
            
            {expandedSection === "Categories" && (
              <div className="mt-1 mb-4 space-y-3">
                {CATEGORIES.map((c) => (
                  <FilterCheckbox 
                    key={c} 
                    label={c} 
                    checked={selectedFilters.categories.includes(c)}
                    onChange={() => toggleFilter('categories', c)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Age Range Filter */}
          <div className="border-b border-slate-100 dark:border-slate-700 pb-2">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-slate-800 dark:text-slate-200"
              onClick={() => toggleSection("Age")}
            >
              বয়সসীমা
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "Age" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "Age" && (
              <div className="mt-1 mb-4 space-y-3">
                {AGE_RANGES.map((age) => (
                  <FilterCheckbox 
                    key={age} 
                    label={age} 
                    checked={selectedFilters.ages.includes(age)}
                    onChange={() => toggleFilter('ages', age)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="border-b border-slate-100 dark:border-slate-700 pb-2">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-slate-800 dark:text-slate-200"
              onClick={() => toggleSection("Price")}
            >
              মূল্য
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "Price" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "Price" && (
              <div className="mt-1 mb-4 space-y-3">
                {PRICES.map((price) => (
                  <FilterCheckbox 
                    key={price} 
                    label={price} 
                    checked={selectedFilters.prices.includes(price)}
                    onChange={() => toggleFilter('prices', price)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 flex gap-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
          <button 
            onClick={handleReset}
            className="flex-1 py-3 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            সব মুছুন
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors shadow-sm"
          >
            প্রয়োগ করুন
          </button>
        </div>
      </div>
    </>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-400'}`}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
        {label}
      </span>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
  );
}