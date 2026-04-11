"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-bg-main.jpg",
    title: "আপনার সন্তানের জন্য নিখুঁত খেলনাটি খুঁজুন",
    subtitle:
      "আমাদের স্মার্ট এআই ব্যবহার করে মস্তিষ্ক-বিকাশকারী এবং বয়স-উপযোগী খেলনা আবিষ্কার করুন।",
  },
  {
    id: 2,
    image: "/images/hero-bg-2.jpg",
    title: "শিক্ষামূলক খেলনায় বিনিয়োগ করুন",
    subtitle:
      "এআই-চালিত সুপারিশে আপনার সন্তানের বিকাশে সাহায্য করুন এবং তাদের দক্ষতা বৃদ্ধি করুন।",
  },
  {
    id: 3,
    image: "/images/hero-bg-3.jpg",
    title: "মজা এবং শেখার নিখুঁত মিশ্রণ",
    subtitle:
      "নিরাপদ, প্রমাণিত এবং পরিবার-অনুমোদিত খেলনা যা আপনার বাচ্চাদের খুশি রাখবে।",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className="relative pt-20 pb-32 overflow-hidden"
      style={{
        backgroundImage: `url(${currentSlideData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-white/50 via-white/40 to-white/50 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-slate-900 dark:text-white mb-6 animate-fade-in-up">
            {currentSlideData.title.split(" ").map((word, idx) => {
              if (idx === currentSlideData.title.split(" ").length - 1) {
                return (
                  <span
                    key={idx}
                    className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-secondary-500"
                  >
                    {word}
                  </span>
                );
              }
              return <span key={idx}>{word} </span>;
            })}
          </h1>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-10 leading-relaxed">
            {currentSlideData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lg shadow-primary-500/30 transition-transform hover:-translate-y-1"
            >
              এখনই কিনুন
            </Link>
            <Link
              href="/ai-tools/gift-finder"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-secondary-500 rounded-full font-bold shadow-sm transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <BrainCircuit className="w-5 h-5 text-secondary-500" />
              এআই টুলস এক্সপ্লোর করুন
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" />
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary-600 w-8"
                  : "bg-white/60 hover:bg-white/80 dark:bg-slate-400/60 dark:hover:bg-slate-400/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-slate-900 dark:text-white" />
        </button>
      </div>
    </section>
  );
}
