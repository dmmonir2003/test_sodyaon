"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Settings, Clock, Activity, ChevronDown, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/user/profile/profileSlice";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { data: user } = useAppSelector((state) => state.profile);

  // Prevent SSR/client hydration mismatch — only render after mount
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 1024 && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    router.push("/login");
  };

  const ProfilLinks = () => (
    <>
      <Link 
        href="/profile" 
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 px-4 py-3 lg:py-2.5 text-base md:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-b lg:border-0 border-slate-100 dark:border-slate-800"
      >
        <User className="h-5 w-5 lg:h-4 lg:w-4" />
        <span className="font-medium lg:font-normal">ড্যাশবোর্ড</span>
      </Link>
      
      <Link 
        href="/profile/child-profile" 
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 px-4 py-3 lg:py-2.5 text-base md:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-b lg:border-0 border-slate-100 dark:border-slate-800"
      >
        <Activity className="h-5 w-5 lg:h-4 lg:w-4" />
        <span className="font-medium lg:font-normal">চাইল্ড প্রোফাইল</span>
      </Link>

      <Link 
        href="/profile/order-history" 
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 px-4 py-3 lg:py-2.5 text-base md:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-b lg:border-0 border-slate-100 dark:border-slate-800"
      >
        <Clock className="h-5 w-5 lg:h-4 lg:w-4" />
        <span className="font-medium lg:font-normal">অর্ডার হিস্ট্রি</span>
      </Link>

      <Link 
        href="/profile/settings" 
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 px-4 py-3 lg:py-2.5 text-base md:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <Settings className="h-5 w-5 lg:h-4 lg:w-4" />
        <span className="font-medium lg:font-normal">একাউন্ট সেটিংস</span>
      </Link>

      <div className="hidden lg:block border-t border-slate-100 dark:border-slate-700 my-1"></div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-4 lg:py-2.5 text-base md:text-sm text-danger-600 dark:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors w-full text-left mt-auto lg:mt-0 lg:border-0 border-t border-slate-100 dark:border-slate-800"
      >
        <LogOut className="h-5 w-5 lg:h-4 lg:w-4" />
        <span className="font-bold">লগ আউট</span>
      </button>
    </>
  );

  // SSR-safe: render nothing interactive until mounted on client
  if (!mounted) {
    return (
      <Link href="/login" className="hidden sm:flex items-center gap-2 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-xl text-sm font-semibold border border-primary-100 dark:border-primary-800 hover:bg-primary-100 transition-colors">
        <User className="h-4 w-4" /> লগইন
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full sm:rounded-xl group"
      >
        <div className="bg-primary-100 dark:bg-primary-900/40 p-1.5 rounded-full text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
          <User className="h-5 w-5 lg:h-4 lg:w-4" />
        </div>
        <span className="font-bold text-sm hidden lg:block max-w-[100px] truncate">
          {user?.name || "আমার স্পেস"}
        </span>
        <ChevronDown className={`hidden lg:block h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DESKTOP DROPDOWN (lg and up) */}
      {isOpen && (
        <div className="hidden lg:block absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.name || "আমার প্রোফাইল"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.phone || user?.email || ""}</p>
          </div>
          <div className="flex flex-col py-1">
            <ProfilLinks />
          </div>
        </div>
      )}

      {/* MOBILE FULL-HEIGHT SIDEBAR (below lg) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-0 right-0 h-[100dvh] w-[280px] bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-primary-100 dark:bg-primary-900/40 p-2 rounded-full text-primary-600 dark:text-primary-400 flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-800 dark:text-white truncate">{user?.name || "আমার প্রোফাইল"}</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{user?.phone || user?.email || ""}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-full transition-colors flex-shrink-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2 flex flex-col pt-4">
              <ProfilLinks />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
