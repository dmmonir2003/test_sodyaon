"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: CustomSelectOption[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string; // Optional custom string for width, spacing etc.
}

export default function CustomSelect({
  value,
  options,
  onChange,
  placeholder = "Select Option",
  className = "w-full"
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
       <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 border rounded-xl text-sm transition-colors cursor-pointer ${
          isOpen ? 'bg-white dark:bg-slate-900 border-primary-600 ring-2 ring-primary-600/20' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <span className={`${selectedOption ? 'font-medium text-slate-700 dark:text-slate-200' : 'text-slate-500'} font-sans truncate pr-2`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
      </button>
      
      <div 
        className={`absolute top-full mt-1.5 left-0 w-full min-w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-2xl rounded-lg overflow-hidden z-50 transition-all duration-200 origin-top border max-h-60 overflow-y-auto ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="py-1">
          {options.map((opt) => {
             const isSelected = value === opt.value;
             return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 font-sans block ${
                  isSelected 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold border-l-4 border-primary-600' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-primary-600 hover:text-white hover:shadow-lg border-l-4 border-transparent hover:border-primary-700 font-medium'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
