"use client";

import { Sparkles, PackagePlus, ArrowRight, ShieldCheck, Plus } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

interface ComboItem {
  name: string;
  img: string;
}

interface ComboRowProps {
  title: string;
  desc: string;
  price: string;
  value: string;
  items: ComboItem[];
}

export default function ComboRow({ title, desc, price, value, items }: ComboRowProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 overflow-hidden mb-16 last:mb-0">
      {/* Fancy Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 dark:bg-primary-900/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row gap-10 items-center">
        
        {/* Left Side: Info & Products */}
        <div className="flex-1 w-full text-center xl:text-left">
          <div className="inline-flex items-center justify-center xl:justify-start gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-sm mb-6 border border-primary-100 dark:border-primary-800/50">
            <Sparkles className="w-4 h-4" /> মাল্টি-আইটেম কম্বো প্যাকেজ
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4 leading-tight">{title}</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto xl:mx-0 leading-relaxed">{desc}</p>
          
          {/* Dynamic Products Math Display */}
          <div className="flex flex-wrap justify-center xl:justify-start items-center gap-4">
             {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-40 sm:w-48 transition-transform group-hover:-translate-y-1" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <ProductCard name={item.name} price="ফুল সাইজ" img={item.img} />
                  </div>
                  
                  {idx < items.length - 1 && (
                     <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-inner text-slate-400 border border-slate-100 dark:border-slate-700 shrink-0">
                       <Plus className="w-5 h-5" />
                     </div>
                  )}
                </div>
             ))}
          </div>
        </div>

        {/* Right Side: CTA Box */}
        <div className="w-full xl:w-[400px] flex-shrink-0">
           <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 xl:p-10 text-white shadow-2xl relative overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
             
             <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
               <PackagePlus className="w-64 h-64 transform translate-x-1/4 -translate-y-1/4" />
             </div>
             
             <div className="relative z-10">
               <span className="text-slate-400 font-bold uppercase tracking-widest text-xs block mb-2">আসল দাম: <span className="text-slate-500 line-through">{value}</span></span>
               <div className="flex flex-wrap items-baseline gap-3 mb-8">
                 <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{price}</span>
                 <span className="bg-emerald-500/20 text-emerald-400 font-bold text-sm px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-sm">দারুণ সাশ্রয়</span>
               </div>
               
               <button className="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] transition-all text-lg flex justify-center items-center gap-2 group/btn">
                 {items.length} টি আইটেম কার্টে যোগ করুন <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
               </button>
               
               <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium bg-slate-800/50 rounded-lg py-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> ৩০ দিনের মধ্যে ফ্রি রিটার্ন
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
