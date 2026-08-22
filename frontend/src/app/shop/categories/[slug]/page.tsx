import { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sodayon.com";

// DYNAMIC SEO GENERATION
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const formattedName = resolvedParams.slug.replace(/-/g, " ");
  const title = `${formattedName} কালেকশন | সদায়ন`;
  const description = `সদায়ন থেকে সেরা ${formattedName} খেলনা ও বেবি প্রোডাক্টস শপ করুন সাশ্রয়ী মূল্যে।`;
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
          alt: formattedName,
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
  return <CategoryPageClient slug={resolvedParams.slug} />;
}
