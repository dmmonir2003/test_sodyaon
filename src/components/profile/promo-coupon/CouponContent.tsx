"use client";

import { Copy } from "lucide-react";

interface Coupon {
  name: string;
  validity: string;
  code: string;
}

interface CouponContentProps {
  coupons: Coupon[];
}

export default function CouponContent({ coupons }: CouponContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Available Coupons Column */}
      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
          Available coupon
        </div>
        
        <div className="space-y-4">
          {coupons.map((coupon, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center flex-shrink-0 font-bold text-xl border border-primary-100 dark:border-primary-800/50">
                %
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{coupon.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Validity:</span> {coupon.validity}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
                    Active
                  </span>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-3">
                    <span className="font-bold tracking-wider text-slate-700 dark:text-slate-300 text-sm">{coupon.code}</span>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applied Coupon Column */}
      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
          Applied coupon
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-700 text-center py-6 font-medium text-slate-500 dark:text-slate-400">
          No Coupons Applied
        </div>
      </div>
    </div>
  );
}
