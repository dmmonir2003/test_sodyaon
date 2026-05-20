"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { ShieldAlert, TrendingUp, TrendingDown, DollarSign, Calculator } from "lucide-react";
import { useState } from "react";

export default function FinancesPage() {
  const { user } = useAuth();
  
  const [revenue] = useState(345000); // ৳3,45,000
  const [costs, setCosts] = useState({
    marketing: 45000,
    operational: 80000,
    inventory: 120000
  });

  if (!user) return null;

  if (!user.permissions.canViewFinances) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Access Denied</h1>
        <p className="text-slate-400 max-w-md">
          Your current role (<span className="text-primary-400 font-bold">{user.role}</span>) lacks the security clearance to access financial records. Please contact the Super Admin for authorization.
        </p>
      </div>
    );
  }

  const totalCosts = costs.marketing + costs.operational + costs.inventory;
  const netProfit = revenue - totalCosts;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-emerald-400" />
            Financial Matrix
          </h1>
          <p className="text-slate-400 mt-1">Real-time profit tracking and cost logging.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Financial Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Gross Revenue</div>
              <div className="text-4xl font-black font-heading text-white">৳{revenue.toLocaleString('en-IN')}</div>
              <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[100%] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Net Profit Calculation</div>
              <div className={`text-4xl font-black font-heading flex items-center gap-2 ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                ৳{netProfit.toLocaleString('en-IN')}
                {netProfit >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              </div>
              <div className="mt-4 flex gap-1">
                <div className="h-2 bg-emerald-500 rounded-l-full" style={{ width: `${(netProfit/revenue)*100}%` }}></div>
                <div className="h-2 bg-red-500 rounded-r-full flex-grow"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-64 flex items-center justify-center">
            <p className="text-slate-500 font-bold">[ Advanced Charts Mockup ]</p>
          </div>
        </div>

        {/* Costing Management Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary-400" />
            Costing Ledger
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Digital Marketing / Ad Spend</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">৳</span>
                <input 
                  type="number" 
                  value={costs.marketing} 
                  disabled={!user.permissions.canEditFinances}
                  onChange={(e) => setCosts({...costs, marketing: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-950 border border-slate-800 pl-8 pr-4 py-3 rounded-xl text-white font-bold disabled:opacity-50 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Operational Costs</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">৳</span>
                <input 
                  type="number" 
                  value={costs.operational} 
                  disabled={!user.permissions.canEditFinances}
                  onChange={(e) => setCosts({...costs, operational: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-950 border border-slate-800 pl-8 pr-4 py-3 rounded-xl text-white font-bold disabled:opacity-50 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Product Inventory Costs</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">৳</span>
                <input 
                  type="number" 
                  value={costs.inventory} 
                  disabled={!user.permissions.canEditFinances}
                  onChange={(e) => setCosts({...costs, inventory: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-950 border border-slate-800 pl-8 pr-4 py-3 rounded-xl text-white font-bold disabled:opacity-50 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800">
               <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                 <span>Total Expenses</span>
                 <span className="text-red-400 text-lg">৳{totalCosts.toLocaleString('en-IN')}</span>
               </div>
            </div>

            {!user.permissions.canEditFinances && (
               <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-400 text-center">
                 Investor Mode: Read-Only Privilege
               </div>
            )}
            
            {user.permissions.canEditFinances && (
              <button className="w-full mt-4 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary-500/20">
                Update Ledger Record
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
