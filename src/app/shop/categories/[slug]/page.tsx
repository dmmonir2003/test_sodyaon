import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

// Define a type for our mock category database
type CategoryMetadata = {
  name: string;
  description: string;
  theme: string;
};

// Mock database fetch
const getCategoryMetadata = (slug: string): CategoryMetadata => {
  const categories: Record<string, CategoryMetadata> = {
    "action-figures": { name: "Action Figures", description: "Heroes, villains, and everything in between.", theme: "bg-red-500" },
    "building-sets": { name: "Building Sets", description: "Build their imagination block by block.", theme: "bg-blue-500" },
    "educational": { name: "Educational Toys", description: "Learn while combining fun and science.", theme: "bg-emerald-500" },
    "dolls": { name: "Dolls & Figures", description: "Inspire empathy and storytelling with our inclusive collection of dolls.", theme: "bg-pink-500" },
    "outdoor": { name: "Outdoor Play", description: "Get outside and unleash their energy with our active outdoor play equipment.", theme: "bg-amber-500" }
  };
  return categories[slug] || { name: slug.replace("-", " "), description: "Explore this amazing category.", theme: "bg-primary-600" };
};

// DYNAMIC SEO GENERATION
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryMetadata(resolvedParams.slug);
  
  return {
    title: `${category.name} | Shop at PlayTime`,
    description: `Shop the best ${category.name} toys. ${category.description}`,
    openGraph: {
      title: `${category.name} Toys | PlayTime`,
      description: category.description,
      type: "website",
    }
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <ProductCollectionSchema category={category.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

// JSON-LD Schema generation for SEO
function ProductCollectionSchema({ category }: { category: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": `${category} Item 1`,
          "offers": { "@type": "Offer", "price": "39.99", "priceCurrency": "USD" }
        }
      }
      // In a real app, this maps over the actual items displayed on the page
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
