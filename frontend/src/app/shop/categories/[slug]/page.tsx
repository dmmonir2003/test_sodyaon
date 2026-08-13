import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sodayon.com";

// Define a type for category metadata
type CategoryMetadata = {
  name: string;
  description: string;
  theme: string;
};

const getCategoryMetadata = (slug: string): CategoryMetadata => {
  const categories: Record<string, CategoryMetadata> = {
    "action-figures": { name: "Action Figures", description: "Heroes, villains, and everything in between.", theme: "bg-red-500" },
    "building-sets": { name: "Building Sets", description: "Build their imagination block by block.", theme: "bg-blue-500" },
    "educational": { name: "Educational Toys", description: "Learn while combining fun and science.", theme: "bg-emerald-500" },
    "dolls": { name: "Dolls & Figures", description: "Inspire empathy and storytelling with our inclusive collection of dolls.", theme: "bg-pink-500" },
    "outdoor": { name: "Outdoor Play", description: "Get outside and unleash their energy with our active outdoor play equipment.", theme: "bg-amber-500" }
  };
  return categories[slug] || { name: slug.replace(/-/g, " "), description: "Explore this amazing category of premium kids toys.", theme: "bg-primary-600" };
};

// DYNAMIC SEO GENERATION
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryMetadata(resolvedParams.slug);
  const title = `${category.name} খেলনা কালেকশন | সদায়ন`;
  const description = `সদায়ন থেকে সেরা ${category.name} খেলনা শপ করুন। ${category.description}`;
  const canonicalUrl = `${SITE_URL}/shop/categories/${resolvedParams.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "সদায়ন",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/promo_toys_banner_1777417968994.png`,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/promo_toys_banner_1777417968994.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryMetadata(resolvedParams.slug);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Category Header with Dynamic Data */}
      <div className={`${category.theme} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium capitalize">{category.name}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2 capitalize">{category.name}</h1>
          <p className="text-white/80 max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 flex-shrink-0">
            <FiltersSidebar />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">12 Results Found</span>
              <SortDropdown />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {[1,2,3,4,5,6].map((prod) => (
                <ProductCard 
                  key={prod} 
                  name={`${category.name} Item ${prod}`} 
                  price={`$${(29.99 + prod * 10).toFixed(2)}`} 
                  img="bg-slate-200 dark:bg-slate-700" 
                />
              ))}
            </div>
            
            {/* JSON-LD Schema Component injected here for SEO */}
            <ProductCollectionSchema category={category.name} slug={resolvedParams.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

// JSON-LD Schema generation for SEO
function ProductCollectionSchema({ category, slug }: { category: string; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category} Toys Collection`,
    "url": `${SITE_URL}/shop/categories/${slug}`,
    "itemListElement": [1, 2, 3, 4, 5, 6].map((idx) => ({
      "@type": "ListItem",
      "position": idx,
      "item": {
        "@type": "Product",
        "name": `${category} Item ${idx}`,
        "offers": { "@type": "Offer", "price": (29.99 + idx * 10).toFixed(2), "priceCurrency": "BDT" }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
