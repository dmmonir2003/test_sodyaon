"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, Bot, Heart, Package } from "lucide-react";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import BgThemeSwitcher from "@/components/shared/BgThemeSwitcher";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-indigo-100 dark:border-slate-800">
      {/* Top Banner */}
      <div className="bg-primary-600 text-white text-center py-1 text-xs md:text-sm font-medium tracking-wide">
        ২৫০০ টাকার উপরের অর্ডারে ফ্রি শিপিং! কোড ব্যবহার করুন TOYFUN24
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-primary-600 dark:text-slate-300 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <Link href="/" className="flex items-center gap-2 hover-lift">
              <div className="bg-primary-500 text-white p-1.5 rounded-xl shadow-md rotate-3">
                <Package className="h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-2xl text-slate-800 dark:text-white tracking-tight">
                Play<span className="text-primary-600">Time</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
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

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/ai-tools/gift-finder" className="hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-primary-600 dark:text-slate-300 transition-colors text-sm font-medium mr-2 group">
              <Bot className="h-5 w-5 text-secondary-500 group-hover:scale-110 transition-transform" />
              <span>এআই গিফট ফাইন্ডার</span>
            </Link>

            <BgThemeSwitcher />
            <ThemeSwitcher />

            <button className="text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <User className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="hidden sm:block text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                ৩
              </span>
            </Link>
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
              { label: "প্যারেন্টিং অ্যাসিস্ট্যান্ট", href: "/ai-tools/parenting-assistant" },
              { label: "খেলনা তুলনা", href: "/ai-tools/compare" }
            ]}
          />
          <NavLink href="/features" text="ফিচারসমূহ" />
          <NavLink href="/blog" text="ব্লগ ও প্লে আইডিয়াস" />
        </nav>
      </div>

      {/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl py-4 flex flex-col max-h-[80vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="px-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="খেলনা খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary-400 outline-none"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <MobileNavLink href="/" text="হোম" />
          <MobileNavLink href="/shop" text="শপ" />
          <MobileNavLink href="/shop" text="শিশু পণ্য" highlighted />
          <MobileNavLink href="/ai-tools" text="এআই টুলস" className="text-secondary-600 font-bold" />
          <MobileNavLink href="/blog" text="ব্লগ ও শিখন" />
          <MobileNavLink href="/parenting-assistant" text="প্যারেন্টিং অ্যাসিস্ট্যান্ট" />
        </div>
      )}
    </header>
  );
}

function NavLink({ href, text, className = "" }: { href: string; text: string; className?: string }) {
  return (
    <Link href={href} className={`text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 font-medium text-sm lg:text-base transition-colors ${className}`}>
      {text}
    </Link>
  );
}

function NavDropdown({ title, items = [], highlighted = false, className = "" }: { title: string; items?: { label: string, href: string }[]; highlighted?: boolean; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`flex items-center space-x-1 font-medium text-sm lg:text-base transition-colors ${highlighted ? 'bg-primary-50 text-primary-700 px-3 py-1 -my-1 rounded-full' : 'text-slate-600 hover:text-primary-600 dark:text-slate-300'} ${className}`}>
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full -left-4 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 mt-4 transition-all duration-300 transform origin-top-left p-2 z-50 ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-col space-y-1">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg text-sm text-slate-600 dark:text-slate-300 transition-colors font-medium">
              {item.label}
            </Link>
          ))}
          {items.length === 0 && (
            <div className="px-4 py-2 text-sm text-slate-400">কোন আইটেম নেই।</div>
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
      <Link href="/shop" className="flex items-center space-x-1 font-medium text-sm lg:text-base text-primary-600 dark:text-primary-400 transition-colors py-1">
        <span>শপ</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 transform z-50 rounded-b-2xl border-t border-slate-100 dark:border-slate-800 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4 gap-8">

            {/* Column 1: Featured & Quick Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">কুইক লিংক</h3>
              <ul className="space-y-4">
                <li><Link href="/shop" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">সব খেলনা দেখুন</Link></li>
                <li><Link href="/shop/age" className="text-sm font-bold text-primary-600 dark:text-primary-400">বয়স-ভিত্তিক ফাইন্ডার</Link></li>
                <li><Link href="/deals" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">ফ্ল্যাশ ডিল</Link></li>
                <li><Link href="/bundles" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">বান্ডেল ডিল</Link></li>
              </ul>
            </div>

            {/* Column 2: Popular Categories */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">শীর্ষ ক্যাটাগরি</h3>
              <ul className="space-y-4">
                <li><Link href="/shop/categories/action-figures" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">অ্যাকশন ফিগার</Link></li>
                <li><Link href="/shop/categories/building-sets" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">বিল্ডিং সেট</Link></li>
                <li><Link href="/shop/categories/educational" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">শিক্ষামূলক</Link></li>
                <li><Link href="/shop/categories/dolls" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">পুতুল ও ফিগার</Link></li>
                <li><Link href="/shop/categories/outdoor" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">আউটডোর প্লে</Link></li>
              </ul>
            </div>

            {/* Column 3: Shop By Age */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">শিশু পণ্য




              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/shop/baby-food" className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300">শিশু খাবার</Link>
                <Link href="/shop/baby-bags" className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-bold text-primary-600 dark:text-primary-400">শিশু ব্যাগ</Link>
                <Link href="/shop/diapers" className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300">ডায়াপার</Link>
                <Link href="/shop/baby-clothes" className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300">শিশু পোশাক</Link>
                <Link href="/shop/baby-care" className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300">শিশু যত্ন পণ্য</Link>

              </div>
            </div>

            {/* Column 4: Promo Banana */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute right-0 top-0 opacity-5">
                <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 relative z-10">সীমিত সময়</span>
              <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2 relative z-10">স্টেম খেলনায় ২০% ছাড়</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 relative z-10 leading-relaxed">আমাদের নতুন শিক্ষামূলক টুলকিট অন্বেষণ করুন।</p>
              <Link href="/shop/categories/educational" className="inline-flex items-center justify-center w-full max-w-xs px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-primary-700 transition-colors relative z-10">
                শপ নাও
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavLink({ href, text, highlighted = false, className = "" }: { href: string; text: string; highlighted?: boolean; className?: string }) {
  return (
    <Link href={href} className={`px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-base font-medium ${highlighted ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-200'} ${className}`}>
      {text}
      <ChevronDown className="-rotate-90 h-5 w-5 text-slate-400" />
    </Link>
  );
}
