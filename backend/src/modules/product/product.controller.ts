import { Request, Response, NextFunction } from 'express';
import { Product } from './product.model';
import { Brand } from '../brand/brand.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';
import axios from 'axios';

// Get products with filters, sorting, and pagination
export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId, subcategoryId, ageRange, search, sort, limit = 20, page = 1, brand, isFeatured } = req.query;

  // Run dynamic price reversion check!
  await checkAndRevertExpiredDeals();

  const queryObj: any = {};

  // Public: Exclude drafts by default
  queryObj.status = 'active';

  if (categoryId) {
    if ((categoryId as string).match(/^[0-9a-fA-F]{24}$/)) {
      queryObj.categories = categoryId;
    } else {
      queryObj.categoryId = Number(categoryId);
    }
  }

  if (subcategoryId) {
    queryObj.subcategoryId = subcategoryId;
  }

  if (ageRange) {
    queryObj.ageRange = ageRange;
  }

  // Brand filter (supports either Brand ObjectId or SEO slug)
  if (brand) {
    if ((brand as string).match(/^[0-9a-fA-F]{24}$/)) {
      queryObj.brand = brand;
    } else {
      const foundBrand = await Brand.findOne({ slug: (brand as string).toLowerCase() });
      if (foundBrand) {
        queryObj.brand = foundBrand._id;
      } else {
        // If brand slug doesn't exist, return empty array immediately
        return res.status(200).json({
          success: true,
          results: 0,
          total: 0,
          page: Number(page),
          totalPages: 0,
          data: [],
        });
      }
    }
  }

  // Featured flag filter
  if (isFeatured !== undefined) {
    queryObj.isFeatured = isFeatured === 'true';
  }

  if (search) {
    queryObj.$or = [
      { nameEn: { $regex: search, $options: 'i' } },
      { nameBn: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search as string, 'i')] } },
      { descriptionEn: { $regex: search, $options: 'i' } },
    ];
  }

  // Build sorting options
  let sortBy = '-createdAt';
  if (sort === 'price-asc') sortBy = 'price';
  else if (sort === 'price-desc') sortBy = '-price';
  else if (sort === 'rating') sortBy = '-rating';
  else if (sort === 'viewCount') sortBy = '-viewCount'; // sorting by popular views!

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(queryObj)
    .populate('brand')
    .sort(sortBy)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    results: products.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: products,
  });
});

// Get single product (supports both Mongo Object ID and custom numericId, and increments viewCount)
export const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let product;
  const isMongoId = id.match(/^[0-9a-fA-F]{24}$/);

  // In getProductById, we increment viewCount by 1 and populate Brand!
  if (isMongoId) {
    product = await Product.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('brand');
  } else if (!isNaN(Number(id))) {
    product = await Product.findOneAndUpdate(
      { numericId: Number(id) },
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('brand');
  } else {
    // Slug-based lookup: treat the param as a product slug
    product = await Product.findOneAndUpdate(
      { slug: id },
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('brand');
  }

  if (!product) {
    return next(new ApiError(404, 'Product not found'));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Admin: Create product
export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Find highest numericId to auto-increment if not provided
  if (!req.body.numericId) {
    const lastProduct = await Product.findOne().sort('-numericId');
    req.body.numericId = (lastProduct && lastProduct.numericId) ? lastProduct.numericId + 1 : 1000;
  }

  // Ensure default variant settings and aliases
  if (req.body.variants && Array.isArray(req.body.variants)) {
    req.body.variants = req.body.variants.map((v: any) => ({
      ...v,
      stockQty: v.stockQty !== undefined ? v.stockQty : v.stock,
    }));
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// Admin: Update product
export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let product;
  const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { numericId: Number(id) };

  // Ensure stockQty aliases are in sync if updating variants
  if (req.body.variants && Array.isArray(req.body.variants)) {
    req.body.variants = req.body.variants.map((v: any) => ({
      ...v,
      stockQty: v.stockQty !== undefined ? v.stockQty : v.stock,
    }));
  }

  product = await Product.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ApiError(404, 'Product not found to update'));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Admin: Delete product
export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { numericId: Number(id) };

  const product = await Product.findOneAndDelete(filter);

  if (!product) {
    return next(new ApiError(404, 'Product not found to delete'));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Helper to check and revert expired deals dynamically in real-time
const checkAndRevertExpiredDeals = async () => {
  try {
    const now = new Date();
    // Find active products where dealEndsAt is in the past
    const expiredProducts = await Product.find({
      status: 'active',
      dealEndsAt: { $lt: now }
    });

    if (expiredProducts.length > 0) {
      for (const p of expiredProducts) {
        p.price = p.originalPrice || p.price;
        p.discount = 0;
        p.dealEndsAt = undefined; // Clear the deal timer
        await p.save();
      }
    }
  } catch (err) {
    console.error('Error reverting expired deals:', err);
  }
};

// Public: Get high-performance Quick Deals & Special Offers
export const getSpecialOffers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 20, page = 1 } = req.query;

  // Run dynamic price reversion check!
  await checkAndRevertExpiredDeals();

  const queryObj = {
    status: 'active',
    discount: { $gt: 0 }
  };

  const skip = (Number(page) - 1) * Number(limit);

  // High performance select projection: only pick what's required for cards!
  const offers = await Product.find(queryObj)
    .select('nameEn nameBn name price originalPrice discount image images avgRating rating reviewCount reviews status slug sku bestseller new ageMonthsMin ageMonthsMax ageRange')
    .sort('-discount') // Sort by highest discount first!
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(queryObj);

  res.status(200).json({
    success: true,
    results: offers.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: offers,
  });
});

// CSV parser helper function
function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [""];
  let insideQuote = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        row[row.length - 1] += '"';
        i++; // skip next quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      result.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    result.push(row);
  }
  return result;
}

