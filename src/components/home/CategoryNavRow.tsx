import Link from 'next/link';
import { Package, BookOpen, Baby, Shapes, PencilRuler, Gift } from 'lucide-react';

const categories = [
  { id: 1, name: 'বেবি কেয়ার', icon: Baby, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/40' },
  { id: 2, name: 'খেলনা', icon: Shapes, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900/40' },
  { id: 3, name: 'বইসমূহ', icon: BookOpen, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  { id: 4, name: 'স্টেশনারি', icon: PencilRuler, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  { id: 5, name: 'অফার', icon: Gift, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  { id: 6, name: 'অ্যাক্সেসরিজ', icon: Package, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/40' },
];

export default function CategoryNavRow() {
  return (
    <section className="py-6 sm:py-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sr-only">শপ ক্যাটাগরি</h3>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 md:justify-center snap-x pb-2">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/shop?category=${cat.id}`}
              className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[80px] snap-center group"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md ${cat.bg}`}>
                <cat.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${cat.color}`} absoluteStrokeWidth strokeWidth={1.5} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 text-center group-hover:text-primary-600 transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
