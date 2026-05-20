"use client";

import { CreditCard, Wallet, Plus, Smartphone, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: number;
  type: string;
  provider: string;
  details: string;
  icon: React.ReactNode;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
}

export default function PaymentMethods({ methods }: PaymentMethodsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Spent Widget */}
      <div className="col-span-1 md:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-slate-700 p-6 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet className="w-24 h-24 text-primary-500" />
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1 z-10">Total Spent</p>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white z-10">৳ 12,450</h2>
        <div className="mt-4 z-10">
          <span className="text-xs font-semibold px-2 py-1 bg-success-50 dark:bg-success-900/20 text-success-600 dark:text-success-400 rounded-md">
            +14% this month
          </span>
        </div>
      </div>

      {/* Saved Methods */}
      <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-bold text-slate-900 dark:text-white">Saved Payment Methods</h2>
          <button className="flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> ADD NEW
          </button>
        </div>

        <div className="space-y-4">
          {methods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/50 flex flex-shrink-0 items-center justify-center text-slate-600 dark:text-slate-400">
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{method.provider}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{method.details}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-500 transition-colors" title="Remove method">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
