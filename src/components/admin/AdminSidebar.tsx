"use client";

import { useAuth } from "@/components/admin/AuthContext";
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
} from "lucide-react";

function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      show: true,
    },
    {
      href: "/admin/finances",
      label: "Finances",
      icon: <LineChart className="h-5 w-5" />,
      show: user.permissions.canViewFinances,
    },
    {
      href: "/admin/marketing",
      label: "Digital Marketing",
      icon: <Megaphone className="h-5 w-5" />,
      show: user.permissions.canManageMarketing,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <Package className="h-5 w-5" />,
      show: user.permissions.canManageOrders,
    },
    {
      href: "/admin/content",
      label: "Content Update",
      icon: <Edit3 className="h-5 w-5" />,
      show: user.permissions.canManageContent,
    },
    {
      href: "/admin/team",
      label: "Team Management",
      icon: <Users className="h-5 w-5" />,
      show: user.permissions.canManageTeam,
    },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hide-scrollbar overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black font-heading shadow-md">
            P
          </div>
          <span className="text-xl font-bold font-heading text-white tracking-tight">
            Sodayon <span className="text-primary-500">Admin</span>
          </span>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">
          Modules
        </div>
        <nav className="space-y-1">
          {links
            .filter((l) => l.show)
            .map((link) => {
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
              );
            })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => {
            logout();
            window.location.href = "/admin";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out Account
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
