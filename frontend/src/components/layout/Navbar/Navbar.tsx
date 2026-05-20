
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Bot,
  Heart,
  Package,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMobileMenuOpen } from "@/store/ui/uiSlice";
import { setCartOpen } from "@/store/user/cart/cartSlice";

import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import BgThemeSwitcher from "@/components/shared/BgThemeSwitcher";
import UserDropdown from "../UserDropdown";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

import ShopMegaMenu from "./ShopMegaMenu";
import MobileNavLink from "./MobileNavLink";
import NavLink from "./NavLink";
import MobileMenuSection from "./MobileMenuSection";
import NavDropdown from "./NavDropdown";
import PopularSearchTags from "@/components/shared/PopularSearchTags";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [isDesktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.profile);
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  const isMobileSearchOpen = useAppSelector((state) => state.ui.isMobileSearchOpen);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Animation variants for the text "সদায়ন"
  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 4.5, // Starts just as the AnimatedLogo finishes its sequence
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 10 }
    }
  };

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
              onClick={() => dispatch(setMobileMenuOpen(true))}
              className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 focus:outline-none transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-1 hover-lift -ml-1">
              <AnimatedLogo className="w-8 h-8 md:w-14 md:h-14" />
              <motion.span 
                className="font-heading font-bold  text-slate-800 dark:text-white tracking-tight flex -ml-1 md:text-3xl text-xl"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={letterVariants}>স</motion.span>
                <motion.span variants={letterVariants}>দা</motion.span>
                <motion.span variants={letterVariants} className="text-primary-600">য়</motion.span>
                <motion.span variants={letterVariants} className="text-primary-600">ন</motion.span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Logo - visible on md and above */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-1 hover-lift"
          >
            <AnimatedLogo className="w-8 h-8 md:w-14 md:h-14" />
              <motion.span 
                className="font-heading font-bold  text-slate-800 dark:text-white tracking-tight flex -ml-1 md:text-3xl text-xl"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={letterVariants}>স</motion.span>
                <motion.span variants={letterVariants}>দা</motion.span>
                <motion.span variants={letterVariants} className="text-primary-600">য়</motion.span>
                <motion.span variants={letterVariants} className="text-primary-600">ন</motion.span>
              </motion.span>
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

              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Search (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6 relative z-50">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="নিখুঁত খেলনা খুঁজুন..."
                onFocus={() => setDesktopSearchOpen(true)}
                onBlur={() => setTimeout(() => setDesktopSearchOpen(false), 200)}
                className={`w-full pl-10 pr-4 py-2.5 border-2 bg-slate-50 dark:bg-slate-800 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm shadow-sm hover:shadow-md ${isDesktopSearchOpen ? 'rounded-t-2xl border-primary-500 border-b-transparent shadow-none hover:shadow-none' : 'rounded-full border-slate-200 dark:border-slate-700'}`}
              />
              <Search className={`absolute left-3.5 top-3 h-4 w-4 transition-colors ${isDesktopSearchOpen ? 'text-primary-600' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
              
              {/* Desktop Dropdown Overlay */}
              <div className={`absolute top-[100%] left-0 w-full min-w-[400px] -mt-[2px] bg-white dark:bg-slate-900 border-2 border-primary-500 border-t-0 rounded-b-2xl shadow-xl overflow-hidden transition-all duration-200 origin-top transform ${isDesktopSearchOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                 <div className="p-5 border-t border-slate-100 dark:border-slate-800">
                    <PopularSearchTags />
                 </div>
              </div>
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

            <div className="hidden sm:flex items-center gap-2">
              <BgThemeSwitcher />
              <ThemeSwitcher />

              <Link
                href="/wishlist"
                className="flex items-center justify-center text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <Heart className="h-5 w-5" />
              </Link>

              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

               <a
              href="https://m.me/sodayon26?ref=website_navbar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 transition-colors p-1.5 sm:p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full"
              title="আমাদের সাথে মেসেঞ্জারে কথা বলুন"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.14 2 11.25C2 14.155 3.536 16.745 5.922 18.39V22L9.27 20.158C10.143 20.384 11.055 20.5 12 20.5C17.523 20.5 22 16.36 22 11.25C22 6.14 17.523 2 12 2ZM12.983 14.398L10.368 11.603L5.322 14.398L10.9 8.472L13.627 11.267L18.56 8.472L12.983 14.398Z"/>
              </svg>
            </a>
            </div>

           

            {/* Desktop: User Auth Dropdown (Hidden on Mobile) */}
            <div className="hidden md:flex items-center">
              <UserDropdown />
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

      {/* Note: The Mobile Search Drawer is now triggered by the MobileBottomNav globally and handled by the separate MobileSearchDrawer component at layout level. */}

      {/* Left Sidebar Overlay & Menu (Mobile Hamburger) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          {/* Black Overlay Background */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => dispatch(setMobileMenuOpen(false))}
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
                onClick={() => dispatch(setMobileMenuOpen(false))}
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
                onClick={() => dispatch(setMobileMenuOpen(false))}
              />

              <MobileMenuSection
                id="shopping"
                title="কেনাকাটা"
                isExpanded={expandedSections.shopping}
                onToggle={() => toggleSection("shopping")}
                showSubcategories={true}
                items={[
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
                      { label: "কম্বো অফার", href: "/combo" },
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
                onClose={() => dispatch(setMobileMenuOpen(false))}
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
                onClose={() => dispatch(setMobileMenuOpen(false))}
              />

              <MobileNavLink
                href="/features"
                text="ফিচারসমূহ"
                onClick={() => dispatch(setMobileMenuOpen(false))}
              />
              <MobileNavLink
                href="/blog"
                text="ব্লগ ও শিখন"
                onClick={() => dispatch(setMobileMenuOpen(false))}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}