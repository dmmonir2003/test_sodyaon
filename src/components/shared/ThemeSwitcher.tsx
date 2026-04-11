"use client";

import { useEffect, useState, useRef } from "react";
import { Palette, Check } from "lucide-react";

const themes = [
  { id: "playful-purple", label: "Playful Purple" },
  { id: "ocean-explorer", label: "Ocean Explorer" },
  { id: "candy-crush", label: "Candy Crush" },
  { id: "jungle-adventure", label: "Jungle Adventure" },
  { id: "firetruck-red", label: "Firetruck Red" },
  { id: "sunny-days", label: "Sunny Days" },
  { id: "sunset-magic", label: "Sunset Magic" },
  { id: "berry-splash", label: "Berry Splash" },
  { id: "soft-pastel", label: "Soft Pastel" },
  { id: "neon-arcade", label: "Neon Arcade" },
  { id: "premium-charcoal", label: "Premium Charcoal" },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("ocean-explorer");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme");
    // Check if the html tag has a data-theme already (from anti-FOIT script)
    const currentAttr = document.documentElement.getAttribute("data-theme");
    
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setActiveTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (currentAttr && themes.some(t => t.id === currentAttr)) {
      setActiveTheme(currentAttr);
    } else {
      // Default fallback
      setActiveTheme("ocean-explorer");
      document.documentElement.setAttribute("data-theme", "ocean-explorer");
    }

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("preferred-theme", themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        title="থিম পরিবর্তন করুন"
      >
        <Palette className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 max-h-[60vh] overflow-y-auto z-50">
          <div className="p-2 sticky top-0 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 z-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">কালার থিম</p>
          </div>
          <div className="flex flex-col py-1">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                  activeTheme === theme.id 
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <span>{theme.label}</span>
                {activeTheme === theme.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
