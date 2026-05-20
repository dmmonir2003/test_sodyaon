import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';

export type ProductItem = {
  id: number;
  name: string;
  price: string;
  img: string;
};

interface ProductSliderSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink: string;
  products: ProductItem[];
  bgColor?: string;
  badge?: string;
}

export default function ProductSliderSection({ 
  title, 
  subtitle, 
  viewAllLink, 
  products, 
  bgColor = "bg-white dark:bg-slate-900",
  badge
}: ProductSliderSectionProps) {
  return (
    <section className={`py-12 border-b border-slate-100 dark:border-slate-800 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
          <div className="flex items-start gap-3">
            {badge && (
               <div className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm shrink-0 mt-1">
                 {badge}
               </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <Link
             href={viewAllLink}
             className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full transition-colors shrink-0"
          >
             সব দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Scrollable Products */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((product) => (
            <div key={product.id} className="min-w-[160px] max-w-[160px] sm:min-w-[220px] sm:max-w-[220px] snap-start flex-shrink-0">
               <ProductCard
                 name={product.name}
                 price={product.price}
                 img={product.img}
                 link={`/shop/products/${product.id}`}
               />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
