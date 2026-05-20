"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function UserDropdown() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: user } = useAppSelector((state) => state.profile);

  useEffect(() => { setMounted(true); }, []);

  // Before hydration completes, render the login link (matches server output)
  if (!mounted || !user) {
    return (
      <Link 
        href={pathname !== "/" ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login"} 
        className="hidden sm:flex items-center gap-2 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-xl text-sm font-semibold border border-primary-100 dark:border-primary-800 hover:bg-primary-100 transition-colors"
      >
        <User className="h-4 w-4" /> 
        <span>লগইন</span>
      </Link>
    );
  }

  return (
    <Link 
      href="/profile"
      className="flex items-center gap-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-full sm:rounded-xl group"
    >
      <div className="bg-primary-100 dark:bg-primary-900/40 p-1.5 rounded-full text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 shadow-sm transition-colors group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60">
        <User className="h-5 w-5 lg:h-4 lg:w-4" />
      </div>
      <span className="font-bold text-sm hidden lg:block max-w-[100px] truncate">
        {user.name}
      </span>
    </Link>
  );
}
