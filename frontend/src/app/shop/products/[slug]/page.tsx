import { notFound, redirect } from "next/navigation";
import ProductDetailsClient from "@/components/shared/ProductDetailsClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sodayon.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const p = json.data;
      if (p) {
        const title = `${p.nameBn || p.nameEn || p.name} - কিনুন সেরা দামে | সদায়ন`;
        const rawDesc = p.descriptionBn || p.descriptionEn || p.description || `${p.nameEn || p.name} কিনুন সদায়ন থেকে। সেরা দাম ও দ্রুত ডেলিভারি।`;
        const description = rawDesc.length > 155 ? `${rawDesc.slice(0, 152)}...` : rawDesc;
        const imageUrl = p.images && p.images.length > 0 ? p.images[0] : (p.image || `${SITE_URL}/default-product.jpg`);
        const canonicalUrl = `${SITE_URL}/shop/products/${p.slug || slug}`;

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
                url: imageUrl,
                width: 800,
                height: 800,
                alt: p.nameEn || p.name,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
          },
          robots: {
            index: true,
            follow: true,
          },
        };
      }
    }
  } catch (err) {
    /* fallback */
  }

  return {
    title: "খেলনার বিস্তারিত | সদায়ন",
    description: "সেরা কিডস খেলনা ও বেবি কেয়ার আইটেম সংগ্রহ - সদায়ন",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  console.log("[ProductDetailPage SSR] Fetching product details. API_BASE:", API_BASE, "slug:", slug);

  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, { cache: "no-store" });
    console.log("[ProductDetailPage SSR] Fetch response status:", res.status, "ok:", res.ok);
    if (!res.ok) notFound();
    const json = await res.json();
    const dbProduct = json.data;
    if (!dbProduct) notFound();

    // Redirection check: If user accessed via MongoDB ID or numeric ID, redirect to clean slug
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slug);
    const isNumericId = !isNaN(Number(slug));
    if ((isMongoId || isNumericId) && dbProduct.slug && dbProduct.slug !== slug) {
      console.log(`[ProductDetailPage SSR] Redirecting ${slug} to slug ${dbProduct.slug}`);
      redirect(`/shop/products/${dbProduct.slug}`);
    }

    let relatedProducts: any[] = [];
    try {
      const relRes = await fetch(`${API_BASE}/products?limit=6`, { cache: "no-store" });
      const relJson = await relRes.json();
      relatedProducts = (relJson.data || []).filter((p: any) => {
        const pid = p.id || p._id;
        const pSlug = p.slug;
        return pid !== (dbProduct.id || dbProduct._id) && pSlug !== slug;
      }).slice(0, 4);
    } catch { /* ignore */ }

    const productData = {
      ...dbProduct,
      brand: dbProduct.brandEn || dbProduct.brandBn || "Sodayon",
      originalPrice: dbProduct.originalPrice || dbProduct.price + 500,
      personalityType: dbProduct.playPersonality?.labelBn || "মাস্টার বিল্ডার",
      personalityDesc: dbProduct.playPersonality?.descBn || "লজিক পাজল এবং ক্রিয়েটিভ ডিজাইনের জন্য সেরা।",
      features: dbProduct.features || ["উচ্চমানের ম্যাটেরিয়াল", "সুরক্ষিত কোণা", "সহজ ব্যবহার"],
      images: dbProduct.images?.length > 0 ? dbProduct.images : [dbProduct.image || "bg-indigo-100"],
    };

    // JSON-LD Structured Data Schema for Product & Breadcrumbs
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": dbProduct.nameEn || dbProduct.name,
      "image": productData.images,
      "description": dbProduct.descriptionEn || dbProduct.descriptionBn || dbProduct.description,
      "brand": {
        "@type": "Brand",
        "name": productData.brand,
      },
      "offers": {
        "@type": "Offer",
        "url": `${SITE_URL}/shop/products/${dbProduct.slug || slug}`,
        "priceCurrency": "BDT",
        "price": dbProduct.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "হোম",
          "item": SITE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "শপ",
          "item": `${SITE_URL}/shop`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": dbProduct.nameEn || dbProduct.name,
          "item": `${SITE_URL}/shop/products/${dbProduct.slug || slug}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <ProductDetailsClient product={productData} relatedProducts={relatedProducts} />
      </>
    );
  } catch (err) {
    console.error("[ProductDetailPage Error] Failed to fetch product:", err);
    notFound();
  }
}
