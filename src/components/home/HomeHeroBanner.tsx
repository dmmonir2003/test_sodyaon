import Link from 'next/link';

export default function HomeHeroBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-8 md:mb-0 space-y-4 max-w-lg w-full">
          <div className="inline-block bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-bold px-3 py-1 rounded-full text-sm mb-2">
            সর্বোচ্চ ছাড়
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white drop-shadow-sm font-heading leading-tight">
            ৮০% <span className="text-2xl md:text-3xl font-bold text-primary-600">পর্যন্ত অফার!</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium pb-2">
            বাচ্চাদের খেলনা, বেবি কেয়ার এবং স্টেশনারি সামগ্রীতে
          </p>
          <div className="pt-2">
            <Link
              href="/offers"
              className="inline-block bg-primary-600 text-white font-bold px-8 py-3 rounded-full hover:bg-primary-700 transition shadow-lg hover:shadow-primary-600/30"
            >
              অফারগুলো দেখুন
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-4 md:gap-8 opacity-90 relative">
           <div className="w-20 h-20 md:w-28 md:h-28 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center shadow-md rotate-12 transform hover:rotate-0 transition-transform duration-500 hover:scale-110">
             <span className="text-4xl md:text-5xl">🧸</span>
           </div>
           <div className="w-28 h-28 md:w-36 md:h-36 bg-pink-100 dark:bg-pink-900/40 rounded-2xl flex items-center justify-center shadow-lg -rotate-6 transform hover:rotate-0 transition-transform duration-500 -mt-6 md:-mt-10 hover:scale-110">
             <span className="text-5xl md:text-6xl">📚</span>
           </div>
           <div className="w-20 h-20 md:w-28 md:h-28 bg-primary-100 dark:bg-primary-900/40 rounded-3xl flex items-center justify-center shadow-md rotate-6 transform hover:rotate-0 transition-transform duration-500 mt-6 md:mt-10 hover:scale-110">
             <span className="text-4xl md:text-5xl">🍼</span>
           </div>
           
           {/* Abstract circles */}
           <div className="absolute -top-6 -right-6 w-12 h-12 border-4 border-accent-300/50 rounded-full"></div>
           <div className="absolute -bottom-4 -left-8 w-8 h-8 bg-secondary-300/50 rounded-full"></div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/40 dark:bg-primary-900/10 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none"></div>
    </section>
  );
}
