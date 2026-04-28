import Link from 'next/link';
import Image from 'next/image';

interface PromoMiddleBannerProps {
  href: string;
  imageUrl: string;
  alt?: string;
}

export default function PromoMiddleBanner({
  href,
  imageUrl,
  alt = "Promotion Banner"
}: PromoMiddleBannerProps) {
  
 

  return (
    <div className="w-full">
      <Link 
        href={href} 
        className="block w-full h-[90px] sm:h-32 md:h-48 lg:h-[220px] relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] bg-slate-300 dark:bg-slate-700 flex items-center justify-center group hover:shadow-md transition-all border border-slate-200 dark:border-slate-800"
      >
         {/* If image 404s, the bg-slate-300 shows behind it. */}
         <Image 
           src={imageUrl} 
           alt={alt} 
           fill 
           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 600px"
           className="object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
         />
         {/* Subtle overlay on hover */}
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 duration-300 pointer-events-none"></div>
         {/* Debugging Text - Only shows if image is transparent or missing */}
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
            <span className="text-white text-xs font-bold uppercase tracking-widest">{alt}</span>
         </div>
      </Link>
    </div>
  );
}
