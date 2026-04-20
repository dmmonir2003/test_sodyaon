"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRIMARY, SECONDARY, ACCENT } from "@/config/colors-extended";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  bgGradient: string;
  accentColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "প্রতিদিনের মুহূর্তে স্বাস্থ্যকর খেলোনা",
    subtitle: "আপনার সন্তানের বিকাশের জন্য যত্নসহকারে নির্বাচিত",
    cta: "এখনই আবিষ্কার করুন",
    bgGradient: "from-amber-900/40 via-amber-800/30 to-orange-900/40",
    accentColor: PRIMARY[600],
  },
  {
    id: 2,
    title: "মানসম্পন্ন এবং নিরাপদ খেলনা",
    subtitle: "প্রতিটি খেলনা পরীক্ষিত এবং অনুমোদিত",
    cta: "সংগ্রহ দেখুন",
    bgGradient: "from-slate-900/40 via-slate-800/30 to-slate-900/40",
    accentColor: ACCENT[500],
  },
  {
    id: 3,
    title: "আপনার বাচ্চার সেরা বন্ধু খুঁজুন",
    subtitle: "শিক্ষামূলক এবং মজার নিখুঁত সমন্বয়",
    cta: "এআই দিয়ে খুঁজুন",
    bgGradient: "from-orange-900/40 via-amber-800/30 to-orange-800/40",
    accentColor: SECONDARY[500],
  },
];

// Mock product data - in real app, this would come from your product database
const featuredProducts = [
  { id: 1, name: "খেলনা সেট ১", price: "৳২৪৯৯", bgColor: "bg-amber-100" },
  { id: 2, name: "খেলনা সেট ২", price: "৳১৯৯৯", bgColor: "bg-orange-100" },
  { id: 3, name: "খেলনা সেট ৩", price: "৳২৯৯৯", bgColor: "bg-yellow-100" },
  { id: 4, name: "খেলনা সেট ৪", price: "৳১৪৯৯", bgColor: "bg-amber-50" },
];

export default function PremiumHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setAutoPlay(false);
  };

  const currentSlide_data = heroSlides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Hero Container */}
      <div className="relative min-h-screen md:min-h-[85vh] w-full">
        {/* Background with gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentSlide_data.bgGradient} transition-all duration-1000 ease-in-out`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(217, 119, 6, 0.5) 0%, rgba(180, 83, 9, 0.4) 50%, rgba(161, 98, 7, 0.3) 100%), 
                            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "cover, 60px 60px",
            backgroundPosition: "center",
          }}
        />

        {/* Content Grid - Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-center h-full min-h-[85vh] max-w-7xl mx-auto px-6 lg:px-8 relative z-20 py-20">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6 animate-fade-in">
              <h1
                className="text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg"
                style={{
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                {currentSlide_data.title.split(" ").map((word, idx) => {
                  if (idx === currentSlide_data.title.split(" ").length - 1) {
                    return (
                      <span
                        key={idx}
                        className="block"
                        style={{
                          color: currentSlide_data.accentColor,
                          textShadow: `0 4px 20px ${currentSlide_data.accentColor}40`,
                        }}
                      >
                        {word}
                      </span>
                    );
                  }
                  return <span key={idx}>{word} </span>;
                })}
              </h1>

              <p className="text-lg lg:text-xl text-slate-100 leading-relaxed drop-shadow-md max-w-lg">
                {currentSlide_data.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/shop"
                  className="px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: currentSlide_data.accentColor,
                  }}
                >
                  {currentSlide_data.cta}
                </Link>
                <Link
                  href="/ai-tools/gift-finder"
                  className="px-8 py-4 rounded-full font-bold text-white border-2 border-white/50 backdrop-blur-md hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  এআই সাহায্য নিন
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Product Showcase */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full max-w-md h-96 perspective">
              {/* Decorative frame */}
              <div
                className="absolute inset-0 rounded-3xl border-8 border-white/20 backdrop-blur-sm"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              />

              {/* Product Grid */}
              <div className="absolute inset-6 grid grid-cols-2 gap-4 items-center justify-center">
                {featuredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className={`${product.bgColor} rounded-2xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                    style={{
                      animationDelay: `${idx * 100}ms`,
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center mb-3">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {product.name}
                    </h3>
                    <p className="text-accent-600 font-bold text-sm mt-1">
                      {product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center min-h-screen px-4 relative z-20 py-16 text-center space-y-8">
          <div className="space-y-6 max-w-sm">
            <h1
              className="text-3xl font-bold leading-tight text-white drop-shadow-lg"
              style={{
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {currentSlide_data.title.split(" ").map((word, idx) => {
                if (idx === currentSlide_data.title.split(" ").length - 1) {
                  return (
                    <span
                      key={idx}
                      className="block"
                      style={{
                        color: currentSlide_data.accentColor,
                        textShadow: `0 4px 20px ${currentSlide_data.accentColor}40`,
                      }}
                    >
                      {word}
                    </span>
                  );
                }
                return <span key={idx}>{word} </span>;
              })}
            </h1>

            <p className="text-base text-slate-100 leading-relaxed drop-shadow-md">
              {currentSlide_data.subtitle}
            </p>

            {/* Product Showcase Mobile */}
            <div className="grid grid-cols-2 gap-3 my-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className={`${product.bgColor} rounded-xl p-4 flex flex-col items-center justify-center text-center`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center mb-2">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-xs">
                    {product.name}
                  </h3>
                  <p className="text-accent-600 font-bold text-xs mt-1">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons Mobile */}
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/shop"
                className="w-full px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: currentSlide_data.accentColor,
                }}
              >
                {currentSlide_data.cta}
              </Link>
              <Link
                href="/ai-tools/gift-finder"
                className="w-full px-6 py-3 rounded-full font-bold text-white border-2 border-white/50 backdrop-blur-md hover:border-white transition-all"
              >
                এআই সাহায্য নিন
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Controls - Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-3"
                    : "w-3 h-3 hover:bg-white/50"
                }`}
                style={{
                  backgroundColor:
                    index === currentSlide
                      ? currentSlide_data.accentColor
                      : "rgba(255, 255, 255, 0.3)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full border-2 border-white/5 md:block hidden"></div>
      <div className="absolute bottom-32 left-10 w-40 h-40 rounded-full border-2 border-white/5 md:block hidden"></div>
    </section>
  );
}
