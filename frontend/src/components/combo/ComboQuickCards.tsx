"use client";

import { motion } from "framer-motion";
import { Blocks, Baby, Compass, Music, Cpu, Puzzle, Palette } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const quickCards = [
  {
    id: 1,
    topText: "স্টেম কম্বো",
    title: "২০% ছাড়",
    subtitle: "রোবট + বিল্ডিং কিট",
    buttonText: "কম্বো দেখুন",
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_1.png",
    href: "#stem-combo",
  },
  {
    id: 2,
    topText: "বেবি কম্বো",
    title: "১৫% ছাড়",
    subtitle: "সেন্সরি + প্লে ম্যাট",
    buttonText: "কম্বো দেখুন",
    icon: <Baby className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_2.png",
    href: "#baby-combo",
  },
  {
    id: 3,
    topText: "আউটডোর কম্বো",
    title: "২৫% ছাড়",
    subtitle: "দূরবীন + ক্যামেরা",
    buttonText: "কম্বো দেখুন",
    icon: <Compass className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_4.png",
    href: "#outdoor-combo",
  },
  {
    id: 4,
    topText: "মিউজিক কম্বো",
    title: "১০% ছাড়",
    subtitle: "কীবোর্ড + পিয়ানো ম্যাট",
    buttonText: "কম্বো দেখুন",
    icon: <Music className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_3.png",
    href: "#music-combo",
  },
  {
    id: 5,
    topText: "বিল্ডিং কম্বো",
    title: "৩০% ছাড়",
    subtitle: "ম্যাগনা-টাইলস + ব্লকস",
    buttonText: "কম্বো দেখুন",
    icon: <Blocks className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_card_bg_2.png",
    href: "#building-combo",
  },
  {
    id: 6,
    topText: "পাজল কম্বো",
    title: "১৮% ছাড়",
    subtitle: "পাজল + ডিগ কিট",
    buttonText: "কম্বো দেখুন",
    icon: <Puzzle className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_card_bg_1.png",
    href: "#puzzle-combo",
  },
  {
    id: 7,
    topText: "আর্ট কম্বো",
    title: "২২% ছাড়",
    subtitle: "ক্রাফট কিট + ক্যানভাস",
    buttonText: "কম্বো দেখুন",
    icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_card_bg_1.png",
    href: "#art-combo",
  },
  {
    id: 8,
    topText: "মেগা ডিল",
    title: "৪০% ছাড়",
    subtitle: "সব ধরণের খেলনা কম্বো",
    buttonText: "ডিল লুফে নিন",
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_1.png",
    href: "#mega-deal",
  },
  {
    id: 9,
    topText: "উপহার সেট",
    title: "৳৫০০ ছাড়",
    subtitle: "জন্মদিনের স্পেশাল কম্বো",
    buttonText: "অর্ডার করুন",
    icon: <Baby className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_2.png",
    href: "#gift-set",
  },
  {
    id: 10,
    topText: "বিজ্ঞান কম্বো",
    title: "১০% সাশ্রয়",
    subtitle: "মাইক্রোস্কোপ + সায়েন্স কিট",
    buttonText: "এক্সপ্লোর করুন",
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_slide_4.png",
    href: "#science-combo",
  },
  {
    id: 11,
    topText: "লিটল শেফ",
    title: "১২% ছাড়",
    subtitle: "কিচেন সেট + প্লে ফুড",
    buttonText: "এখনই দেখুন",
    icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_card_bg_2.png",
    href: "#chef-combo",
  },
  {
    id: 12,
    topText: "লার্নিং প্যাক",
    title: "১৫% অফ",
    subtitle: "বুকস + ফ্ল্যাশ কার্ড",
    buttonText: "বিস্তারিত দেখুন",
    icon: <Blocks className="w-5 h-5 md:w-6 md:h-6" />,
    bgImage: "/images/combo/combo_card_bg_1.png",
    href: "#learning-pack",
  },
];

export default function ComboQuickCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScrollLeft - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">আপনার জন্য সেরা কম্বো অফার</h3>
        </div>
        
        {/* Scrolling Container */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex overflow-x-auto pb-6 gap-4 hide-scrollbar scroll-smooth snap-x"
        >
          {quickCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-start"
            >
              <Link
                href={card.href}
                className="relative block w-[124px] h-[132px] md:w-[161.797px] md:h-[164px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* STATIC GOLBAL THEME OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-900/50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full p-3 md:p-5 flex flex-col justify-between text-white">
                  <div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-90">
                      {card.topText}
                    </span>
                    <h4 className="text-sm md:text-lg font-black leading-tight mt-0.5">
                      {card.title}
                    </h4>
                    <p className="text-[10px] md:text-xs font-medium opacity-80 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white text-slate-800 text-[10px] md:text-xs font-bold rounded-full shadow-md group-hover:bg-primary-50 transition-colors">
                      {card.buttonText}
                    </span>
                  </div>

                  {/* ICON BUBBLE (STATIC SLATE THEME) */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-slate-700/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 transform group-hover:rotate-12 transition-transform">
                    {card.icon}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
