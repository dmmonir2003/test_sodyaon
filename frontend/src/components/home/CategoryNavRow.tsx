import Link from 'next/link';
import { Package, BookOpen, Baby, Shapes, PencilRuler, Gift, Sparkles, Shirt, Utensils, ShoppingBag } from 'lucide-react';
import { useGetCategoriesQuery } from "@/store/admin/adminContentApi";

const iconMap: Record<string, any> = {
  Baby,
  Shapes,
  BookOpen,
  PencilRuler,
  Gift,
  Package,
  Sparkles,
  Shirt,
  Utensils,
  ShoppingBag
};

const getCategoryStyles = (slug: string, dbIcon?: string) => {
  if (dbIcon && iconMap[dbIcon]) {
    let color = 'text-cyan-600 dark:text-cyan-400';
    let bg = 'bg-cyan-100 dark:bg-cyan-900/40';
    if (slug === 'baby-care' || slug.includes('baby')) {
      color = 'text-pink-600 dark:text-pink-400';
      bg = 'bg-pink-100 dark:bg-pink-900/40';
    } else if (slug === 'stem-blocks' || slug.includes('stem')) {
      color = 'text-primary-600 dark:text-primary-400';
      bg = 'bg-primary-100 dark:bg-primary-900/40';
    } else if (slug === 'educational-toys' || slug.includes('education')) {
      color = 'text-indigo-600 dark:text-indigo-400';
      bg = 'bg-indigo-100 dark:bg-indigo-900/40';
    } else if (slug === 'dolls-pretend-play' || slug.includes('doll')) {
      color = 'text-amber-600 dark:text-amber-400';
      bg = 'bg-amber-100 dark:bg-amber-900/40';
    }
    return { icon: iconMap[dbIcon], color, bg, isImage: false };
  }

  if (dbIcon && (dbIcon.startsWith('http') || dbIcon.startsWith('/') || dbIcon.startsWith('data:'))) {
    return { icon: null, imageUrl: dbIcon, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-950/50', isImage: true };
  }

  switch (slug) {
    case 'baby-care':
      return { icon: Baby, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/40', isImage: false };
    case 'stem-blocks':
      return { icon: Shapes, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900/40', isImage: false };
    case 'educational-toys':
      return { icon: BookOpen, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40', isImage: false };
    case 'dolls-pretend-play':
      return { icon: Package, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40', isImage: false };
    case 'offers':
      return { icon: Gift, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/40', isImage: false };
    default:
      return { icon: Package, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/40', isImage: false };
  }
};

export default function CategoryNavRow() {
  const { data: catData } = useGetCategoriesQuery({ tree: true });

  const dbCategories = catData?.data || [];

  // Filter root categories marked with showInIconGrid (or default to root categories)
  const iconGridCategories = dbCategories.filter((c: any) => c.showInIconGrid);
  const candidateCategories = iconGridCategories.length > 0 ? iconGridCategories : dbCategories.filter((c: any) => !c.parentId);

  const sortedCategories = [...candidateCategories].sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <section className="py-6 sm:py-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sr-only">শপ ক্যাটাগরি</h3>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 md:justify-center snap-x pb-2">
          {sortedCategories.map((c: any) => {
            const styles = getCategoryStyles(c.slug, c.icon);
            const IconComponent = styles.icon || Package;
            const linkHref = `/shop/categories/${c.slug}`;

            return (
              <Link 
                key={c._id || c.id} 
                href={linkHref}
                className="flex flex-col items-center gap-2 min-w-[76px] sm:min-w-[88px] snap-center group"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${styles.bg}`}>
                  {styles.isImage && styles.imageUrl ? (
                    <img 
                      src={styles.imageUrl} 
                      alt={c.nameEn || "Category"} 
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${styles.color}`} absoluteStrokeWidth strokeWidth={1.5} />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 text-center group-hover:text-primary-600 transition-colors whitespace-nowrap font-bengali">
                  {c.nameBn || c.nameEn}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
