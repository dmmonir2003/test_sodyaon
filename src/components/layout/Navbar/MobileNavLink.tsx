"use client "
import Link from "next/link";
import {ChevronRight } from "lucide-react";
export default function MobileNavLink({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-base font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
    >
      {text}
      <ChevronRight className="h-5 w-5 text-slate-400" />
    </Link>
  );
}
