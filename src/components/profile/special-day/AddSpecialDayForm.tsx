"use client";

import { useState } from "react";
import { Plus, X, Calendar } from "lucide-react";

export default function AddSpecialDayForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD NEW DAY
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 w-full max-w-xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Add New Special Day</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <form className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                      <option>Select Category</option>
                      <option>Anniversary</option>
                      <option>Birthday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none">
                      <option>First select a category</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">Types will appear after selecting a category</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., John's Birthday"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none text-slate-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Add any additional notes or details"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none resize-none" 
                  ></textarea>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Enable notifications</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Notify me (days before)</span>
                    <select className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:border-primary-400 outline-none">
                      <option>7 days before</option>
                      <option>3 days before</option>
                      <option>1 day before</option>
                    </select>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-slate-500 hover:bg-slate-600 text-white transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2 rounded-lg text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white transition-colors uppercase tracking-wider"
              >
                Save Special Day
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
