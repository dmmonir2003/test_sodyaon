"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { User, Activity, Clock, Settings, LogOut } from "lucide-react";
import { logout } from "@/store/user/profile/profileSlice";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, data: user } = useAppSelector((state) => state.profile);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login"); // Optional: could also be homepage
  };

  const navLinks = [
    { href: "/profile", label: "ড্যাশবোর্ড", icon: <User className="w-5 h-5" /> },
    { href: "/profile/child-profile", label: "চাইল্ড প্রোফাইল", icon: <Activity className="w-5 h-5" /> },
    { href: "/profile/order-history", label: "অর্ডার হিস্ট্রি", icon: <Clock className="w-5 h-5" /> },
    { href: "/profile/settings", label: "একাউন্ট সেটিংস", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sticky top-24">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{user?.name}</h3>
                <p className="text-sm border text-slate-500 dark:text-slate-400 mt-1 inline-block px-2 rounded-md bg-slate-50 dark:bg-slate-700/50 truncate max-w-[150px]">{user?.phone || user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )
              })}
              
              <div className="my-4 border-t border-slate-100 dark:border-slate-700"></div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-danger-600 dark:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-all text-left"
              >
                <LogOut className="w-5 h-5" />
                লগ আউট
              </button>
            </nav>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

      </div>
    </div>
  );
}
