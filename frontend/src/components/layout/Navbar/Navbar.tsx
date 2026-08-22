
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
  Sparkles,
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
import MobileNavDrawer from "./MobileNavDrawer";
import NavDropdown from "./NavDropdown";
import PopularSearchTags from "@/components/shared/PopularSearchTags";
import { useGetMenuItemsQuery } from "@/store/user/menu/menuApi";

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

  // Fetch dynamic menus from database
  const { data: menuData } = useGetMenuItemsQuery();
  const dbNavItems = menuData?.data?.filter((item: any) => item.type === 'navbar' && !item.parentId) || [];

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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-primary-600 text-white text-center py-1.5 md:py-1 px-4 text-xs md:text-sm font-medium tracking-wide">
        ২৫০০ টাকার উপরের অর্ডারে ফ্রি শিপিং! কোড ব্যবহার করুন TOYFUN24
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 md:gap-8">
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
                className="font-heading font-bold text-slate-800 dark:text-white tracking-tight flex -ml-1 md:text-3xl text-xl"
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
              className="font-heading font-bold text-slate-800 dark:text-white tracking-tight flex -ml-1 md:text-3xl text-xl"
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

          {/* Center Search (Hidden on Mobile) */}
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

          {/* Right Actions: AI Tools & Profile */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/ai-tools/gift-finder"
                className="btn-soft text-sm flex items-center space-x-1.5 border border-primary-500/20 bg-primary-50/50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 px-3 py-1.5 rounded-full"
              >
                <Sparkles className="h-4 w-4" />
                <span>এআই গিফট ফাইন্ডার</span>
              </Link>
              <ThemeSwitcher />
              <BgThemeSwitcher />
              <Link
                href="/wishlist"
                className="p-2 text-slate-600 hover:text-accent-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-0.5">
              <ThemeSwitcher />
              <BgThemeSwitcher />
              <Link
                href="/wishlist"
                className="flex items-center justify-center text-slate-600 hover:text-accent-500 dark:text-slate-300 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="flex items-center justify-center text-slate-600 hover:text-primary-600 dark:text-slate-300 relative transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop: User Auth Dropdown */}
            <div className="hidden md:flex items-center">
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 py-3 w-full justify-center border-t border-slate-100 dark:border-slate-800/50">
          {dbNavItems.length > 0 ? (
            dbNavItems.map((item: any) => {
              const children = menuData?.data?.filter((child: any) => child.parentId === item._id) || [];
              const isShop = item.url === '/shop' || item.titleEn?.toLowerCase() === 'shop';

              if (isShop) {
                return <ShopMegaMenu key={item._id} title={item.titleBn} childItems={children} />;
              }

              if (children.length > 0) {
                return (
                  <NavDropdown
                    key={item._id}
                    title={item.titleBn}
                    items={children.map((c: any) => ({ label: c.titleBn, href: c.url }))}
                  />
                );
              }

              return <NavLink key={item._id} href={item.url} text={item.titleBn} />;
            })
          ) : (
            <>
              <NavLink href="/" text="হোম" />
              <ShopMegaMenu title="শপ" childItems={[]} />
              <NavDropdown
                title="এআই টুলস"
                items={[
                  { label: "এআই গিফট ফাইন্ডার", href: "/ai-tools/gift-finder" },
                  { label: "প্যারেন্টিং অ্যাসিস্ট্যান্ট", href: "/ai-tools/parenting-assistant" },
                  { label: "খেলনা তুলনা", href: "/ai-tools/compare" },
                ]}
              />
              <NavLink href="/features" text="ফিচারসমূহ" />
              <NavLink href="/blog" text="ব্লগ" />
            </>
          )}
        </nav>
      </div>

      {/* Dynamic Interactive Mobile Drawer Navigation */}
      <MobileNavDrawer />
    </header>
  );
}