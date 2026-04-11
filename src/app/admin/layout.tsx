"use client";

import { AuthProvider, useAuth } from "@/components/admin/AuthContext";
import RoleSimulator from "@/components/admin/RoleSimulator";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  Megaphone, 
  Package, 
  Edit3, 
  Users,
  LogOut,
  ShieldAlert
} from "lucide-react";
import React from "react";

function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, show: true },
    { 
      href: "/admin/finances", 
      label: "Finances", 
      icon: <LineChart className="h-5 w-5" />, 
      show: user.permissions.canViewFinances 
    },
    { 
      href: "/admin/marketing", 
      label: "Digital Marketing", 
      icon: <Megaphone className="h-5 w-5" />, 
      show: user.permissions.canManageMarketing 
    },
    { 
      href: "/admin/orders", 
      label: "Orders", 
      icon: <Package className="h-5 w-5" />, 
      show: user.permissions.canManageOrders 
    },
    { 
      href: "/admin/content", 
      label: "Content Update", 
      icon: <Edit3 className="h-5 w-5" />, 
      show: user.permissions.canManageContent 
    },
    { 
      href: "/admin/team", 
      label: "Team Management", 
      icon: <Users className="h-5 w-5" />, 
      show: user.permissions.canManageTeam 
    },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hide-scrollbar overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black font-heading shadow-md">
            P
          </div>
          <span className="text-xl font-bold font-heading text-white tracking-tight">PlayTime <span className="text-primary-500">Admin</span></span>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">
          Modules
        </div>
        <nav className="space-y-1">
          {links.filter(l => l.show).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary-600/10 text-primary-400 font-bold border border-primary-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
         <button onClick={() => { logout(); window.location.href="/admin"; }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Log Out Account
         </button>
      </div>
    </div>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useAuth();
  
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-400">
        <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold animate-pulse">Authenticating Secure Token...</p>
      </div>
    );
  }

  // Intercept unauthenticated users
  if (!user) {
    return <AdminLoginForm />;
  }

  // Base layout wrapper. The individual pages will enforce strict module blocking.
  // We do NOT block root layoute here because we want the sidebar to always show,
  // and the children component will render the "Access Denied" if unauthorised.
  return (
    <div className="h-screen w-full flex bg-slate-950 font-sans text-slate-200 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>
      <RoleSimulator />
    </div>
  );
}

// Global layout provider
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This completely overrides the main app's Navbar and Footer by not rendering them.
  // Layout.tsx in subdirectories in App Router nest inside the root layout.
  // The root layout has a <Navbar> and <Footer> directly inside the <body>. 
  // Wait, if root layout.tsx renders <Navbar>, the admin pages will STILL have the customer Navbar!
  
  return (
    <AuthProvider>
      {/* We use position absolute to cover exactly the screen, effectively hiding the parent Layout's visual clutter like Navbars and Footers since we are in a sub-layout. 
          Usually we use Route Groups (app/(store)/... and app/(admin)/...) but to avoid massive refactoring of the user's project, we layer the Admin Dashboard absolute on top of everything! */}
      <div className="fixed inset-0 z-[100] bg-slate-950">
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </div>
    </AuthProvider>
  );
}
