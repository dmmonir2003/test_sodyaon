

'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

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

  const [expandedSection, setExpandedSection] = useState('categories');
  const [selectedFilters, setSelectedFilters] = useState<any>({
    categories: [],
    languages: [],
    discount: [0, 100],
  });

  const toggleFilter = (section: string, value: string) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter((item: string) => item !== value)
        : [...prev[section], value],
    }));
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden bg-white dark:bg-slate-800 rounded-t-3xl 
        h-[40vh] transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${animate ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2" />

        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-bold">ফিল্টার</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* Scroll */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(40vh-120px)]">

          {/* Categories */}
          <div>
            <button onClick={() => setExpandedSection(expandedSection === 'categories' ? '' : 'categories')}>
              ক্যাটাগরি
            </button>

            {expandedSection === 'categories' &&
              ['খেলনা', 'স্টেম', 'আউটডোর'].map((c) => (
                <label key={c} className="block">
                  <input
                    type="checkbox"
                    onChange={() => toggleFilter('categories', c)}
                  /> {c}
                </label>
              ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 flex gap-3 border-t">
          <button className="flex-1 border rounded-full py-2">রিসেট</button>
          <button className="flex-1 bg-blue-600 text-white rounded-full py-2">প্রয়োগ করুন</button>
        </div>
      </div>
    </>
  );
}