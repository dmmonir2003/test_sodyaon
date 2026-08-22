"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Bot,
  Heart,
  ShoppingBag,
  Zap,
  Gift,
  Tag,
  User,
  Truck,
  BookOpen,
  SlidersHorizontal,
  Flame
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileMenuOpen } from "@/store/ui/uiSlice";
import { useGetCategoriesQuery } from "@/store/admin/adminContentApi";
import { useAuth } from "@/components/admin/AuthContext";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import BgThemeSwitcher from "@/components/shared/BgThemeSwitcher";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

// Fallback categories for mobile
const fallbackCategories = [
  {
    slug: "baby-care",
    nameBn: "বেবি কেয়ার ও ডায়াপার",
    nameEn: "Baby Care & Diaper",
    children: [
      { slug: "baby-food", nameBn: "শিশু খাবার", nameEn: "Baby Food" },
      { slug: "baby-bags", nameBn: "শিশু ব্যাগ", nameEn: "Baby Bags" },
      { slug: "diapers", nameBn: "ডায়াপার", nameEn: "Diapers" },
      { slug: "baby-clothes", nameBn: "শিশু পোশাক", nameEn: "Baby Clothes" },
      { slug: "baby-care-products", nameBn: "শিশু যত্ন পণ্য", nameEn: "Baby Care" },
      { slug: "diapers-wipes", nameBn: "ডায়াপার ও ওয়াইপস", nameEn: "Wipes & Diapers" },
    ],
  },
  {
    slug: "stem-blocks",
    nameBn: "স্টেম ও বিল্ডিং ব্লগস",
    nameEn: "STEM & Building Blocks",
    children: [
      { slug: "magnetic-blocks", nameBn: "চৌম্বকীয় বিল্ডিং খেলনা", nameEn: "Magnetic Tiles" },
      { slug: "robotics-kits", nameBn: "রোবোটিক্স ও স্টেম কিটস", nameEn: "Robotics Kits" },
      { slug: "science-kits", nameBn: "বিজ্ঞান সেট", nameEn: "Science Kits" },
      { slug: "wooden-blocks", nameBn: "কাঠের ব্লক", nameEn: "Wooden Blocks" },
    ],
  },
  {
    slug: "educational-toys",
    nameBn: "শিক্ষামূলক খেলনা",
    nameEn: "Educational Toys",
    children: [
      { slug: "learning-tablets", nameBn: "লার্নিং ট্যাবলেট ও ডিভাইস", nameEn: "Learning Tablets" },
      { slug: "puzzle-games", nameBn: "ধাঁধা ও পাজল", nameEn: "Puzzles" },
      { slug: "drawing-boards", nameBn: "ড্রয়িং বোর্ড ও আর্ট", nameEn: "Art & Drawing" },
      { slug: "math-games", nameBn: "গণিত ও সংখ্যা শেখা", nameEn: "Math Toys" },
    ],
  },
  {
    slug: "dolls-pretend-play",
    nameBn: "পুতুল ও প্রিটেন্ড প্লে",
    nameEn: "Dolls & Pretend Play",
    children: [
      { slug: "fashion-dolls", nameBn: "ফ্যাশন পুতুল ও রোলপ্লে", nameEn: "Fashion Dolls" },
      { slug: "kitchen-sets", nameBn: "রান্নাঘর ও কুকিং সেট", nameEn: "Kitchen Sets" },
      { slug: "doctor-sets", nameBn: "ডাক্তার সেট", nameEn: "Doctor Sets" },
      { slug: "playhouse-tents", nameBn: "প্লেহাউস ও তাঁবু", nameEn: "Playhouse Tents" },
    ],
  },
];

