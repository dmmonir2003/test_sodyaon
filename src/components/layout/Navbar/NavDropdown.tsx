import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavDropdown({
  title,
  items = [],
  highlighted = false,
  className = "",
}: {
  title: string;
  items?: { label: string; href: string }[];
  highlighted?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`flex items-center space-x-1 font-bold text-sm lg:text-base transition-colors ${highlighted ? "bg-primary-50 text-primary-700 px-3 py-1 -my-1 rounded-full" : "text-slate-600 hover:text-primary-600 dark:text-slate-300"} ${className}`}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <div
        className={`absolute top-full -left-4 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 mt-4 transition-all duration-300 transform origin-top-left p-2 z-50 ${isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-col space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {items.length === 0 && (
            <div className="px-4 py-2 text-sm text-slate-400">
              কোন আইটেম নেই।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}