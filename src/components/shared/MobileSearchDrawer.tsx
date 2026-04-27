"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleMobileSearch } from "@/store/ui/uiSlice";
import PopularSearchTags from "./PopularSearchTags";

export default function MobileSearchDrawer() {
  const dispatch = useAppDispatch();
  const { isMobileSearchOpen } = useAppSelector((state) => state.ui);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSearchOpen]);



  const closeDrawer = () => dispatch(toggleMobileSearch());

  return (
    <div 
      className={`fixed inset-0 z-[200] flex justify-end md:hidden transition-all duration-300 ${
        isMobileSearchOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Drawer Container */}
      <div 
        className={`relative w-full h-[100dvh] bg-white dark:bg-slate-900 flex flex-col transform transition-transform duration-300 ease-out ${
          isMobileSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Header containing Input & Back button */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
           <button 
             onClick={closeDrawer}
             className="text-slate-600 dark:text-slate-300 p-1 -ml-1 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>

           <div className="flex-1 relative flex items-center">
             <input 
               ref={inputRef}
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search by keywords..."
               className="w-full h-11 pl-4 pr-10 border-2 border-primary-500 rounded-full text-slate-800 dark:text-white bg-white dark:bg-slate-900 outline-none text-sm placeholder:text-slate-400 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.1)] transition-all"
               autoComplete="off"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {searchQuery ? (
                  <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600 p-1">
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="w-5 h-5 text-primary-500" />
                )}
             </div>
           </div>
        </div>

        {/* Filters (Radios as per screenshot) */}
        <div className="flex items-center justify-center gap-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 cursor-pointer group">
             <div className="relative flex items-center justify-center">
               <input type="radio" name="searchFilterMobile" value="all" checked={filterType === "all"} onChange={() => setFilterType("all")} className="peer sr-only" />
               <div className="w-4 h-4 border border-slate-400 rounded-full peer-checked:border-primary-500 transition-colors"></div>
               <div className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
             </div>
             <span className={`${filterType === "all" ? "text-primary-600 font-medium" : "group-hover:text-primary-600"} transition-colors`}>All</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 cursor-pointer group">
             <div className="relative flex items-center justify-center">
               <input type="radio" name="searchFilterMobile" value="Toys" checked={filterType === "Toys"} onChange={() => setFilterType("Toys")} className="peer sr-only" />
               <div className="w-4 h-4 border border-slate-400 rounded-full peer-checked:border-primary-500 transition-colors"></div>
               <div className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
             </div>
             <span className={`${filterType === "Toys" ? "text-primary-600 font-medium" : "group-hover:text-primary-600"} transition-colors`}>Toys</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 cursor-pointer group">
             <div className="relative flex items-center justify-center">
               <input type="radio" name="searchFilterMobile" value="superstore" checked={filterType === "superstore"} onChange={() => setFilterType("superstore")} className="peer sr-only" />
               <div className="w-4 h-4 border border-slate-400 rounded-full peer-checked:border-primary-500 transition-colors"></div>
               <div className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
             </div>
             <span className={`${filterType === "superstore" ? "text-primary-600 font-medium" : "group-hover:text-primary-600"} transition-colors`}>Superstore</span>
          </label>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-slate-900">
           {!searchQuery && (
              <PopularSearchTags onTagClick={closeDrawer} />
           )}

           {/* Add actual search results logic here depending on query length */}
           {searchQuery && (
             <div className="py-4 text-center text-slate-500">
               <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
               <p>Searching for &quot;<span className="font-semibold text-slate-700 dark:text-slate-200">{searchQuery}</span>&quot;...</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