export default function MobileNavDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  const { user } = useAuth();

  // Fetch live categories tree
  const { data: catData } = useGetCategoriesQuery({ tree: true });
  const dbCategories = catData?.data || [];
  const dbRootCategories = dbCategories.filter((c: any) => !c.parentId && c.showInMegaMenu !== false);
  const rootCategories = dbRootCategories.length > 0 ? dbRootCategories : fallbackCategories;

  // Active/Expanded accordion state
  const defaultCategory = rootCategories.find((c: any) => c.isMegaMenuDefault) || rootCategories[0] || null;
  const [expandedCatSlug, setExpandedCatSlug] = useState<string>("");
  const [isAiExpanded, setIsAiExpanded] = useState<boolean>(false);

  // Initialize expanded category to default on open
  useEffect(() => {
    if (isOpen && defaultCategory && !expandedCatSlug) {
      setExpandedCatSlug(defaultCategory.slug);
    }
  }, [isOpen, defaultCategory]);

  const closeDrawer = () => {
    dispatch(setMobileMenuOpen(false));
  };

  const toggleCategory = (slug: string) => {
    setExpandedCatSlug((prev) => (prev === slug ? "" : slug));
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeDrawer}
      />

      {/* Main Drawer */}
      <div className="relative flex flex-col w-[85%] max-w-sm h-dvh bg-white dark:bg-slate-900 shadow-2xl z-10 overflow-hidden border-r border-slate-100 dark:border-slate-800 animate-slide-right">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AnimatedLogo className="w-8 h-8" />
            <span className="font-heading font-black text-xl text-slate-900 dark:text-white tracking-tight flex items-center">
              সদা<span className="text-primary-600">য়ন</span>
            </span>
            <span className="text-[10px] font-bold bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
              মেন্যু
            </span>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 -mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Horizontal Action Chips */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto hide-scrollbar flex items-center gap-2">
          <Link
            href="/shop"
            onClick={closeDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 text-xs font-bold whitespace-nowrap shadow-sm border border-primary-100 dark:border-primary-900/50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>সব খেলনা</span>
          </Link>
          <Link
            href="/deals"
            onClick={closeDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-bold whitespace-nowrap shadow-sm border border-amber-100 dark:border-amber-900/50"
          >
            <Flame className="h-3.5 w-3.5" />
            <span>ফ্ল্যাশ ডিল</span>
          </Link>
          <Link
            href="/combo"
            onClick={closeDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 text-xs font-bold whitespace-nowrap shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <Gift className="h-3.5 w-3.5" />
            <span>কম্বো অফার</span>
          </Link>
          <Link
            href="/shop/age"
            onClick={closeDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold whitespace-nowrap shadow-sm border border-indigo-100 dark:border-indigo-900/50"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>বয়স ভিত্তিক</span>
          </Link>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Main Categories & Subcategories Accordion */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-primary-600" />
                ক্যাটাগরি ও সাব-ক্যাটাগরি
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-mono font-bold">
                {rootCategories.length} টি
              </span>
            </div>

            <div className="space-y-2">
              {rootCategories.map((cat: any) => {
                const isExpanded = expandedCatSlug === cat.slug;
                const subcats = cat.children || [];
                const isImage = cat.icon && (cat.icon.startsWith("http") || cat.icon.startsWith("/") || cat.icon.startsWith("data:"));

                return (
                  <div
                    key={cat.id || cat._id || cat.slug}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isExpanded
                        ? "bg-slate-50/90 dark:bg-slate-850/80 border-primary-200 dark:border-primary-900/60 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-slate-200"
                    }`}
                  >
                    {/* Main Category Row Header */}
                    <div className="flex items-center justify-between p-3 gap-2">
                      <Link
                        href={`/shop/categories/${cat.slug}`}
                        onClick={closeDrawer}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        {/* Icon Thumbnail */}
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs">
                          {isImage ? (
                            <img src={cat.icon} alt={cat.nameEn} className="w-6 h-6 object-contain" />
                          ) : (
                            <span className="text-xs font-black text-primary-600 dark:text-primary-400 uppercase">
                              {cat.nameEn?.[0] || "C"}
                            </span>
                          )}
                        </div>

                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-bengali truncate">
                            {cat.nameBn || cat.nameEn}
                          </div>
                          {cat.nameEn && (
                            <div className="text-[10px] text-slate-400 truncate">
                              {cat.nameEn}
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Expand / Collapse Button */}
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.slug)}
                        className={`p-2 rounded-xl transition-all ${
                          isExpanded
                            ? "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rotate-180"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600"
                        }`}
                        aria-label="Toggle Subcategories"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subcategories Accordion Content */}
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 dark:border-slate-800 space-y-2.5 animate-fade-in">
                        {subcats.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {subcats.map((sub: any) => (
                              <Link
                                key={sub.id || sub._id || sub.slug}
                                href={`/shop/categories/${cat.slug}?subcategory=${sub.slug}`}
                                onClick={closeDrawer}
                                className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60 hover:border-primary-400 text-center font-bengali text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-2xs active:scale-95 transition-all flex items-center justify-center min-h-[36px]"
                              >
                                <span className="line-clamp-2">{sub.nameBn || sub.nameEn}</span>
                              </Link>
                            ))}
                          </div>
                        ) : null}

                        {/* Direct "View All" link for category */}
                        <Link
                          href={`/shop/categories/${cat.slug}`}
                          onClick={closeDrawer}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary-600/10 hover:bg-primary-600/20 text-primary-600 dark:text-primary-400 font-bold font-bengali text-xs transition-colors"
                        >
                          <span>{cat.nameBn} এর সব পণ্য দেখুন</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => setIsAiExpanded(!isAiExpanded)}
              className="w-full flex items-center justify-between p-3.5 text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-bengali">
                    স্মার্ট এআই টুলস (AI Solutions)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    গিফট ফাইন্ডার, প্যারেন্টিং অ্যাসিস্ট্যান্ট
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  isAiExpanded ? "rotate-180 text-indigo-500" : ""
                }`}
              />
            </button>

            {isAiExpanded && (
              <div className="px-3 pb-3 space-y-1.5 border-t border-slate-200/60 dark:border-slate-800 pt-2">
                <Link
                  href="/ai-tools/gift-finder"
                  onClick={closeDrawer}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition"
                >
                  <span className="font-bengali">এআই গিফট ফাইন্ডার (AI Gift Finder)</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </Link>
                <Link
                  href="/ai-tools/parenting-assistant"
                  onClick={closeDrawer}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition"
                >
                  <span className="font-bengali">প্যারেন্টিং অ্যাসিস্ট্যান্ট</span>
                  <Bot className="h-3.5 w-3.5 text-indigo-500" />
                </Link>
                <Link
                  href="/ai-tools/compare"
                  onClick={closeDrawer}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition"
                >
                  <span className="font-bengali">খেলনা তুলনা (Toy Comparison)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              </div>
            )}
          </div>

          {/* Useful Pages & Features */}
          <div className="space-y-1 pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-1 block mb-2">
              অন্যান্য পেইজ
            </span>
            <Link
              href="/features"
              onClick={closeDrawer}
              className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                ফিচারসমূহ
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              href="/blog"
              onClick={closeDrawer}
              className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                ব্লগ ও প্লে আইডিয়াস
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              href="/track-order"
              onClick={closeDrawer}
              className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-500" />
                অর্ডার ট্র্যাক করুন
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              href="/wishlist"
              onClick={closeDrawer}
              className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                উইশলিস্ট (পছন্দের তালিকা)
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer: User Profile & Themes */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500">থিম:</span>
              <BgThemeSwitcher />
              <ThemeSwitcher />
            </div>

            {user ? (
              <Link
                href="/profile"
                onClick={closeDrawer}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <User className="h-3.5 w-3.5" />
                <span className="truncate max-w-[100px]">{user.name?.split(" ")[0] || "প্রোফাইল"}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeDrawer}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                <User className="h-3.5 w-3.5" />
                <span>লগইন / একাউন্ট</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
