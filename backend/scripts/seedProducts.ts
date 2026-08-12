import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../src/modules/product/product.model';
import { Brand } from '../src/modules/brand/brand.model';
import { Review } from '../src/modules/review/review.model';
import { ProductQA } from '../src/modules/qa/qa.model';
import { Coupon } from '../src/modules/order/coupon.model';
import { ComboTemplate } from '../src/modules/campaign/combo.model';
import { FlashDeal, SpecialCollection, CollectionItem } from '../src/modules/campaign/deals.model';
import MenuItem from '../src/modules/menu/menu.model';
import { PRODUCTS } from '../../frontend/src/data/database';

dotenv.config();

// Create realistic mock MongoDB ObjectIDs
const mockCustomerUserId = new mongoose.Types.ObjectId();
const mockStaffUserId = new mongoose.Types.ObjectId();

const seed = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sodayon';
    await mongoose.connect(uri);
    console.log('[Seeding] Connected to MongoDB...');

    // -------------------------------------------------------------
    // CLEAR COLLECTIONS
    // -------------------------------------------------------------
    await Brand.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await ProductQA.deleteMany({});
    await Coupon.deleteMany({});
    await ComboTemplate.deleteMany({});
    await FlashDeal.deleteMany({});
    await SpecialCollection.deleteMany({});
    await CollectionItem.deleteMany({});
    await MenuItem.deleteMany({});
    await Coupon.deleteMany({});
    await ComboTemplate.deleteMany({});
    await FlashDeal.deleteMany({});
    await SpecialCollection.deleteMany({});
    await CollectionItem.deleteMany({});
    console.log('[Seeding] Cleared all relevant e-commerce collections');

    // -------------------------------------------------------------
    // 1. SEED BRANDS
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Brands...');
    const brandsData = [
      { nameEn: 'Lego', nameBn: 'লেগো', slug: 'lego', logoUrl: 'https://placehold.co/100x100?text=Lego', tagLabel: 'STEM Blocks', isFeatured: true },
      { nameEn: 'Fisher-Price', nameBn: 'ফিশার-প্রাইস', slug: 'fisher-price', logoUrl: 'https://placehold.co/100x100?text=Fisher', tagLabel: 'Early Dev', isFeatured: true },
      { nameEn: 'Sodayon Premium', nameBn: 'সোদায়োন প্রিমিয়াম', slug: 'sodayon-premium', logoUrl: 'https://placehold.co/100x100?text=Sodayon', tagLabel: 'Local Handcrafted', isFeatured: true },
      { nameEn: 'Huggies', nameBn: 'হ্যাগিস', slug: 'huggies', logoUrl: 'https://placehold.co/100x100?text=Huggies', tagLabel: 'Baby Care', isFeatured: false },
    ];
    const createdBrands = await Brand.insertMany(brandsData);
    const legoBrand = createdBrands[0];
    const fisherBrand = createdBrands[1];
    const sodayonBrand = createdBrands[2];
    console.log(`[Seeding] Created ${createdBrands.length} Brands!`);

    // -------------------------------------------------------------
    // 2. SEED PRODUCTS & EMBEDDED VARIANTS
    // -------------------------------------------------------------
    console.log('[Seeding] Mapping & Creating Products with SKU Variants...');
    const productsToInsert = PRODUCTS.map((p: any, idx) => {
      // Alternate brands for variety
      let brandObj = sodayonBrand;
      if (idx % 3 === 0) brandObj = legoBrand;
      else if (idx % 3 === 1) brandObj = fisherBrand;

      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${p.id}`;

      // Build default and alternative variants
      const variants = [
        {
          sku: `SKU-${p.id}-DEF`,
          nameEn: `${p.name} - Default`,
          nameBn: `${p.bengaliName || p.name} - ডিফল্ট`,
          price: p.price,
          originalPrice: p.originalPrice || undefined,
          stock: p.stock || 40,
          stockQty: p.stock || 40,
          images: ['https://placehold.co/400x400?text=Default'],
          options: { color: 'Standard' },
          colorName: 'Standard',
          colorHex: '#CCCCCC',
          sizeLabel: 'Standard',
          isDefault: true,
        },
        {
          sku: `SKU-${p.id}-ALT`,
          nameEn: `${p.name} - Special Edition`,
          nameBn: `${p.bengaliName || p.name} - বিশেষ সংস্করণ`,
          price: p.price + 150,
          priceOverride: p.price + 150,
          originalPrice: (p.originalPrice || p.price) + 200,
          stock: 15,
          stockQty: 15,
          images: ['https://placehold.co/400x400?text=AltColor'],
          options: { color: 'Blue' },
          colorName: 'Royal Blue',
          colorHex: '#0055FF',
          sizeLabel: 'Premium Large',
          isDefault: false,
        }
      ];

      return {
        sku: `SKU-${p.id}`,
        numericId: p.id,
        slug,
        modelCode: `MOD-${p.id}`,
        brandEn: brandObj.nameEn,
        brandBn: brandObj.nameBn,
        brand: brandObj._id,
        nameEn: p.name,
        nameBn: p.bengaliName || p.name,
        name: p.name, // backward compatibility
        bengaliName: p.bengaliName || p.name, // backward compatibility
        descriptionEn: p.description,
        descriptionBn: p.bengaliDescription || p.description,
        description: p.description, // backward compatibility
        bengaliDescription: p.bengaliDescription || p.description, // backward compatibility
        images: ['https://placehold.co/400x400?text=Thumbnail', 'https://placehold.co/400x400?text=AngleView'],
        image: 'https://placehold.co/400x400?text=Thumbnail', // backward compatibility
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // backward compatibility
        videos: [
          {
            youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            titleBn: 'ভিডিও ডেমো',
            thumbnailUrl: 'https://placehold.co/120x90?text=YouTube',
            channelName: 'Sodayon Playspace',
            duration: '2:45',
            tabType: 'demo',
            sortOrder: 1,
          }
        ],
        status: 'active',
        isFeatured: !!p.bestseller,
        badgeLabel: p.discount ? `Save ${p.discount}%` : undefined,
        viewCount: Math.floor(Math.random() * 500) + 120,
        whatsappNumber: '+8801700000000',
        price: p.price,
        originalPrice: p.originalPrice || undefined,
        discount: p.discount || 0,
        isPublished: true,
        bestseller: !!p.bestseller,
        new: !!p.new,
        avgRating: p.rating || 4.5,
        rating: p.rating || 4.5, // backward compatibility
        reviews: p.reviews || 10, // backward compatibility
        reviewCount: p.reviews || 10,
        totalSold: Math.floor(Math.random() * 80) + 10,
        ageMonthsMin: p.ageRange === '0-1' ? 0 : p.ageRange === '1-3' ? 12 : 36,
        ageMonthsMax: p.ageRange === '0-1' ? 12 : p.ageRange === '1-3' ? 36 : 144,
        ageRange: p.ageRange || 'all',
        safetyScore: 95,
        specifications: { material: 'Child-Safe ABS Plastic', origin: 'Handcrafted BD' },
        categories: [new mongoose.Types.ObjectId()], // Dummy category ID
        categoryId: p.categoryId,
        tags: p.tags || [],
        features: p.features || [],
        trustBadges: [
          { icon: 'shield', labelEn: '100% Child Safe', labelBn: '১০০% নিরাপদ', sortOrder: 1 },
          { icon: 'truck', labelEn: 'Free Delivery', labelBn: 'ফ্রি ডেলিভারি', sortOrder: 2 }
        ],
        relatedProducts: [],
        variants,
      };
    });

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`[Seeding] Created ${createdProducts.length} Products!`);

    // -------------------------------------------------------------
    // 3. SEED REVIEWS
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Customer Reviews...');
    const reviewsToCreate = [];
    for (let i = 0; i < 15; i++) {
      const targetProduct = createdProducts[i % createdProducts.length];
      reviewsToCreate.push({
        productId: targetProduct._id,
        userId: mockCustomerUserId,
        rating: (i % 2 === 0) ? 5 : 4,
        body: i % 2 === 0 
          ? 'Amazing quality toy! My baby plays with this block set all day. Highly recommended.' 
          : 'খুবই সুন্দর এবং নিরাপদ খেলনা। সোদায়োন প্রডাক্ট সত্যিই প্রিমিয়াম।',
        isVerified: true,
        images: ['https://placehold.co/400x400?text=CustomerReviewPhoto'],
        helpfulCount: Math.floor(Math.random() * 10),
        status: 'approved',
      });
    }
    const createdReviews = await Review.insertMany(reviewsToCreate);
    console.log(`[Seeding] Created ${createdReviews.length} Customer Reviews!`);

    // -------------------------------------------------------------
    // 4. SEED PRODUCT Q&A
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Product Q&As...');
    const qaToCreate = [];
    for (let i = 0; i < 10; i++) {
      const targetProduct = createdProducts[i % createdProducts.length];
      qaToCreate.push({
        productId: targetProduct._id,
        userId: mockCustomerUserId,
        answeredBy: mockStaffUserId,
        question: 'Is this toy made of non-toxic plastic? My child tends to put toys in their mouth.',
        answer: 'Yes! Sodayon toys are fully made of premium food-grade child-safe ABS non-toxic material. Fully safe for teething babies.',
        askedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        answeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isVisible: true,
        helpfulCount: i,
      });
    }
    const createdQA = await ProductQA.insertMany(qaToCreate);
    console.log(`[Seeding] Created ${createdQA.length} pre-purchase Q&As!`);

    // -------------------------------------------------------------
    // 5. SEED COUPONS
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Coupons...');
    const couponsData = [
      { code: 'SAVE10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 500, expiresAt: new Date('2028-12-31'), usageLimit: 500, usedCount: 12, isActive: true },
      { code: 'WELCOME500', discountType: 'FIXED_AMOUNT', discountValue: 500, minOrderValue: 2500, expiresAt: new Date('2028-12-31'), usageLimit: 100, usedCount: 5, isActive: true },
      { code: 'FREE60', discountType: 'FIXED_AMOUNT', discountValue: 60, minOrderValue: 0, expiresAt: new Date('2028-12-31'), usageLimit: 1000, usedCount: 42, isActive: true },
    ];
    const createdCoupons = await Coupon.insertMany(couponsData);
    console.log(`[Seeding] Created ${createdCoupons.length} Active Checkout Coupons!`);

    // -------------------------------------------------------------
    // 6. SEED COMBO TEMPLATES
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Combo Templates...');
    const combosData = [
      { titleEn: 'Early Development Bundle', titleBn: 'প্রারম্ভিক বিকাশ বান্ডেল', minItems: 2, maxItems: 3, discountPct: 15, isActive: true },
      { titleEn: 'STEM Engineering Set (Buy 3 get 20%)', titleBn: 'স্টেম ইঞ্জিনিয়ারিং সেট', minItems: 3, maxItems: 5, discountPct: 20, isActive: true },
    ];
    const createdCombos = await ComboTemplate.insertMany(combosData);
    console.log(`[Seeding] Created ${createdCombos.length} Bundle Combo templates!`);

    // -------------------------------------------------------------
    // 7. SEED FLASH DEALS
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Flash Deals...');
    const now = new Date();
    const ends = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    const dealsData = [];
    for (let i = 0; i < 5; i++) {
      const targetProduct = createdProducts[i];
      dealsData.push({
        productId: targetProduct._id,
        variantId: targetProduct.variants[0].sku,
        dealPrice: Math.round(targetProduct.price * 0.8), // 20% discount
        originalPrice: targetProduct.price,
        savePercent: 20,
        startsAt: now,
        endsAt: ends,
        stockLimit: 10,
        soldCount: 2,
        isLive: true,
      });
    }
    const createdDeals = await FlashDeal.insertMany(dealsData);
    console.log(`[Seeding] Created ${createdDeals.length} active live Flash Deals!`);

    // -------------------------------------------------------------
    // 8. SEED SPECIAL COLLECTIONS & COLLECTION ITEMS
    // -------------------------------------------------------------
    console.log('[Seeding] Creating Special Landing Collections...');
    const specialColData = [
      {
        titleEn: 'Interactive Toys Special Campaign',
        titleBn: 'ইন্টারঅ্যাক্টিভ খেলনা স্পেশাল ক্যাম্পেইন',
        badgeLabel: 'Featured 2026',
        bannerUrl: 'https://placehold.co/1200x400?text=Interactive+Toys+Banner',
        startsAt: now,
        endsAt: ends,
        isActive: true,
      }
    ];
    const createdSpecialCols = await SpecialCollection.insertMany(specialColData);
    const campaignId = createdSpecialCols[0]._id;

    // Link first 4 products to this campaign collection
    const itemsToCreate = [];
    for (let i = 0; i < 4; i++) {
      itemsToCreate.push({
        collectionId: campaignId,
        productId: createdProducts[i]._id,
        sortOrder: i + 1,
      });
    }
    const createdItems = await CollectionItem.insertMany(itemsToCreate);
    console.log(`[Seeding] Linked ${createdItems.length} products to Special Landing campaign!`);

    // -------------------------------------------------------------
    // 9. SEED DYNAMIC MENUS (Navbar & Footer Links with Nested Submenus)
    // -------------------------------------------------------------
    console.log('[Seeding] Populating Dynamic Menu Items...');
    
    // Create top-level Navbar items
    const homeNav = await MenuItem.create({ titleEn: 'Home', titleBn: 'হোম', url: '/', type: 'navbar', sortOrder: 1 });
    const shopNav = await MenuItem.create({ titleEn: 'Shop', titleBn: 'শপ', url: '/shop', type: 'navbar', sortOrder: 2 });
    const aiNav = await MenuItem.create({ titleEn: 'AI Tools', titleBn: 'এআই টুলস', url: '/ai-tools/gift-finder', type: 'navbar', sortOrder: 3 });
    const featNav = await MenuItem.create({ titleEn: 'Features', titleBn: 'ফিচারসমূহ', url: '/features', type: 'navbar', sortOrder: 4 });
    const blogNav = await MenuItem.create({ titleEn: 'Blog & Learn', titleBn: 'ব্লগ ও প্লে আইডিয়াস', url: '/blog', type: 'navbar', sortOrder: 5 });

    // Create sub-menus (child items) for "Shop" Mega Menu
    const shopChildren = [
      // কুইক লিংক (group: 'quick-links')
      { titleEn: 'View All', titleBn: 'সব খেলনা দেখুন', url: '/shop', type: 'navbar', parentId: shopNav._id, group: 'quick-links', sortOrder: 1 },
      { titleEn: 'Age Finder', titleBn: 'বয়স-ভিত্তিক ফাইন্ডার', url: '/shop/age', type: 'navbar', parentId: shopNav._id, group: 'quick-links', sortOrder: 2 },
      { titleEn: 'Flash Deals', titleBn: 'ফ্ল্যাশ ডিল', url: '/deals', type: 'navbar', parentId: shopNav._id, group: 'quick-links', sortOrder: 3 },
      { titleEn: 'Combo Offers', titleBn: 'কম্বো অফার', url: '/combo', type: 'navbar', parentId: shopNav._id, group: 'quick-links', sortOrder: 4 },

      // শীর্ষ ক্যাটাগরি (group: 'top-categories')
      { titleEn: 'Action Figures', titleBn: 'অ্যাকশন ফিগার', url: '/shop/categories/action-figures', type: 'navbar', parentId: shopNav._id, group: 'top-categories', sortOrder: 1 },
      { titleEn: 'Building Sets', titleBn: 'বিল্ডিং সেট', url: '/shop/categories/building-sets', type: 'navbar', parentId: shopNav._id, group: 'top-categories', sortOrder: 2 },
      { titleEn: 'Educational', titleBn: 'শিক্ষামূলক', url: '/shop/categories/educational', type: 'navbar', parentId: shopNav._id, group: 'top-categories', sortOrder: 3 },
      { titleEn: 'Dolls', titleBn: 'পুতুল ও ফিগার', url: '/shop/categories/dolls', type: 'navbar', parentId: shopNav._id, group: 'top-categories', sortOrder: 4 },
      { titleEn: 'Outdoor Play', titleBn: 'আউটডোর প্লে', url: '/shop/categories/outdoor', type: 'navbar', parentId: shopNav._id, group: 'top-categories', sortOrder: 5 },

      // শিশু পণ্য (group: 'baby-products')
      { titleEn: 'Baby Food', titleBn: 'শিশু খাবার', url: '/shop/baby-food', type: 'navbar', parentId: shopNav._id, group: 'baby-products', sortOrder: 1 },
      { titleEn: 'Baby Bags', titleBn: 'শিশু ব্যাগ', url: '/shop/baby-bags', type: 'navbar', parentId: shopNav._id, group: 'baby-products', sortOrder: 2 },
      { titleEn: 'Diapers', titleBn: 'ডায়াপার', url: '/shop/diapers', type: 'navbar', parentId: shopNav._id, group: 'baby-products', sortOrder: 3 },
      { titleEn: 'Baby Clothes', titleBn: 'শিশু পোশাক', url: '/shop/baby-clothes', type: 'navbar', parentId: shopNav._id, group: 'baby-products', sortOrder: 4 },
      { titleEn: 'Baby Care Hygiene', titleBn: 'শিশু যত্ন পণ্য', url: '/shop/baby-care', type: 'navbar', parentId: shopNav._id, group: 'baby-products', sortOrder: 5 },

      // প্রমো কার্ড (group: 'promo-card')
      { 
        titleEn: '20% Off on STEM Toys', 
        titleBn: 'স্টেম খেলনায় ২০% ছাড়', 
        url: '/shop/categories/educational', 
        type: 'navbar', 
        parentId: shopNav._id, 
        group: 'promo-card', 
        sortOrder: 1,
        badgeEn: 'Limited Time',
        badgeBn: 'সীমিত সময়',
        descriptionEn: 'Explore our new educational toolkit.',
        descriptionBn: 'আমাদের নতুন শিক্ষামূলক টুলকিট অন্বেষণ করুন।',
        ctaEn: 'Shop Now',
        ctaBn: 'শপ নাও'
      }
    ];
    const createdShopChildren = await MenuItem.insertMany(shopChildren);

    // Create sub-menus (child items) for "AI Tools" Dropdown Menu
    const aiChildren = [
      { titleEn: 'AI Gift Finder', titleBn: 'এআই গিফট ফাইন্ডার', url: '/ai-tools/gift-finder', type: 'navbar', parentId: aiNav._id, sortOrder: 1 },
      { titleEn: 'Parenting Assistant', titleBn: 'প্যারেন্টিং অ্যাসিস্ট্যান্ট', url: '/ai-tools/parenting-assistant', type: 'navbar', parentId: aiNav._id, sortOrder: 2 },
      { titleEn: 'Toy Comparison', titleBn: 'খেলনা তুলনা', url: '/ai-tools/compare', type: 'navbar', parentId: aiNav._id, sortOrder: 3 }
    ];
    const createdAiChildren = await MenuItem.insertMany(aiChildren);

    // Create Footer Links
    const footerItemsData = [
      // Footer - Quick Links (খেলনা কিনুন)
      { titleEn: 'View All', titleBn: 'সব দেখুন', url: '/shop', type: 'footer', group: 'quick-links', sortOrder: 1 },
      { titleEn: 'Categories', titleBn: 'ক্যাটাগরি', url: '/shop/categories', type: 'footer', group: 'quick-links', sortOrder: 2 },
      { titleEn: 'Flash Deals', titleBn: 'ফ্ল্যাশ ডিল', url: '/deals', type: 'footer', group: 'quick-links', sortOrder: 3 },
      { titleEn: 'Combo Offers', titleBn: 'কম্বো অফার', url: '/combo', type: 'footer', group: 'quick-links', sortOrder: 4 },

      // Footer - Baby Care (শিশু পণ্য)
      { titleEn: 'Baby Food', titleBn: 'শিশু খাবার', url: '/shop/baby-food', type: 'footer', group: 'baby-products', sortOrder: 1 },
      { titleEn: 'Baby Bags', titleBn: 'শিশু ব্যাগ', url: '/shop/baby-bags', type: 'footer', group: 'baby-products', sortOrder: 2 },
      { titleEn: 'Diapers', titleBn: 'ডায়াপার', url: '/shop/diapers', type: 'footer', group: 'baby-products', sortOrder: 3 },
      { titleEn: 'Baby Clothes', titleBn: 'শিশু পোশাক', url: '/shop/baby-clothes', type: 'footer', group: 'baby-products', sortOrder: 4 },
      { titleEn: 'Baby Care Hygiene', titleBn: 'শিশু যত্ন পণ্য', url: '/shop/baby-care', type: 'footer', group: 'baby-products', sortOrder: 5 },

      // Footer - AI Features (এআই ফিচারসমূহ)
      { titleEn: 'AI Gift Finder', titleBn: 'এআই গিফট ফাইন্ডার', url: '/ai-tools/gift-finder', type: 'footer', group: 'ai-features', sortOrder: 1 },
      { titleEn: 'Toy Recommendations', titleBn: 'খেলনা রিকমেন্ডেশন', url: '/ai-tools/recommendations', type: 'footer', group: 'ai-features', sortOrder: 2 },
      { titleEn: 'Safety Checker', titleBn: 'সেফটি চেকার', url: '/ai-tools/safety', type: 'footer', group: 'ai-features', sortOrder: 3 },
      { titleEn: 'Parenting Assistant', titleBn: 'প্যারেন্টিং অ্যাসিস্ট্যান্ট', url: '/ai-tools/parenting', type: 'footer', group: 'ai-features', sortOrder: 4 },

      // Footer - Support (সাপোর্ট)
      { titleEn: 'My Account', titleBn: 'আমার অ্যাকাউন্ট', url: '/profile', type: 'footer', group: 'support', sortOrder: 1 },
      { titleEn: 'Track Order', titleBn: 'অর্ডার ট্র্যাক করুন', url: '/profile/order-history', type: 'footer', group: 'support', sortOrder: 2 },
      { titleEn: 'Shipping & Return', titleBn: 'শিপিং ও রিটার্ন', url: '/shipping', type: 'footer', group: 'support', sortOrder: 3 },
      { titleEn: 'FAQ', titleBn: 'সাধারণ জিজ্ঞাসা', url: '/faq', type: 'footer', group: 'support', sortOrder: 4 },
      { titleEn: 'Contact Us', titleBn: 'যোগাযোগ করুন', url: '/contact', type: 'footer', group: 'support', sortOrder: 5 },
    ];
    const createdFooterItems = await MenuItem.insertMany(footerItemsData);
    const totalCount = 5 + createdShopChildren.length + createdAiChildren.length + createdFooterItems.length;
    console.log(`[Seeding] Created ${totalCount} dynamic nested hierarchical menu links!`);

    console.log('\n[SEEDING COMPLETED SUCCESSFULLY] Sodayon database upgraded to 100% ERD compliance!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seeding Error]', error);
    process.exit(1);
  }
};

seed();