// Protected: Parse product row from Google Sheet for autofill
export const parseGoogleSheetRow = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { sheetUrl, row } = req.body;

  if (!sheetUrl) {
    return next(new ApiError(400, "Google Sheets URL is required."));
  }

  // Extract spreadsheet ID using regex matching
  const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match || !match[1]) {
    return next(new ApiError(400, "Invalid Google Sheets URL format. Make sure it contains the spreadsheet ID."));
  }

  const spreadsheetId = match[1];
  const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;

  try {
    const response = await axios.get(csvUrl, { timeout: 10000 });
    const csvData = parseCSV(response.data);

    if (csvData.length < 2) {
      return next(new ApiError(400, "The Google Sheet must contain at least one header row and one product data row."));
    }

    // Determine row index to parse (Row 1 is header at index 0, Row 2 is first product at index 1, etc.)
    let rowIndex = 1;
    const requestedRow = parseInt(row, 10);
    if (!isNaN(requestedRow) && requestedRow >= 2) {
      rowIndex = requestedRow - 1;
    }

    if (rowIndex >= csvData.length) {
      return next(new ApiError(400, `The Google Sheet only has ${csvData.length} rows, but you requested Row ${requestedRow}.`));
    }

    const headers = csvData[0].map(h => h.trim().toLowerCase());
    const dataRow = csvData[rowIndex];

    const getValue = (keys: string[]) => {
      for (const key of keys) {
        const idx = headers.indexOf(key.toLowerCase());
        if (idx !== -1 && dataRow[idx] !== undefined) {
          return dataRow[idx].trim();
        }
      }
      return "";
    };

    const convertBengaliToEnglishDigits = (str: string): string => {
      if (typeof str !== 'string') return str;
      const banglaDigits: Record<string, string> = {
        '০':'0', '১':'1', '২':'2', '৩':'3', '৪':'4',
        '৫':'5', '৬':'6', '৭':'7', '৮':'8', '৯':'9'
      };
      return str.replace(/[০-৯]/g, d => banglaDigits[d] || d);
    };

    const cleanNumber = (keys: string[]): number => {
      const valStr = getValue(keys);
      if (!valStr) return 0;
      const englishDigits = convertBengaliToEnglishDigits(valStr);
      const normalized = englishDigits.replace(/,/g, '').trim();
      const parsed = parseFloat(normalized);
      return isNaN(parsed) ? 0 : parsed;
    };

    const rawImagesVal = getValue(["images", "image_urls", "image urls", "image", "img", "imageurl", "image url"]);
    const parsedImages = rawImagesVal ? rawImagesVal.split(/[\s,\|]+/).map(i => i.trim()).filter(Boolean) : [];
    const mainImage = parsedImages[0] || "https://sodayon.com/default-product.jpg";

    const parsedProduct = {
      sku: getValue(["sku", "code", "item code"]),
      slug: getValue(["slug"]),
      nameEn: getValue(["title", "name", "nameen", "titleen", "product name"]),
      nameBn: getValue(["titlebn", "namebn", "title bengali", "name bengali"]),
      descriptionEn: getValue(["description", "desc", "descriptionen", "descen"]),
      descriptionBn: getValue(["descriptionbn", "descbn", "description bengali", "desc bengali"]),
      brandEn: getValue(["brand", "branden", "brand english"]) || "Sodayon",
      brandBn: getValue(["brandbn", "brand bengali"]) || "সদায়ণ",
      price: cleanNumber(["price", "selling price", "price(৳)"]),
      originalPrice: cleanNumber(["originalprice", "strikeprice", "strike price", "original price"]),
      ageMonthsMin: cleanNumber(["age_min", "agemin", "min_age", "age min"]) || 12,
      ageMonthsMax: cleanNumber(["age_max", "agemax", "max_age", "age max"]) || 48,
      safetyScore: cleanNumber(["safety", "safety_score", "safety rating", "safety score"]) || 9,
      image: mainImage,
      images: parsedImages.length > 0 ? parsedImages : [mainImage],
      tags: getValue(["tags", "keywords"]) ? getValue(["tags", "keywords"]).split(",").map(t => t.trim()) : [],
      categoryName: getValue(["category", "categoryname", "category name", "parent category"]),
      subcategoryName: getValue(["subcategory", "subcategoryname", "subcategory name"]),

      // Play Personality mapping
      playPersonalityLabelEn: getValue(["play_personality_title", "playpersonalitytitle", "play personality english", "playpersonalitylabelen"]),
      playPersonalityLabelBn: getValue(["play_personality_titlebn", "playpersonalitytitlebn", "play personality bengali", "playpersonalitylabelbn"]),
      playPersonalityDescEn: getValue(["play_personality_desc", "playpersonalitydesc", "play personality desc english", "playpersonalitydescen"]),
      playPersonalityDescBn: getValue(["play_personality_descbn", "playpersonalitydescbn", "play personality desc bengali", "playpersonalitydescbnh"]),

      // Parent Playbook / Directions
      directionsEn: getValue(["directions", "directionsen", "playbook", "playbooken"]),
      directionsBn: getValue(["directionsbn", "playbookbn"]),

      // Developmental Benefits (up to 4 items)
      benefits: [
        {
          icon: getValue(["benefit1_icon"]) || "Brain",
          titleEn: getValue(["benefit1_title", "benefit1_titleen"]),
          titleBn: getValue(["benefit1_titlebn"]),
          descEn: getValue(["benefit1_desc", "benefit1_descen"]),
          descBn: getValue(["benefit1_descbn"])
        },
        {
          icon: getValue(["benefit2_icon"]) || "Lightbulb",
          titleEn: getValue(["benefit2_title", "benefit2_titleen"]),
          titleBn: getValue(["benefit2_titlebn"]),
          descEn: getValue(["benefit2_desc", "benefit2_descen"]),
          descBn: getValue(["benefit2_descbn"])
        },
        {
          icon: getValue(["benefit3_icon"]) || "Sparkles",
          titleEn: getValue(["benefit3_title", "benefit3_titleen"]),
          titleBn: getValue(["benefit3_titlebn"]),
          descEn: getValue(["benefit3_desc", "benefit3_descen"]),
          descBn: getValue(["benefit3_descbn"])
        },
        {
          icon: getValue(["benefit4_icon"]) || "Brain",
          titleEn: getValue(["benefit4_title", "benefit4_titleen"]),
          titleBn: getValue(["benefit4_titlebn"]),
          descEn: getValue(["benefit4_desc", "benefit4_descen"]),
          descBn: getValue(["benefit4_descbn"])
        }
      ].filter(b => b.titleEn || b.titleBn),

      // Package Items (up to 4 items)
      packageItems: [
        {
          count: getValue(["package1_count"]) || "১x",
          textEn: getValue(["package1_text", "package1_texten"]),
          textBn: getValue(["package1_textbn"]),
          detailsEn: getValue(["package1_details", "package1_detailsen"]),
          detailsBn: getValue(["package1_detailsbn"])
        },
        {
          count: getValue(["package2_count"]) || "১x",
          textEn: getValue(["package2_text", "package2_texten"]),
          textBn: getValue(["package2_textbn"]),
          detailsEn: getValue(["package2_details", "package2_detailsen"]),
          detailsBn: getValue(["package2_detailsbn"])
        },
        {
          count: getValue(["package3_count"]) || "১x",
          textEn: getValue(["package3_text", "package3_texten"]),
          textBn: getValue(["package3_textbn"]),
          detailsEn: getValue(["package3_details", "package3_detailsen"]),
          detailsBn: getValue(["package3_detailsbn"])
        },
        {
          count: getValue(["package4_count"]) || "১x",
          textEn: getValue(["package4_text", "package4_texten"]),
          textBn: getValue(["package4_textbn"]),
          detailsEn: getValue(["package4_details", "package4_detailsen"]),
          detailsBn: getValue(["package4_detailsbn"])
        }
      ].filter(p => p.textEn || p.textBn),

      // Specifications Mapping
      material: getValue(["material"]),
      dimensions: getValue(["dimensions"]),
      weight: getValue(["weight"]),
      battery: getValue(["battery", "battery_required"]),

      // Multiple YouTube Video Gallery Mapping
      videos: [
        {
          youtubeUrl: getValue(["video1_url", "video1_youtube", "video_url", "youtubeurl", "youtube"]),
          titleBn: getValue(["video1_titlebn", "video1_title", "video_titlebn"]) || "প্লে টিউটোরিয়াল",
          channelName: getValue(["video1_channel", "video_channel"]) || "Sodayon Toys",
          duration: getValue(["video1_duration", "video_duration"]) || "১০:০০"
        },
        {
          youtubeUrl: getValue(["video2_url", "video2_youtube"]),
          titleBn: getValue(["video2_titlebn", "video2_title"]) || "প্লে টিউটোরিয়াল",
          channelName: getValue(["video2_channel"]) || "Sodayon Toys",
          duration: getValue(["video2_duration"]) || "১০:০০"
        },
        {
          youtubeUrl: getValue(["video3_url", "video3_youtube"]),
          titleBn: getValue(["video3_titlebn", "video3_title"]) || "প্লে টিউটোরিয়াল",
          channelName: getValue(["video3_channel"]) || "Sodayon Toys",
          duration: getValue(["video3_duration"]) || "১০:০০"
        }
      ].filter(v => v.youtubeUrl && (v.youtubeUrl.includes("youtube.com") || v.youtubeUrl.includes("youtu.be") || v.youtubeUrl.includes("watch?v="))),

      // Multiple Color Variants Mapping
      variants: [
        {
          sku: getValue(["variant1_sku"]),
          nameEn: getValue(["variant1_name", "variant1_nameen"]) || getValue(["variant1_color"]) || `${getValue(["title", "name", "nameen", "titleen", "product name"]) || "Sodayon Toy"} Variant`,
          nameBn: getValue(["variant1_namebn"]) || getValue(["variant1_name", "variant1_nameen"]) || `${getValue(["titlebn", "namebn", "title bengali", "name bengali"]) || "সদায়ণ খেলনা"} - ${getValue(["variant1_color"]) || "সংস্করণ"}`,
          price: cleanNumber(["variant1_price"]),
          stock: cleanNumber(["variant1_stock"]) || 10,
          color: getValue(["variant1_color"]) || "Default"
        },
        {
          sku: getValue(["variant2_sku"]),
          nameEn: getValue(["variant2_name", "variant2_nameen"]) || getValue(["variant2_color"]) || `${getValue(["title", "name", "nameen", "titleen", "product name"]) || "Sodayon Toy"} Variant`,
          nameBn: getValue(["variant2_namebn"]) || getValue(["variant2_name", "variant2_nameen"]) || `${getValue(["titlebn", "namebn", "title bengali", "name bengali"]) || "সদায়ণ খেলনা"} - ${getValue(["variant2_color"]) || "সংস্করণ"}`,
          price: cleanNumber(["variant2_price"]),
          stock: cleanNumber(["variant2_stock"]) || 10,
          color: getValue(["variant2_color"]) || "Default"
        },
        {
          sku: getValue(["variant3_sku"]),
          nameEn: getValue(["variant3_name", "variant3_nameen"]) || getValue(["variant3_color"]) || `${getValue(["title", "name", "nameen", "titleen", "product name"]) || "Sodayon Toy"} Variant`,
          nameBn: getValue(["variant3_namebn"]) || getValue(["variant3_name", "variant3_nameen"]) || `${getValue(["titlebn", "namebn", "title bengali", "name bengali"]) || "সদায়ণ খেলনা"} - ${getValue(["variant3_color"]) || "সংস্করণ"}`,
          price: cleanNumber(["variant3_price"]),
          stock: cleanNumber(["variant3_stock"]) || 10,
          color: getValue(["variant3_color"]) || "Default"
        }
      ].filter(v => v.sku || v.color)
    };

    res.status(200).json({
      success: true,
      data: parsedProduct
    });
  } catch (err: any) {
    console.error("Error fetching Google Sheets CSV:", err.message);
    return next(new ApiError(400, `Failed to fetch Google Sheet. Please check the link sharing settings ("Anyone with the link can view").`));
  }
});
