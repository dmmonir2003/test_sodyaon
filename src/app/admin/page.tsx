"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { DollarSign, ShoppingBag, Users, Activity, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100">Welcome back, {user.name}</h1>
          <p className="text-slate-400 mt-1">Here's your secure platform overview based on your privileges.</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Role</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/20 text-primary-400 border border-primary-500/30 rounded-lg mt-1 font-bold">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
            {user.role}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Universal Modular KPI Cards */}
        {user.permissions.canViewFinances && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+14.5%</span>
            </div>
            <div className="text-3xl font-black font-heading text-white">৳৩,৪৫,০০০</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Total Revenue (30 Days)</div>
          </div>
        )}

        {(user.permissions.canManageOrders || user.role === 'INVESTOR') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-md">Last 24h</span>
            </div>
            <div className="text-3xl font-black font-heading text-white">২৪৮</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Pending Orders</div>
          </div>
        )}

        {(user.permissions.canManageMarketing || user.role === 'INVESTOR' || user.role === 'SUPER_ADMIN') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+2%</span>
            </div>
            <div className="text-3xl font-black font-heading text-white">১২,৪০৫</div>
            <div className="text-sm font-medium text-slate-400 mt-1">Active Customers</div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-md">Live</span>
          </div>
          <div className="text-3xl font-black font-heading text-white">১০০%</div>
          <div className="text-sm font-medium text-slate-400 mt-1">System Operation Health</div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center py-20">
         <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
           <ShieldAlert className="h-8 w-8 text-primary-500" />
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Secure Module Architecture</h2>
         <p className="text-slate-400 max-w-lg">
           Your dashboard dynamically re-wires its configuration based on your session privileges. Use the left-hand sidebar to navigate through your authorized application modules.
         </p>
      </div>

    </div>
  );
}
