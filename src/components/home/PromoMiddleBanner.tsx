import Link from 'next/link';
import Image from 'next/image';

interface PromoMiddleBannerProps {
  href?: string;
  categoryName?: string;
  imageUrl: string;
  alt?: string;
}

export default function PromoMiddleBanner({
  href,
  categoryName,
  imageUrl,
  alt = "Promotion Banner"
}: PromoMiddleBannerProps) {
  
  // Construct destination URL: prioritize explicit href, fallback to category search
  const destination = href || (categoryName ? `/shop?category=${encodeURIComponent(categoryName)}` : "/shop");
  
  return (
    <div className="flex justify-center xl:block">
      <Link 
        href={destination} 
        className="promo-banner-link block relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 dark:border-slate-800 w-[169.5px] h-[94.906px] lg:w-[818.663px] lg:h-[457.014px] max-w-full"
      >
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse -z-10" />
        
        <Image 
          src={imageUrl} 
          alt={alt} 
          fill 
          priority
          sizes="(max-width: 768px) 170px, 820px"
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out z-0" 
        />
        
        {/* Sleek Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent mix-blend-overlay" />
        </div>
      </Link>
    </div>
  );
}
