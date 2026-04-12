"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Bot,
  Heart,
  Package,
  ChevronRight,
} from "lucide-react";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import BgThemeSwitcher from "@/components/shared/BgThemeSwitcher";
import UserDropdown from "./UserDropdown";
import { useAppSelector } from "@/store/hooks";

// Interface definitions
interface MenuItemConfig {
  label: string;
  href: string;
  color?: "slate" | "primary" | "secondary";
  isHighlighted?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: MenuItemConfig[];
}

interface MobileMenuSectionProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  items: MenuItemConfig[];
  onClose: () => void;
  showSubcategories?: boolean;
}

// Helper Components - defined before Navbar to ensure proper hoisting
function MobileNavLink({
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

// add somthing

function MobileMenuSection({
  id,
  title,
  isExpanded,
  onToggle,
  items,
  onClose,
  showSubcategories = false,
}: MobileMenuSectionProps) {
  const [expandedSubItems, setExpandedSubItems] = useState<
    Record<string, boolean>
  >({});

  const toggleSubItem = (itemLabel: string) => {
    setExpandedSubItems((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  return (
    <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-full" : "max-h-0"}`}
      >
        <div className="space-y-1 mt-2">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            const hasSubItems =
              showSubcategories && item.subItems && item.subItems.length > 0;
            const isSubExpanded = expandedSubItems[item.label];

            return (
              <div key={`${item.label}-${index}`}>
                {hasSubItems ? (
                  <button
                    onClick={() => toggleSubItem(item.label)}
                    className={`w-full flex items-center justify-between py-2 px-3 text-base font-bold rounded-xl transition-colors ${
                      item.isHighlighted
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : `text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isSubExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-2 px-3 text-base font-bold rounded-xl transition-colors ${
                      item.isHighlighted
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : `text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {item.label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 ${item.isHighlighted ? "text-primary-400" : "text-slate-400"}`}
                    />
                  </Link>
                )}

                {/* Render sub-items if they exist */}
                {hasSubItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ml-4 ${isSubExpanded ? "max-h-full" : "max-h-0"}`}
                  >
                    <div className="space-y-1 mt-1">
                      {item.subItems!.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={onClose}
                          className={`flex items-center justify-between py-1.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                            subItem.isHighlighted
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : `text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50`
                          }`}
                        >
                          {subItem.label}
                          <ChevronRight
                            className={`h-3 w-3 ${subItem.isHighlighted ? "text-primary-400" : "text-slate-400"}`}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  text,
  className = "",
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 font-bold text-sm lg:text-base transition-colors ${className}`}
    >
      {text}
    </Link>
  );
}

function NavDropdown({
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

function ShopMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/shop"
        className="flex items-center space-x-1 font-bold text-sm lg:text-base text-primary-600 dark:text-primary-400 transition-colors py-1"
      >
        <span>শপ</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 transform z-50 rounded-b-2xl border-t border-slate-100 dark:border-slate-800 ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                কুইক লিংক
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    সব খেলনা দেখুন
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/age"
                    className="text-sm font-bold text-primary-600 dark:text-primary-400"
                  >
                    বয়স-ভিত্তিক ফাইন্ডার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deals"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    ফ্ল্যাশ ডিল
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bundles"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    বান্ডেল ডিল
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শীর্ষ ক্যাটাগরি
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop/categories/action-figures"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    অ্যাকশন ফিগার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/building-sets"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    বিল্ডিং সেট
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/educational"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    শিক্ষামূলক
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/dolls"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    পুতুল ও ফিগার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/outdoor"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    আউটডোর প্লে
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শিশু পণ্য
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/shop/baby-food"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু খাবার
                </Link>
                <Link
                  href="/shop/baby-bags"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-bold text-primary-600 dark:text-primary-400"
                >
                  শিশু ব্যাগ
                </Link>
                <Link
                  href="/shop/diapers"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  ডায়াপার
                </Link>
                <Link
                  href="/shop/baby-clothes"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু পোশাক
                </Link>
                <Link
                  href="/shop/baby-care"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু যত্ন পণ্য
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute right-0 top-0 opacity-5">
                <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 relative z-10">
                সীমিত সময়
              </span>
              <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2 relative z-10">
                স্টেম খেলনায় ২০% ছাড়
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 relative z-10 leading-relaxed">
                আমাদের নতুন শিক্ষামূলক টুলকিট অন্বেষণ করুন।
              </p>
              <Link
                href="/shop/categories/educational"
                className="inline-flex items-center justify-center w-full max-w-xs px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-primary-700 transition-colors relative z-10"
              >
                শপ নাও
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const { isAuthenticated } = useAppSelector((state) => state.profile);

  // Prevent scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-indigo-100 dark:border-slate-800">
      {/* 1st Line: Top Banner */}
      <div className="bg-primary-600 text-white text-center py-1.5 md:py-1 px-4 text-xs md:text-sm font-medium tracking-wide">
        ২৫০০ টাকার উপরের অর্ডারে ফ্রি শিপিং! কোড ব্যবহার করুন TOYFUN24
      </div>

      {/* Main Navbar Header Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2nd Line: Mobile Header (Logo Left after hamburger, Actions Right) */}
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile: Hamburger + Logo (left side) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 focus:outline-none transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2 hover-lift -ml-1">
              <div className="bg-primary-500 text-white p-1 rounded-lg shadow-sm rotate-3">
                <Package className="h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-xl text-slate-800 dark:text-white tracking-tight">
                Play<span className="text-primary-600">Time</span>
              </span>
            </Link>
          </div>

          {/* Desktop Logo - visible on md and above */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 hover-lift"
          >
            <div className="bg-primary-500 text-white p-1.5 rounded-xl shadow-md">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-heading font-bold text-2xl text-slate-800 dark:text-white tracking-tight">
              Play<span className="text-primary-600">Time</span>
            </span>
          </Link>

          {/* Center/Left: Logo + Theme Switchers (Mobile) */}
          <div className="flex justify-end md:justify-start flex-1 md:flex-none items-center gap-2">
            {/* Mobile-only Theme Switchers right after Logo */}
            <div className="flex sm:hidden justify-end gap-0.5 ml-1">
              <BgThemeSwitcher />
              <ThemeSwitcher />
              <Link
                href="/wishlist"
                className="flex items-center justify-center text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <Heart className="h-5 w-5" />
              </Link>

              <Link
                href="/cart"
                className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                  ৩
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Search (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="নিখুঁত খেলনা খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm shadow-sm hover:shadow-md"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end flex-none gap-2 md:gap-4 lg:space-x-4">
            <Link
              href="/ai-tools/gift-finder"
              className="hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-primary-600 dark:text-slate-300 transition-colors text-sm font-medium mr-2 group"
            >
              <Bot className="h-5 w-5 text-secondary-500 group-hover:scale-110 transition-transform" />
              <span>এআই গিফট ফাইন্ডার</span>
            </Link>

            {/* <div className="hidden sm:flex items-center gap-2">
              <BgThemeSwitcher />
              <ThemeSwitcher />

            </div> */}

            <div className="hidden sm:flex items-center gap-2">
              <BgThemeSwitcher />
              <ThemeSwitcher />

              <Link
                href="/wishlist"
                className="flex items-center justify-center text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <Heart className="h-5 w-5" />
              </Link>

              <Link
                href="/cart"
                className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                  ৩
                </span>
              </Link>
            </div>

            {/* <Link href="/wishlist" className="flex items-center justify-center text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Heart className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                ৩
              </span>
            </Link> */}
            {/* Desktop & Mobile: User Auth Dropdown */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 font-bold px-4 py-2 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/60 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>লগইন</span>
                  </Link>
                  <Link
                    href="/login"
                    className="sm:hidden flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 py-3 w-full justify-center border-t border-slate-100 dark:border-slate-800/50 relative">
          <NavLink href="/" text="হোম" />
          <ShopMegaMenu />
          <NavDropdown
            title="এআই টুলস"
            className="text-primary-600"
            items={[
              { label: "এআই গিফট ফাইন্ডার", href: "/ai-tools/gift-finder" },
              {
                label: "প্যারেন্টিং অ্যাসিস্ট্যান্ট",
                href: "/ai-tools/parenting-assistant",
              },
              { label: "খেলনা তুলনা", href: "/ai-tools/compare" },
            ]}
          />
          <NavLink href="/features" text="ফিচারসমূহ" />
          <NavLink href="/blog" text="ব্লগ ও প্লে আইডিয়াস" />
        </nav>
      </div>

      {/* 3rd Line: Mobile Search Bar (Always visible below header on Mobile) */}
      <div className="md:hidden px-4 pb-3 border-t border-slate-100 dark:border-slate-800/50 pt-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="খেলনা খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white focus:border-primary-400 transition-all outline-none text-sm shadow-sm"
          />
          <Search className="absolute left-3.5 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
        </div>
      </div>

      {/* Left Sidebar Overlay & Menu (Mobile Hamburger) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          {/* Black Overlay Background */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Main Left Drawer */}
          <div className="relative flex flex-col w-4/5 max-w-sm h-dvh bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-slate-100 dark:border-slate-800">
            {/* Header in Left Sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <span className="font-heading font-black text-xl text-slate-800 dark:text-white tracking-tight">
                মেন্যু{" "}
                <span className="text-primary-600 dark:text-primary-500">
                  অন্বেষণ
                </span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              <MobileNavLink
                href="/"
                text="হোম"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <MobileMenuSection
                id="shopping"
                title="কেনাকাটা"
                isExpanded={expandedSections.shopping}
                onToggle={() => toggleSection("shopping")}
                showSubcategories={true}
                items={[
                  // {
                  //   label: "সব খেলনা দেখুন",
                  //   href: "/shop",
                  //   color: "slate"
                  // },
                  // {
                  //   label: "বয়স-ভিত্তিক ফাইন্ডার",
                  //   href: "/shop/age",
                  //   color: "slate"
                  // },
                  // {
                  //   label: "ফ্ল্যাশ ডিল",
                  //   href: "/deals",
                  //   color: "secondary"
                  // },
                  // {
                  //   label: "বান্ডেল ডিল",
                  //   href: "/bundles",
                  //   color: "slate"
                  // },
                  {
                    label: "খেলনা সংগ্রহ",
                    href: "#",
                    color: "slate",
                    subItems: [
                      { label: "সব খেলনা দেখুন", href: "/shop" },
                      { label: "বয়স-ভিত্তিক ফাইন্ডার", href: "/shop/age" },
                      {
                        label: "ফ্ল্যাশ ডিল",
                        href: "/deals",
                        isHighlighted: true,
                      },
                      { label: "বান্ডেল ডিল", href: "/bundles" },
                    ],
                  },

                  {
                    label: "শীর্ষ ক্যাটাগরি",
                    href: "#",
                    color: "slate",
                    subItems: [
                      {
                        label: "অ্যাকশন ফিগার",
                        href: "/shop/categories/action-figures",
                      },
                      {
                        label: "বিল্ডিং সেট",
                        href: "/shop/categories/building-sets",
                      },
                      {
                        label: "শিক্ষামূলক",
                        href: "/shop/categories/educational",
                      },
                      {
                        label: "পুতুল ও ফিগার",
                        href: "/shop/categories/dolls",
                      },
                      {
                        label: "আউটডোর প্লে",
                        href: "/shop/categories/outdoor",
                      },
                    ],
                  },
                  {
                    label: "শিশু পণ্য",
                    href: "#",
                    color: "primary",
                    isHighlighted: true,
                    subItems: [
                      { label: "শিশু খাবার", href: "/shop/food" },
                      {
                        label: "শিশু ব্যাগ",
                        href: "/shop/bags",
                        isHighlighted: true,
                      },
                      { label: "ডায়াপার", href: "/shop/diapers" },
                      { label: "শিশু পোশাক", href: "/shop/clothes" },
                      { label: "শিশু যত্ন পণ্য", href: "/shop/care" },
                    ],
                  },
                  {
                    label: "উইশলিস্ট",
                    href: "/wishlist",
                    color: "slate",
                  },
                ]}
                onClose={() => setIsMobileMenuOpen(false)}
              />

              <MobileMenuSection
                id="ai-solutions"
                title="এআই সল্যুশনস"
                isExpanded={expandedSections["ai-solutions"]}
                onToggle={() => toggleSection("ai-solutions")}
                items={[
                  {
                    label: "এআই গিফট ফাইন্ডার",
                    href: "/ai-tools/gift-finder",
                    color: "secondary",
                    icon: Bot,
                  },
                  {
                    label: "প্যারেন্টিং অ্যাসিস্ট্যান্ট",
                    href: "/ai-tools/parenting-assistant",
                    color: "slate",
                  },
                  {
                    label: "খেলনা তুলনা",
                    href: "/ai-tools/compare",
                    color: "slate",
                  },
                ]}
                onClose={() => setIsMobileMenuOpen(false)}
              />

              <MobileNavLink
                href="/features"
                text="ফিচারসমূহ"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileNavLink
                href="/blog"
                text="ব্লগ ও শিখন"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            {/* Theme switches at the bottom of the drawer */}
            {/* <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-around">
              <BgThemeSwitcher />
              <ThemeSwitcher />
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
