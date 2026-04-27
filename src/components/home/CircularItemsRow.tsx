import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export type CircularItem = {
  id: number;
  name: string;
  img: string;
  subtext?: string;
};

interface CircularItemsRowProps {
  title: string;
  items: CircularItem[];
}

export default function CircularItemsRow({ title, items }: CircularItemsRowProps) {
  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-800 dark:text-white flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            {title}
            <Sparkles className="w-6 h-6 text-amber-500" />
          </h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full mt-3"></div>
        </div>

        {/* Circular Grid/Row */}
        <div className="flex overflow-x-auto hide-scrollbar gap-6 sm:gap-8 md:justify-center snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={`/shop?brand=${item.id}`}
              className="flex flex-col items-center gap-3 min-w-[90px] sm:min-w-[110px] snap-center group"
            >
              {/* Circular Avatar */}
              <div className="relative">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${item.img} border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:shadow-lg group-hover:border-primary-100 dark:group-hover:border-primary-900/50 transition-all duration-300 flex items-center justify-center overflow-hidden bg-white`}>
                   {/* Fallback pattern if real image isn't loaded - standardizing with our colored backgrounds */}
                   <span className="text-3xl sm:text-4xl opacity-50 font-heading font-black text-slate-900/10 dark:text-white/10 uppercase">
                     {item.name.substring(0, 2)}
                   </span>
                </div>
                {/* Decorative dot */}
                <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
              </div>
              
              {/* Name and Subtext */}
              <div className="text-center">
                <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                  {item.name}
                </h4>
                {item.subtext && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.subtext}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
