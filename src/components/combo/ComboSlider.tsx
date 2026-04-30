"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Wand2, UserCheck, LogIn, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

const slides = [
  {
    id: 1,
    image: "/images/combo/combo_slide_1.png",
    title: "প্রিমিয়াম খেলনা কম্বো",
    subtitle: "আপনার সন্তানের জন্য সেরা উপহার সেট",
  },
  {
    id: 2,
    image: "/images/combo/combo_slide_2.png",
    title: "বেবি কেয়ার কম্বো",
    subtitle: "নিরাপদ এবং আরামদায়ক যত্নে সেরা সংগ্রহ",
  },
  {
    id: 3,
    image: "/images/combo/combo_slide_3.png",
    title: "স্টেম লার্নিং কিট",
    subtitle: "ভবিষ্যতের বিজ্ঞানীদের জন্য পারফেক্ট কম্বো",
  },
  {
    id: 4,
    image: "/images/combo/combo_slide_4.png",
    title: "অ্যাডভেঞ্চার কম্বো",
    subtitle: "বাইরের জগতের সাথে পরিচয়ের দারুণ মাধ্যম",
  },
];

export default function ComboSlider() {
  const isAuthenticatedRaw = useAppSelector((state) => state.profile.isAuthenticated);
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => { setMounted(true); }, []);
  const isAuthenticated = mounted && isAuthenticatedRaw;

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-white dark:bg-slate-950 pb-6 md:py-8 lg:py-10 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* ======================================================== */}
          {/* LEFT AREA: Combo Image Slider                            */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-2xl aspect-[359/201] lg:aspect-[983/393] shadow-sm group">
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-900/60 md:to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-300 text-[10px] md:text-sm font-bold mb-2 md:mb-4">
                      <Sparkles className="w-3 h-3 md:w-4 h-4" /> এক্সক্লুসিভ কম্বো অফার
                    </div>
                    <h2 className="text-xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-4 drop-shadow-lg leading-tight">
                      {slides[current].title}
                    </h2>
                    <p className="text-slate-200 text-xs md:text-xl font-medium drop-shadow-md">
                      {slides[current].subtitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    idx === current ? "bg-primary-500 w-6 md:w-10" : "bg-white/40 w-1.5 md:w-2"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30"
            >
              <ChevronRight className="w-5 h-5 md:w-6 h-6" />
            </button>
          </div>


          {/* ======================================================== */}
          {/* RIGHT AREA: Custom Combo Prompt Section                   */}
          {/* ======================================================== */}
          <div className="hidden lg:flex flex-col relative w-full h-full bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-slate-900 dark:to-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30 overflow-hidden shadow-sm lg:aspect-[481/394]">
            
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/50 dark:bg-primary-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary-200/30 dark:bg-secondary-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 h-full">
              {!isAuthenticated ? (
                <>
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-b-4 border-primary-500 mb-6 flex items-center justify-center animate-bounce-slow">
                     <Wand2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  
                  <h3 className="text-2xl font-black font-heading text-slate-800 dark:text-white mb-2 leading-tight">
                    নিজের পছন্দের <br/>
                    <span className="text-primary-600">কম্বো তৈরি করুন</span>
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-8 px-4">
                    লগইন করুন এবং আপনার পছন্দের খেলনা দিয়ে কাস্টম কম্বো বানিয়ে আকর্ষণীয় ডিসকাউন্ট পান!
                  </p>
                  
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary-500/30 w-full max-w-[240px]"
                  >
                    <LogIn className="w-5 h-5 group-hover:text-primary-300 transition-colors" />
                    লগইন করুন
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-b-4 border-secondary-500 mb-6 flex items-center justify-center">
                     <UserCheck className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  
                  <h3 className="text-2xl font-black font-heading text-slate-800 dark:text-white mb-2 leading-tight">
                    স্বাগতম! আপনার <br/>
                    <span className="text-secondary-600">কম্বো সাজান</span>
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-8 px-4">
                    আপনি এখন নিজের মত করে কম্বো তৈরি করতে পারবেন। নিচের বিল্ডার ব্যবহার করুন।
                  </p>
                  
                  <button
                    onClick={() => {
                      document.getElementById('custom-combo-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center justify-center gap-2 bg-secondary-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-secondary-500/30 w-full max-w-[240px]"
                  >
                    শুরু করুন
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE ONLY: Promo Bar for Custom Combo                  */}
        {/* ======================================================== */}
        <div className="block lg:hidden mt-4 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-50 to-primary-100/30 dark:from-slate-800 dark:to-slate-900 border border-primary-100 dark:border-slate-700 shadow-sm">
           <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary-100 dark:from-primary-900/30 to-transparent"></div>
           
           <div className="flex items-center justify-between p-3.5 relative z-10 w-full">
              {!isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-white leading-none mb-1">স্মার্ট এআই কম্বো অ্যাসিস্ট্যান্ট</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">লগইন করে এআই সাজেশান ও ডিসকাউন্ট পান</span>
                     </div>
                  </div>
                  
                  <Link 
                    href="/login"
                    className="shrink-0 bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-primary-700 transition"
                  >
                    লগইন
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-secondary-600" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-white leading-none mb-1">এআই কম্বো বিল্ডার</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">স্মার্ট সাজেশান ব্যবহার করুন</span>
                     </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      document.getElementById('custom-combo-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shrink-0 bg-secondary-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md"
                  >
                    শুরু করুন
                  </button>
                </>
              )}
           </div>
        </div>

      </div>
    </section>
  );
}
