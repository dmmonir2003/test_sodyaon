"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, BrainCircuit, ScanFace, Gift, ArrowLeftRight, Baby } from 'lucide-react';

const AI_TOOLS = [
  {
    id: 1,
    title1: "এআই দ্বারা",
    title2: "উপহার খুঁজুন",
    subtitle: "যেকোনো বয়সের বাচ্চার জন্য নিখুঁত উপহার খুঁজে বের করুন আমাদের এআই-এর সাথে।",
    linkText: "গিফট ফাইন্ডার",
    href: "/ai-tools/gift-finder",
    icon: <Gift className="w-8 h-8 text-rose-500" />,
    mobileIcon: <Gift className="w-5 h-5 text-rose-500" />
  },
  {
    id: 2,
    title1: "এআই প্রডাক্ট",
    title2: "তুলনামূলক বিশ্লেষণ",
    subtitle: "একাধিক খেলনা বা পণ্যের মধ্যে তুলনা করে সেরাটি বেছে নিন।",
    linkText: "প্রডাক্ট কম্পেয়ার",
    href: "/ai-tools/compare",
    icon: <ArrowLeftRight className="w-8 h-8 text-sky-500" />,
    mobileIcon: <ArrowLeftRight className="w-5 h-5 text-sky-500" />
  },
  {
    id: 3,
    title1: "স্মার্ট এআই",
    title2: "প্যারেন্টিং অ্যাসিস্ট্যান্ট",
    subtitle: "সন্তান লালন-পালনের যেকোনো প্রশ্নের উত্তর জানুন আমাদের এআই চ্যাটবট থেকে।",
    linkText: "অ্যাসিস্ট্যান্ট",
    href: "/ai-tools/parenting-assistant",
    icon: <Baby className="w-8 h-8 text-amber-500" />,
    mobileIcon: <Baby className="w-5 h-5 text-amber-500" />
  }
];

const MOCK_BANNERS = [
  {
    id: 1,
    type: 'promo',
    badge: "৳৬,০০০",
    badgeLabel: "ছাড়!",
    subtitle: "ঈদের কেনাকাটায় দারুণ সারপ্রাইজ",
    buttonText: "অফার দেখুন",
    link: "/shop",
    bgGradient: "from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20",
    blobColor: "bg-orange-200 dark:bg-orange-800/50",
    promoImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    type: 'image',
    link: "/shop/new-arrivals",
    // Example placeholder image. In production, this will be the URL uploaded by the Admin.
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 3,
    type: 'promo',
    badge: "ফ্রি",
    badgeLabel: "ডেলিভারি!",
    subtitle: "২০০০ টাকার বেশি অর্ডারে সারা দেশে ফ্রি ডেলিভারি",
    buttonText: "এখনই কিনুন",
    link: "/shop",
    bgGradient: "from-emerald-50 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/20",
    blobColor: "bg-emerald-200 dark:bg-emerald-800/50",
    promoImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
  }
];

