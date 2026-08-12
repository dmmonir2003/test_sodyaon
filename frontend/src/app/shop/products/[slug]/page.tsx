import { notFound, redirect } from "next/navigation";
import ProductDetailsClient from "@/components/shared/ProductDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const p = json.data;
      if (p) {
        const title = `${p.nameBn || p.nameEn || p.name} | Sodayon - সেরা কিডস খেলনা শপ`;
        const description = (p.descriptionBn || p.descriptionEn || p.description || `${p.nameEn} কিনুন সোদায়ন থেকে।`).slice(0, 160);
        return {
          title,
          description,
          openGraph: {
            title,
            description,
            images: p.images && p.images.length > 0 ? [{ url: p.images[0] }] : (p.image ? [{ url: p.image }] : []),
          },
        };
      }
    }
  } catch (err) { /* fallback */ }

  return {
    title: "খেলনার বিস্তারিত | Sodayon",
    description: "সেরা কিডস খেলনা ও বেবি কেয়ার আইটেম সংগ্রহ - সোদায়ন",
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

    return <ProductDetailsClient product={productData} relatedProducts={relatedProducts} />;
  } catch (err) {
    console.error("[ProductDetailPage Error] Failed to fetch product:", err);
    notFound();
  }
}
