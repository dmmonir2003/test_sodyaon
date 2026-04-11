"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Plus, PackagePlus, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function BundlesPage() {
  const [step, setStep] = useState(1);
  const [baseToy, setBaseToy] = useState<any>(null);
  const [addonToy, setAddonToy] = useState<any>(null);

  const toyOptions = [
    { id: 1, name: "ইন্টারঅ্যাক্টিভ স্মার্ট রোবট", price: 8999, img: "bg-indigo-100" },
    { id: 2, name: "ডাইনোসর ফসিল ডিগ কিট", price: 2499, img: "bg-amber-100" },
    { id: 3, name: "প্রোগ্রামেবল মিউজিক কীবোর্ড", price: 4999, img: "bg-purple-100" },
    { id: 4, name: "ম্যাগনা-টাইলস ১০০-পিস", price: 11999, img: "bg-blue-100" },
  ];

  const handleCustomBundleReset = () => {
    setStep(1);
    setBaseToy(null);
    setAddonToy(null);
  };

  const customTotal = (baseToy?.price || 0) + (addonToy?.price || 0);
  const discountedTotal = customTotal * 0.85; // 15% discount for custom bundles

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/30 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md mb-8 shadow-2xl border border-white/20">
            <PackagePlus className="w-10 h-10 text-primary-300" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tight">
            বান্ডেল কিনুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">এবং সেভ করুন</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            আমাদের কিউরেট করা প্রিমিয়াম প্যাকেজগুলোর মধ্যে একটি বেছে নিন, অথবা একটি কাস্টম বান্ডেল তৈরি করে তাৎক্ষণিক ১৫% ছাড় পান!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] space-y-16 relative z-20">
        
        {/* NEW INTERACTIVE FEATURE: Build Your Own Bundle */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-indigo-500/10 dark:border-indigo-500/20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
           
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold text-sm mb-4">
               <Sparkles className="w-4 h-4" /> স্টেপ-বাই-স্টেপ বিল্ডার
             </div>
             <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">কাস্টম বান্ডেল ক্রিয়েটর</h2>
             <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">আপনার পছন্দের খেলনা দিয়ে নিখুঁত বান্ডেল তৈরি করে অটোমেটিক ১৫% ছাড় পান।</p>
           </div>

           {/* Builder Interface */}
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12 relative z-10">
             
             {/* Slot 1: Base Toy */}
             <div className="w-full md:w-64 text-center">
                <div className="mb-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm text-white shadow-md ${step === 1 ? 'bg-primary-500 animate-pulse' : (baseToy ? 'bg-slate-900 dark:bg-white dark:text-slate-900' : 'bg-slate-300 dark:bg-slate-600')}`}>১</span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-2">প্রথম খেলনা</h3>
                </div>

                {baseToy ? (
                   <div className="relative group cursor-pointer transform hover:scale-105 transition-all" onClick={() => {setBaseToy(null); setStep(1);}}>
                     <ProductCard name={baseToy.name} price={`৳${baseToy.price}`} img={baseToy.img} />
                     <div className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <span className="text-white font-bold bg-slate-800 border border-slate-600 px-4 py-2 rounded-full">পরিবর্তন করুন</span>
                     </div>
                   </div>
                ) : (
                   <button onClick={() => setStep(1)} className={`w-full aspect-[3/4] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center transition-all ${step === 1 ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'}`}>
                      <Plus className={`w-10 h-10 mb-2 ${step === 1 ? 'text-primary-500' : 'text-slate-400'}`} />
                      <span className={`font-bold ${step === 1 ? 'text-primary-600' : 'text-slate-500'}`}>খেলনা নির্বাচন করুন</span>
                   </button>
                )}
             </div>

             {/* Plus Separator */}
             <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center font-black flex-shrink-0 shadow-inner">
               <Plus className="w-8 h-8" />
             </div>

             {/* Slot 2: Add-on Toy */}
             <div className="w-full md:w-64 text-center">
                <div className="mb-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-md ${step === 2 ? 'bg-primary-500 animate-pulse text-white' : (addonToy ? 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500')}`}>২</span>
                  <h3 className={`font-bold mt-2 ${step >= 2 || addonToy ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>পরবর্তী খেলনা</h3>
                </div>

                {addonToy ? (
                   <div className="relative group cursor-pointer transform hover:scale-105 transition-all" onClick={() => {setAddonToy(null); setStep(2);}}>
                     <ProductCard name={addonToy.name} price={`৳${addonToy.price}`} img={addonToy.img} />
                     <div className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <span className="text-white font-bold bg-slate-800 border border-slate-600 px-4 py-2 rounded-full">পরিবর্তন করুন</span>
                     </div>
                   </div>
                ) : (
                   <button onClick={() => {if(baseToy) setStep(2)}} disabled={!baseToy} className={`w-full aspect-[3/4] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center transition-all ${step === 2 ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/10' : (!baseToy ? 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 cursor-pointer')}`}>
                      <Plus className={`w-10 h-10 mb-2 ${step === 2 ? 'text-primary-500' : 'text-slate-300 dark:text-slate-600'}`} />
                      <span className={`font-bold ${step === 2 ? 'text-primary-600' : 'text-slate-400 dark:text-slate-500'}`}>খেলনা অ্যাড করুন</span>
                   </button>
                )}
             </div>

           </div>

           {/* Active Selection Tray (Slides up depending on step) */}
           {step < 3 && (
             <div className="mt-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   <ArrowRight className="w-5 h-5 text-primary-500" />
                   {step === 1 ? 'আপনার প্রথম খেলনাটি বেছে নিন:' : 'আপনার পরবর্তী খেলনাটি বেছে নিন:'}
                 </h3>
                 <span className="text-sm font-medium text-slate-500">{toyOptions.length} টি অপশন এভেইলেবল</span>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {toyOptions.map(toy => {
                    const isSelected = (step===1 && baseToy?.id===toy.id) || (step===2 && addonToy?.id===toy.id);
                    return (
                      <div key={toy.id} 
                           onClick={() => {
                             if (step === 1) { setBaseToy(toy); setStep(2); }
                             else if (step === 2) { setAddonToy(toy); setStep(3); }
                           }} 
                           className={`cursor-pointer rounded-2xl transition-all transform hover:-translate-y-1 ${isSelected ? 'ring-4 ring-primary-500 shadow-xl' : 'hover:shadow-lg border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800'}`}>
                        <ProductCard name={toy.name} price={`৳${toy.price}`} img={toy.img} />
                      </div>
                    );
                  })}
               </div>
             </div>
           )}

           {/* Results Toolbar */}
           <div className={`transition-all duration-700 ${step === 3 ? 'max-h-[500px] opacity-100 mt-12' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
                 <div className="flex items-center gap-4 mb-4 md:mb-0">
                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                     <Check className="w-6 h-6 text-white" />
                   </div>
                   <div>
                     <h4 className="font-bold text-xl">কাস্টম বান্ডেল তৈরি হয়েছে!</h4>
                     <p className="text-emerald-100 text-sm">আপনি ১৫% ডিসকাউন্ট পেয়েছেন।</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-emerald-200 line-through text-sm">৳{customTotal.toFixed(0)}</span>
                      <div className="text-3xl font-black">৳{discountedTotal.toFixed(0)}</div>
                    </div>
                    <button className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-xl shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-2">
                       কার্টে যোগ করুন <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
              <button onClick={handleCustomBundleReset} className="w-full text-center mt-4 text-slate-500 text-sm font-bold hover:text-slate-800 dark:hover:text-white underline underline-offset-4">নতুন করে শুরু করুন</button>
           </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-8">
           <div className="h-px bg-slate-200 dark:bg-slate-700 w-1/4"></div>
           <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">অথবা আমাদের সাজানো বান্ডেল কিনুন</span>
           <div className="h-px bg-slate-200 dark:bg-slate-700 w-1/4"></div>
        </div>

        {/* Curated Bundles */}
        <BundleRow 
          title="আল্টিমেট স্টেম মাস্টার বিল্ডার সেট"
          desc="আপনার ছোট্ট ইঞ্জিনিয়ারের জন্য প্রয়োজনীয় সবকিছু। এটি ম্যাগনা-টাইলস এবং ডাইনোসর কিট এর চমৎকার একটি প্যাকেজ।"
          price="৳১১৫০০"
          value="৳১৫৪৯৮"
          items={[
            { name: "ম্যাগনা-টাইলস ১০০-পিস", img: "bg-indigo-100" },
            { name: "ডাইনোসর স্টেম কিট", img: "bg-emerald-100" }
          ]}
        />

        <BundleRow 
          title="সেন্সরি প্লে স্টার্টার প্যাক"
          desc="বাচ্চাদের জন্য পারফেক্ট। অ্যাক্টিভিটি কিউব ফাইন মোটর স্কিল উন্নত করে এবং মিউজিক্যাল পিয়ানো ম্যাট ফিজিক্যাল বিকাশকে উৎসাহিত করে।"
          price="৳৬৫০০"
          value="৳৮০০০"
          items={[
            { name: "উডেন অ্যাক্টিভিটি কিউব", img: "bg-amber-100" },
            { name: "মিউজিক্যাল ফ্লোর পিয়ানো", img: "bg-yellow-100" },
            { name: "সফট সেন্সরি ব্লকস", img: "bg-rose-100" }
          ]}
        />

        <BundleRow 
          title="লিটল এক্সপ্লোরার কিট"
          desc="বাচ্চাদের পৃথিবীকে জানার আগ্রহ বাড়ান। লার্নিং গ্লোব এর সাথে ক্যামেরা ও দূরবীন মিলিয়ে দারুণ একটি উপহার।"
          price="৳১২০০০"
          value="৳১৪৯৯৯"
          items={[
             { name: "লার্নিং গ্লোব", img: "bg-blue-100" },
             { name: "কিডস ডিজিটাল ক্যামেরা", img: "bg-cyan-100" },
             { name: "অ্যাডভেঞ্চার দূরবীন", img: "bg-emerald-100" },
             { name: "আউটডোর ওয়াকি-টকি", img: "bg-orange-100" }
          ]}
        />

      </div>
    </div>
  );
}

function BundleRow({ title, desc, price, value, items }: any) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 overflow-hidden">
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
             {items.map((item: any, idx: number) => (
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
