"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { ShieldAlert, Edit3, Image as ImageIcon, LayoutTemplate, PlusCircle, Search } from "lucide-react";

export default function ContentPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  if (!user.permissions.canManageContent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Content Module Secured</h1>
        <p className="text-slate-400 max-w-md">
          Editing inventory and website design modules requires the <span className="text-primary-400 font-bold">CONTENT_MANAGER</span> role. You are currently logged in as <span className="font-bold">{user.role}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Edit3 className="h-8 w-8 text-amber-400" />
            Content & Product CMS
          </h1>
          <p className="text-slate-400 mt-1">Manage website banners, active modules, and product catalogue.</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dynamic Website Assets */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
             <LayoutTemplate className="text-slate-400 h-5 w-5" />
             <h2 className="text-lg font-bold text-white">Dynamic Sections</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">
                     <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Main Hero Slider (Homepage)</div>
                    <div className="text-xs text-slate-500 tracking-wide mt-0.5">3 Active Slides • Last updated 2 days ago</div>
                  </div>
               </div>
               <button className="text-sm font-bold text-primary-400 px-3 py-1.5 bg-primary-500/10 rounded-lg">Edit</button>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">
                     <LayoutTemplate className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Flash Deals Banner</div>
                    <div className="text-xs text-amber-500 tracking-wide mt-0.5 font-bold">Currently Scheduled: Eid Campaign</div>
                  </div>
               </div>
               <button className="text-sm font-bold text-primary-400 px-3 py-1.5 bg-primary-500/10 rounded-lg">Edit</button>
            </div>
          </div>
        </div>

        {/* Product Inventory Quick Edit */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
             <Search className="text-slate-400 h-5 w-5" />
             <h2 className="text-lg font-bold text-white">Quick Inventory Scanner</h2>
          </div>
          
          <div className="relative mb-6">
            <input type="text" placeholder="Search by SKU # or Product Name... (Press Enter)" className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors text-white" />
            <Search className="absolute right-3 top-3.5 h-4 w-4 text-slate-500" />
          </div>

          <div className="flex-1 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
             Search a product to begin live editing.
          </div>
        </div>

      </div>
    </div>
  );
}
