import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PromoMiddleBannerProps {
  title: string;
  subtitle: string;
  linkText: string;
  href: string;
  bgClass?: string;
  illustrationType?: 'books' | 'toys' | 'baby';
}

export default function PromoMiddleBanner({
  title,
  subtitle,
  linkText,
  href,
  bgClass = "bg-gradient-to-r from-cyan-500 to-blue-600",
  illustrationType = "toys"
}: PromoMiddleBannerProps) {
  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`${bgClass} rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm`}>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0 max-w-xl">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-white/90 text-sm sm:text-base font-medium mb-6">
            {subtitle}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-2.5 rounded-full hover:bg-slate-50 hover:scale-105 transition-all shadow-md text-sm"
          >
            {linkText} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Abstract Illustration */}
        <div className="relative z-10 flex items-center justify-center shrink-0 w-32 h-32 md:w-48 md:h-48 drop-shadow-xl">
          {illustrationType === 'books' && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center rotate-6">
               <span className="text-6xl sm:text-7xl">📚</span>
            </div>
          )}
          {illustrationType === 'toys' && (
            <div className="flex gap-2">
               <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center -rotate-12 animate-pulse">
                 <span className="text-5xl sm:text-6xl">🤖</span>
               </div>
               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center rotate-12 mt-8 animate-bounce">
                 <span className="text-3xl sm:text-4xl">🧩</span>
               </div>
            </div>
          )}
          {illustrationType === 'baby' && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 backdrop-blur rounded-full flex items-center justify-center rotate-[-5deg]">
               <span className="text-6xl sm:text-7xl">🍼</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
