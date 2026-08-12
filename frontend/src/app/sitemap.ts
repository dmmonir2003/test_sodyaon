import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sodayon.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Determine standard URL endpoint for backend fetches
const FETCH_URL = API_URL.startsWith('/')
  ? `https://api.sodayon.com${API_URL}` // Standard relative fallback resolving to production API domain
  : API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Core Static Shop Pages (high priority, fixed structure)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/track-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Sub-segment filter/category landing pages
    ...['baby-bags', 'baby-care', 'baby-clothes', 'baby-food', 'diapers'].map((segment) => ({
      url: `${SITE_URL}/shop/${segment}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  let productRoutes: MetadataRoute.Sitemap = [];

  // 2. Dynamic Categories Fetching
  try {
    const categoriesResponse = await fetch(`${FETCH_URL}/categories`, {
      next: { revalidate: 3600 }, // Cache the fetch request for 1 hour (ISR-style updates)
      signal: AbortSignal.timeout(5000), // Prevent hanging on API delays (5 seconds timeout)
    });

    if (categoriesResponse.ok) {
      const categoriesJson = await categoriesResponse.json();
      if (categoriesJson.success && Array.isArray(categoriesJson.data)) {
        categoryRoutes = categoriesJson.data.map((cat: any) => ({
          url: `${SITE_URL}/shop/categories/${cat.slug}`,
          lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
      }
    } else {
      console.warn(`[Sitemap] Categories fetch returned status ${categoriesResponse.status}`);
    }
  } catch (error) {
    console.error('[Sitemap] Failed to fetch categories for sitemap:', error);
  }

  // 3. Dynamic Products Fetching (Active items)
  try {
    // We pass limit=10000 to ensure we capture all products inside the shop
    const productsResponse = await fetch(`${FETCH_URL}/products?limit=10000`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: AbortSignal.timeout(10000), // Allow up to 10 seconds for large dataset query
    });

    if (productsResponse.ok) {
      const productsJson = await productsResponse.json();
      if (productsJson.success && Array.isArray(productsJson.data)) {
        productRoutes = productsJson.data.map((product: any) => ({
          url: `${SITE_URL}/shop/products/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.7,
        }));
      }
    } else {
      console.warn(`[Sitemap] Products fetch returned status ${productsResponse.status}`);
    }
  } catch (error) {
    console.error('[Sitemap] Failed to fetch products for sitemap:', error);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
