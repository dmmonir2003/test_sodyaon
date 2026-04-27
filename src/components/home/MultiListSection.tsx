import Link from 'next/link';
import { Package } from 'lucide-react';

export type CompactProduct = {
  id: number;
  name: string;
  price: string;
  img: string;
};

export type ListColumnInfo = {
  title: string;
  items: CompactProduct[];
};

export default function MultiListSection({ columns }: { columns: ListColumnInfo[] }) {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              
              {/* Column Title */}
              <h3 className="text-xl font-bold font-heading text-slate-800 dark:text-white mb-5 pb-3 border-b border-primary-100 dark:border-primary-900/30 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-primary-500 rounded-full inline-block"></span>
                 {col.title}
              </h3>

              {/* Items List */}
              <div className="flex flex-col gap-4">
                {col.items.map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/shop/products/${item.id}`}
                    className="flex items-center gap-3 group"
                  >
                    {/* Item Thumbnail */}
                    <div className={`w-20 h-20 rounded-lg ${item.img} flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                       <Package className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex flex-col flex-grow py-1">
                      <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight mb-1.5">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-primary-600 text-sm">{item.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
