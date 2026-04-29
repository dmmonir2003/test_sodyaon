"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useColors } from '@/hooks/useColors';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const colors = useColors();

  // Handle scroll events
  const handleScroll = () => {
    // Show button when page is scrolled down
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Calculate scroll progress percentage
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  // Scroll the window to the top
  const scrollToTop = () => {
    // Try window first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // Backup for certain mobile environments or older browsers
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // SVG Circle parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-24 md:bottom-10 right-6 z-50 animate-in fade-in zoom-in slide-in-from-bottom-5 hidden md:block">
          <div className="relative flex items-center justify-center h-14 w-14">
            {/* SVG Progress Circle */}
            <svg className="absolute -rotate-90 transform pointer-events-none" width="56" height="56">
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="3.5"
                fill="transparent"
                className="text-slate-200 dark:text-slate-800"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="3.5"
                fill="transparent"
                style={{ 
                  strokeDasharray: circumference,
                  strokeDashoffset: dashOffset,
                  transition: 'stroke-dashoffset 0.1s ease-out'
                }}
                className="text-primary-600"
              />
            </svg>

            {/* Scroll Action Button */}
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll to top"
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-md transition-all duration-300 hover:bg-primary-600 hover:text-white hover:scale-105 active:scale-95 focus:outline-none"
            >
              <ChevronUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
