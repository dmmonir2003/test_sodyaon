"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutGrid, ShoppingCart, Heart, Ticket, MapPin, 
  CreditCard, Star, MessageCircle, Settings, Calendar, 
  Key, Trash2, LogOut, ArrowRight, Baby, UserCircle, X
} from "lucide-react";
import { logout } from "@/store/user/profile/profileSlice";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, data: user } = useAppSelector((state) => state.profile);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, router, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const navLinks = [
    { href: "/profile", label: "Dashboard", icon: <LayoutGrid className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/order-history", label: "My orders", icon: <ShoppingCart className="w-5 h-5 flex-shrink-0" /> },
    { href: "/wishlist", label: "Wishlist's", icon: <Heart className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/promo-coupon", label: "Promo/ Coupon", icon: <Ticket className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/address", label: "Address", icon: <MapPin className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/payments", label: "Payments", icon: <CreditCard className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/reviews", label: "Product reviews", icon: <Star className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/support-tickets", label: "Support tickets", icon: <MessageCircle className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/settings", label: "Manage profile", icon: <Settings className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/child-profile", label: "Child profiles", icon: <Baby className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/special-day", label: "Manage Special Day", icon: <Calendar className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/change-password", label: "Change Password", icon: <Key className="w-5 h-5 flex-shrink-0" /> },
    { href: "/profile/delete-account", label: "Delete My Account", icon: <Trash2 className="w-5 h-5 flex-shrink-0" /> },
  ];

  const SidebarContent = () => (
    <>
      {/* Profile Card Header (Theme Gradient) */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 shrink-0 relative">
        <h3 className="font-bold text-lg md:text-xl truncate pr-8" title={user?.name || "Customer"}>
          {user?.name || "Customer"}
        </h3>
        <p className="text-sm text-primary-100 mt-1 truncate" title={user?.phone || user?.email}>
          {user?.phone || user?.email}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col py-4 flex-1 overflow-y-auto profile-sidebar-nav">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-5 py-3.5 mx-2 my-1 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-800/50' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </div>
              {isActive && <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0 opacity-80" />}
            </Link>
          )
        })}
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-lg font-medium text-danger-600 bg-danger-50 dark:bg-danger-900/20 hover:bg-danger-100 dark:hover:bg-danger-900/40 transition-colors shadow-sm"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">লগ আউট</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900 pb-16 overflow-x-clip">
      
      {/* Mobile Sticky Profile Button */}
      <div className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-primary-600 text-white p-3 rounded-l-xl shadow-[-4px_0_20px_rgba(0,0,0,0.15)] flex items-center justify-center border border-r-0 border-primary-500 hover:bg-primary-700 transition-colors relative"
          aria-label="Open Profile Menu"
        >
          <div className="absolute inset-0 bg-white/10 rounded-l-xl opacity-0 hover:opacity-100 transition-opacity"></div>
          <UserCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Right Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[100] w-[280px] bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col h-[100dvh] pb-[env(safe-area-inset-bottom)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </div>

      {/* Top Banner similar to the image, utilizing central design system colors */}
      <div className="absolute top-0 left-0 w-full h-56 md:h-72 bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500 dark:from-primary-700 dark:via-primary-800 dark:to-secondary-800 z-0"></div>

      {/* Main Container - Pushed up to overlap the banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block w-72 flex-shrink-0 self-start sticky top-24">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
              <SidebarContent />
              <style jsx global>{`
                @media (min-width: 1024px) {
                  .profile-sidebar-nav {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  }
                  .profile-sidebar-nav::-webkit-scrollbar {
                    display: none;
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 z-10 pt-4 lg:pt-0">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
