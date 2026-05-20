"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function AddressForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsFormOpen(true)}
        className="flex items-center gap-2 text-sm font-bold bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD NEW ADDRESS
      </button>

      {isFormOpen && (
        <div className="col-span-1 lg:col-span-5 relative lg:absolute lg:right-0 lg:-top-16 lg:w-[420px] lg:z-20 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 p-6">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Add New Address</h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Address type</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                  <option>Select</option>
                  <option>Home</option>
                  <option>Office</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Address line</label>
                <input 
                  type="text" 
                  placeholder="Address"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Select District</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Select Thana/Upazila</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Postal code</label>
                <input 
                  type="text" 
                  placeholder="ex: 1000"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                />
              </div>

              <div className="pt-2">
                <button type="button" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm py-3 rounded-lg shadow-md transition-colors uppercase">
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
