"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, PackagePlus, Sparkles, ShoppingCart, ShoppingBag, Zap, Check, CheckCircle2, MessageSquare, Phone } from "lucide-react";

export default function CustomComboCreator() {
  const [selectedToys, setSelectedToys] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("সবগুলো");

  const categories = ["সবগুলো", "বিজ্ঞান ও প্রযুক্তি", "সৃজনশীল", "শিক্ষামূলক", "মজাদার খেলনা"];

  const toyOptions = [
    { id: 1, name: "ইন্টারঅ্যাক্টিভ স্মার্ট রোবট", price: 8999, img: "/images/combo/combo_slide_1.png", brand: "STEM Master", category: "বিজ্ঞান ও প্রযুক্তি" },
    { id: 2, name: "ডাইনোসর ফসিল ডিগ কিট", price: 2499, img: "/images/combo/combo_slide_4.png", brand: "Creative Kids", category: "শিক্ষামূলক" },
    { id: 3, name: "প্রোগ্রামেবল মিউজিক কীবোর্ড", price: 4999, img: "/images/combo/combo_slide_3.png", brand: "Music Joy", category: "সৃজনশীল" },
    { id: 4, name: "ম্যাগনা-টাইলস ১০০-পিস", price: 11999, img: "/images/combo/combo_card_bg_1.png", brand: "Tiny Steps", category: "সৃজনশীল" },
    { id: 5, name: "ম্যাজিক কালারিং বুক", price: 1500, img: "/images/combo/combo_card_bg_2.png", brand: "Color Magic", category: "সৃজনশীল" },
    { id: 6, name: "কিডস ডিজিটাল ক্যামেরা", price: 3500, img: "/images/combo/combo_slide_4.png", brand: "Nature Explorer", category: "মজাদার খেলনা" },
    { id: 7, name: "৩ডি উডেন পাজল", price: 2500, img: "/images/combo/combo_card_bg_1.png", brand: "Brainy Toys", category: "শিক্ষামূলক" },
    { id: 8, name: "বেবি সেন্সরি টয়", price: 1800, img: "/images/combo/combo_slide_2.png", brand: "Tiny Steps", category: "মজাদার খেলনা" },
  ];

  const filteredToys = activeCategory === "সবগুলো" 
    ? toyOptions 
    : toyOptions.filter(toy => toy.category === activeCategory);

  const toggleToy = (toy: any) => {
    setSelectedToys(prev => {
      const isAlreadySelected = prev.find(t => t.id === toy.id);
      if (isAlreadySelected) {
        return prev.filter(t => t.id !== toy.id);
      } else {
        return [...prev, toy];
      }
    });
  };

  const handleCustomComboReset = () => {
    setSelectedToys([]);
  };

  const customTotal = selectedToys.reduce((sum, toy) => sum + toy.price, 0);
  const hasDiscount = selectedToys.length >= 2;
  const discountedTotal = hasDiscount ? customTotal * 0.85 : customTotal;

  return (
    <div id="custom-combo-section" className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-4 md:p-12 shadow-2xl border-4 border-primary-500/10 dark:border-primary-500/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
      
      {/* MOBILE HEADER (Only visible on mobile) */}
      <div className="lg:hidden mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 shadow-sm">
               <Sparkles className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight">কাস্টম কম্বো</h2>
               <div className="flex items-center gap-1.5 mt-0.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider">স্পেশাল ১৫% ডিসকাউন্ট</p>
               </div>
             </div>
          </div>
          {selectedToys.length > 0 && (
             <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/30 animate-in fade-in zoom-in">
               {selectedToys.length} নির্বাচিত
             </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* DESKTOP LEFT SIDE: Preview & Summary (Hidden on Mobile) */}
        <div className="hidden lg:flex w-full lg:w-[40%] flex-col">
          <div className="mb-10 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4" /> এআই কম্বো বিল্ডার
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-slate-900 dark:text-white mb-4">কাস্টম কম্বো ক্রিয়েটর</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg">পছন্দের খেলনাগুলো নির্বাচন করে আপনার নিজস্ব কম্বো তৈরি করুন। ২ বা তার বেশি খেলনায় ১৫% ছাড়!</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 relative shadow-inner flex flex-col h-full min-h-[400px]">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 px-2">নির্বাচিত খেলনাসমূহ ({selectedToys.length})</h3>
            
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-8">
              {selectedToys.length > 0 ? (
                selectedToys.map((toy) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={`desktop-sel-${toy.id}`} 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary-100 dark:border-primary-900/30 shadow-md group"
                  >
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                      <img src={toy.img} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{toy.name}</h4>
                      <span className="text-xs text-primary-600 font-bold">৳{toy.price}</span>
                    </div>
                    <button onClick={() => toggleToy(toy)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all shrink-0">
                      <Plus className="w-5 h-5 rotate-45" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <PackagePlus className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-400 font-medium italic max-w-[200px]">ডান দিকের তালিকা থেকে খেলনা নির্বাচন করুন...</p>
                </div>
              )}
            </div>

            {/* Pricing Card (Desktop) */}
            <div className="mt-auto p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">মোটমূল্য</span>
                <span className="text-slate-400 line-through text-sm font-medium">৳{customTotal}</span>
              </div>
              
              <div className="mb-6">
                  <div className="text-4xl font-black text-slate-900 dark:text-white">৳{discountedTotal.toFixed(0)}</div>
                  {hasDiscount && (
                    <div className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> ১৫% ছাড় প্রয়োগ করা হয়েছে
                    </div>
                  )}
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    disabled={selectedToys.length === 0}
                    onClick={() => console.log("Added to cart", selectedToys)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 transition-all uppercase text-[11px] tracking-wide disabled:opacity-30 disabled:grayscale active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    কার্টে যোগ করুন
                  </button>
                  <button 
                    disabled={selectedToys.length === 0}
                    onClick={() => console.log("Direct Order", selectedToys)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-black hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all uppercase text-[11px] tracking-wide disabled:opacity-30 disabled:grayscale active:scale-95"
                  >
                    <Zap className="w-4 h-4" />
                    অর্ডার করুন
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button 
                    onClick={() => window.open(`https://wa.me/+8801700000000`, '_blank')}
                    className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-[11px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    হোয়াটসঅ্যাপ অর্ডার
                  </button>
                  <button 
                    onClick={() => window.open(`tel:+8801700000000`)}
                    className="flex items-center justify-center gap-2 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md transition-all text-[11px]"
                  >
                    <Phone className="w-4 h-4" />
                    কল করে অর্ডার
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONS LIST (List view on mobile, Grid on desktop) */}
        <div className="w-full lg:w-[60%]">
          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl p-4 md:p-8 h-full border border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="flex flex-col gap-6 mb-6 md:mb-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="w-1.5 h-6 md:w-2 md:h-8 bg-primary-500 rounded-full"></div>
                  খেলনা নির্বাচন করুন
                </h3>
                <div className="text-[10px] md:text-sm font-bold text-slate-400">{filteredToys.length} টি অপশন</div>
              </div>

              {/* Dynamic Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar scroll-smooth">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 ${activeCategory === cat ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-100 dark:hover:border-primary-900/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid for Desktop / List for Mobile */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 overflow-y-auto max-h-[600px] pr-1 md:pr-2 custom-scrollbar pb-24 lg:pb-10">
              {filteredToys.length > 0 ? (
                filteredToys.map((toy) => {
                  const isSelected = selectedToys.find(t => t.id === toy.id);
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={toy.id}
                      onClick={() => toggleToy(toy)}
                      className={`group relative cursor-pointer bg-white dark:bg-slate-800 rounded-2xl transition-all duration-300 transform active:scale-[0.98] lg:hover:-translate-y-1 ${isSelected ? 'ring-2 ring-primary-500 shadow-xl shadow-primary-500/10' : 'shadow-md border border-slate-100 dark:border-slate-700'}`}
                    >
                      <div className="flex lg:flex-col items-center p-3 gap-4 lg:gap-3">
                        <div className="relative w-20 h-20 lg:w-full lg:aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0">
                          <img src={toy.img} alt={toy.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center backdrop-blur-[1px]">
                              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-5 h-5" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-center lg:w-full">
                          <span className="hidden lg:block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{toy.brand}</span>
                          <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight mb-1 lg:mb-2 lg:min-h-[2.5rem]">{toy.name}</h4>
                          
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[13px] md:text-base font-black text-primary-600">৳{toy.price}</span>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
                              {isSelected ? <Plus className="w-5 h-5 rotate-45" /> : <Plus className="w-5 h-5" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PackagePlus className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium italic">এই ক্যাটাগরিতে কোনো খেলনা পাওয়া যায়নি...</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE PREMIUM FLOATING ACTION BAR */}
      {selectedToys.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-[100]"
        >
           <div className="bg-slate-900/90 dark:bg-primary-600/95 backdrop-blur-xl rounded-[2rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
              <div className="flex items-center justify-between gap-4 mb-3 px-3">
                 <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-white">৳{discountedTotal.toFixed(0)}</span>
                       {hasDiscount && (
                          <span className="text-[10px] text-white/50 line-through">৳{customTotal}</span>
                       )}
                    </div>
                    <div className="flex items-center gap-1">
                       <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                       <span className="text-[10px] font-bold text-white/90">
                         {selectedToys.length} নির্বাচিত
                       </span>
                    </div>
                 </div>
                 
                 {hasDiscount && (
                    <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-[9px] font-black border border-emerald-500/30">
                       ১৫% ছাড়
                    </div>
                 )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button 
                  onClick={() => console.log("Added to cart mobile", selectedToys)}
                  className="h-11 bg-accent-500 text-white rounded-xl font-black text-[10px] shadow-lg active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter"
                >
                  <ShoppingBag className="w-4 h-4" />
                  কার্টে যোগ
                </button>
                <button 
                  onClick={() => console.log("Direct Order mobile", selectedToys)}
                  className="h-11 bg-white text-slate-900 rounded-xl font-black text-[10px] shadow-lg active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter"
                >
                  <Zap className="w-4 h-4" />
                  অর্ডার করুন
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => window.open(`https://wa.me/+8801700000000`, '_blank')}
                  className="h-10 bg-emerald-600 text-white rounded-xl font-bold text-[10px] shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button 
                  onClick={() => window.open(`tel:+8801700000000`)}
                  className="h-10 bg-indigo-800 text-white rounded-xl font-bold text-[10px] shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </button>
              </div>
           </div>
        </motion.div>
      )}

    </div>
  );
}