export default function HomeHeroBanner() {
  const isAuthenticated = useAppSelector((state) => state.profile.isAuthenticated);
  
  const [currentTool, setCurrentTool] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll logic for the authenticated AI Tools Carousel
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % AI_TOOLS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Auto-scroll logic for Main Hero Slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MOCK_BANNERS.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const slideNext = () => setCurrentSlide((prev) => (prev + 1) % MOCK_BANNERS.length);
  const slidePrev = () => setCurrentSlide((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length);

  return (
    <section className="bg-white dark:bg-slate-950 pb-6 md:py-8 lg:py-10 border-b border-slate-100 dark:border-slate-800">
      {/* Added px-4 for mobile spacing, md:px-4 ... for desktop */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* ======================================================== */}
          {/* LEFT AREA: Dynamic Image Slider (Fed by backend API)       */}
          {/* Mobile Aspect Ratio: 359/201 | Desktop Ratio: ~983/393   */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-2xl aspect-[359/201] lg:aspect-[983/393] shadow-sm group mt-2 md:mt-0">
            
            {/* Smooth Sliding Track */}
            <div 
              className="flex  w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Sliding Contents */}
              {MOCK_BANNERS.map((banner, index) => (
                <div 
                  key={banner.id}
                  className="min-w-full relative flex flex-col justify-center overflow-hidden "
                >
                  {banner.type === 'image' ? (
                     <Link href={banner.link} className="block w-full h-full relative group ">
                        {banner.imageUrl && (
                          <Image 
                            src={banner.imageUrl} 
                            alt="" 
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        )}
                        {/* Subte overlay on hover to indicate clickability */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10"></div>
                     </Link>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${banner.bgGradient} flex flex-col justify-center p-6 sm:p-10 lg:p-14`}>
                      <div className="max-w-xs sm:max-w-sm lg:max-w-md relative z-20">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 dark:text-white leading-tight mb-2 lg:mb-4">
                            {banner.badge} <span className="text-xl sm:text-2xl lg:text-3xl text-primary-600 block sm:inline">{banner.badgeLabel}</span>
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                            {banner.subtitle}
                        </p>
                        <Link href={banner.link} className="inline-block bg-primary-600 text-white font-bold px-6 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base hover:bg-primary-700 transition shadow-lg">
                            {banner.buttonText}
                        </Link>
                      </div>

                      {/* Absolute right side PROMO IMAGE & Graphic Simulation */}
                      <div className="absolute right-0 bottom-0 w-2/3 sm:w-1/2 h-full flex justify-end items-end p-2 sm:p-6 lg:p-10 pointer-events-none z-10">
                          {banner.promoImage && (
                            <div className="relative w-full h-full">
                              <Image 
                                src={banner.promoImage} 
                                alt="Promo product" 
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-contain object-right-bottom opacity-90 drop-shadow-xl z-20 mix-blend-multiply dark:mix-blend-normal"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                          )}
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full blur-3xl -z-10 opacity-70 ${banner.blobColor}`}></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <button 
                onClick={slidePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/50 hover:bg-white text-slate-800 rounded shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-30"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
                onClick={slideNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/50 hover:bg-white text-slate-800 rounded shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-30"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                {MOCK_BANNERS.map((_, i) => (
                   <span 
                     key={i}
                     onClick={() => setCurrentSlide(i)}
                     className={`block rounded-full cursor-pointer transition-all ${
                       i === currentSlide 
                         ? "w-4 h-2.5 bg-primary-600 shadow-sm" 
                         : "w-2 h-2 bg-white/80 hover:bg-white"
                     }`}
                   />
                ))}
            </div>
          </div>


          {/* ======================================================== */}
          {/* RIGHT AREA: Static Desktop AI Banner / LoggedIn Carousel */}
          {/* ======================================================== */}
          <div className="hidden lg:flex flex-col relative w-full h-full bg-gradient-to-br from-indigo-50 to-primary-50 dark:from-indigo-900/20 dark:to-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30 overflow-hidden shadow-sm lg:aspect-[481/394]">
            
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/50 dark:bg-primary-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-200/50 dark:bg-indigo-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

            {/* Content Body */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 h-full">
              {!isAuthenticated ? (
                <>
                  {/* UNAUTHENTICATED STATE: Prompt to login */}
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-b-4 border-primary-500 mb-6 flex items-center justify-center animate-bounce-slow">
                     <BrainCircuit className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  
                  <h3 className="text-2xl font-black font-heading text-slate-800 dark:text-white mb-2 leading-tight">
                    স্মার্ট শপিং <br/>
                    <span className="text-primary-600">এআই অ্যাসিস্ট্যান্ট</span>
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-8 px-4">
                    লগইন করুন এবং আপনার সন্তানের বয়স ও পছন্দ অনুযায়ী সুপার ফার্স্ট প্রোডাক্ট সাজেশান পান!
                  </p>
                  
                  <Link
                    href="/auth/login"
                    className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary-500/30 w-full max-w-[240px]"
                  >
                    <ScanFace className="w-5 h-5 group-hover:text-primary-300 transition-colors" />
                    লগইন করুন
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                  </Link>
                </>
              ) : (
                <div key={currentTool} className="flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
                  {/* AUTHENTICATED STATE: Render AI Tools Carousel */}
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-b-4 border-primary-500 mb-6 flex items-center justify-center animate-bounce-short">
                     {AI_TOOLS[currentTool].icon}
                  </div>
                  
                  <h3 className="text-2xl font-black font-heading text-slate-800 dark:text-white mb-2 leading-tight">
                    {AI_TOOLS[currentTool].title1} <br/>
                    <span className="text-primary-600">{AI_TOOLS[currentTool].title2}</span>
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-8 px-4 min-h-[40px]">
                    {AI_TOOLS[currentTool].subtitle}
                  </p>
                  
                  <Link
                    href={AI_TOOLS[currentTool].href}
                    className="group relative inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary-500/30 w-full max-w-[240px]"
                  >
                    {AI_TOOLS[currentTool].linkText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                  </Link>
                </div>
              )}

              {/* Slider Dots (Only show if authenticated) */}
              {isAuthenticated && (
                <div className="absolute bottom-6 flex gap-1.5 z-20">
                  {AI_TOOLS.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentTool(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentTool ? 'bg-primary-600 w-4' : 'bg-slate-300 dark:bg-slate-700'}`} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* ======================================================== */}
        {/* MOBILE ONLY: Artificial Intelligence Intro Action Bar    */}
        {/* ======================================================== */}
        <div className="block lg:hidden mt-4 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-primary-100 dark:border-slate-700 shadow-sm">
           {/* Decor */}
           <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary-100 dark:from-primary-900/30 to-transparent"></div>
           
           <div className="flex items-center justify-between p-3.5 relative z-10 w-full">
              {!isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center shrink-0">
                        <BrainCircuit className="w-5 h-5 text-primary-600" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1 shadow-sm">স্মার্ট এআই অ্যাসিস্ট্যান্ট</span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none">লগইন করে স্মার্ট সাজেশান পান</span>
                     </div>
                  </div>
                  
                  <Link 
                    href="/auth/login"
                    className="shrink-0 bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-primary-700 transition"
                  >
                    লগইন
                  </Link>
                </>
              ) : (
                <div key={currentTool} className="flex items-center justify-between w-full animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center shrink-0">
                        {AI_TOOLS[currentTool].mobileIcon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1 shadow-sm">
                          {AI_TOOLS[currentTool].title2}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                          {AI_TOOLS[currentTool].linkText}
                        </span>
                     </div>
                  </div>
                  
                  <Link 
                    href={AI_TOOLS[currentTool].href}
                    className="shrink-0 bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-primary-700 transition flex items-center gap-1"
                  >
                    শুরু করুন
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
           </div>
        </div>

      </div>
    </section>
  );
}
