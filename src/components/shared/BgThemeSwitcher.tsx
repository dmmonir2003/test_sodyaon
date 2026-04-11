"use client";

import { useEffect, useState, useRef } from "react";
import { MoonStar, Check, Sun, Moon, CloudMoon, Sunset } from "lucide-react";

export type BgTheme = "light" | "dark" | "sepia" | "dim" | "midnight";

const bgThemes: { id: BgTheme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light Theme", icon: <Sun className="h-4 w-4" /> },
  { id: "dark", label: "Dark Theme", icon: <Moon className="h-4 w-4" /> },
  { id: "sepia", label: "Sepia Warm", icon: <Sunset className="h-4 w-4" /> },
  { id: "dim", label: "Dim Dark", icon: <CloudMoon className="h-4 w-4" /> },
  { id: "midnight", label: "Midnight Blue", icon: <MoonStar className="h-4 w-4" /> },
];

export default function BgThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBg, setActiveBg] = useState<BgTheme>("light");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved bg-theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("bg-theme") as BgTheme | null;
    const currentAttr = document.documentElement.getAttribute("data-bg") as BgTheme | null;
    
    if (savedTheme && bgThemes.some(t => t.id === savedTheme)) {
      setActiveBg(savedTheme);
      applyBgTheme(savedTheme);
    } else if (currentAttr && bgThemes.some(t => t.id === currentAttr)) {
      setActiveBg(currentAttr);
    } else {
      // Check system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = isDark ? "dark" : "light";
      setActiveBg(defaultTheme);
      applyBgTheme(defaultTheme);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyBgTheme = (theme: BgTheme) => {
    // 1. Set the data attribute for CSS variable overrides (dim, midnight, sepia)
    document.documentElement.setAttribute("data-bg", theme);
    
    // 2. Add or remove Tailwind's dark class trigger
    if (["dark", "dim", "midnight"].includes(theme)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeChange = (themeId: BgTheme) => {
    setActiveBg(themeId);
    applyBgTheme(themeId);
    localStorage.setItem("bg-theme", themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        title="ব্যাকগ্রাউন্ড থিম পরিবর্তন করুন"
      >
        <MoonStar className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50">
          <div className="p-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 rounded-t-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">ব্যাকগ্রাউন্ড</p>
          </div>
          <div className="flex flex-col py-1">
            {bgThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm w-full text-left transition-colors ${
                  activeBg === theme.id 
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {theme.icon}
                  <span>{theme.label}</span>
                </div>
                {activeBg === theme.id && <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
