"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/admin/AuthContext";
import {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetUISectionsQuery,
  useCreateUISectionMutation,
  useGetFlashSalesQuery,
  useCreateFlashSaleMutation,
  useUploadMediaMutation,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useParseGoogleSheetMutation,
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "@/store/admin/adminContentApi";
import { useGetMenuItemsQuery } from "@/store/user/menu/menuApi";
import {
  ShieldAlert,
  Edit3,
  Image as ImageIcon,
  LayoutTemplate,
  PlusCircle,
  Search,
  UploadCloud,
  Trash2,
  X,
  Plus,
  Save,
  Sliders,
  CheckCircle,
  Tag,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  Brain,
  Lightbulb,
  Package,
  Video,
  FileSpreadsheet
} from "lucide-react";

export default function ContentPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "ui-sections" | "campaigns" | "menus" | "banners">("products");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // RTK Queries
  const { data: prodData, isLoading: prodsLoading, refetch: refetchProds } = useGetAdminProductsQuery({ search: searchQuery });
  const { data: catData, refetch: refetchCats } = useGetCategoriesQuery({ tree: true });
  const { data: uiData, refetch: refetchUi } = useGetUISectionsQuery({ includeDrafts: true });
  const { data: campData, refetch: refetchCamps } = useGetFlashSalesQuery();

  // RTK Mutations
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadMedia, { isLoading: isUploadingImage }] = useUploadMediaMutation();

  const [createCategory, { isLoading: isCreatingCat }] = useCreateCategoryMutation();
  const [createUISection, { isLoading: isCreatingUi }] = useCreateUISectionMutation();
  const [createFlashSale, { isLoading: isCreatingCamp }] = useCreateFlashSaleMutation();
  const { data: menuData, refetch: refetchMenus } = useGetMenuItemsQuery();
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  // Hero Banners RTK Hooks
  const { data: bannerData, refetch: refetchBanners } = useGetAdminBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  // 6. HERO BANNER FORM STATE
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerType, setBannerType] = useState<"image" | "promo" | "overlay">("image");
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerBadge, setBannerBadge] = useState("");
  const [bannerBadgeLabel, setBannerBadgeLabel] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [bannerButtonText, setBannerButtonText] = useState("");
  const [bannerLink, setBannerLink] = useState("/shop");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerPromoImage, setBannerPromoImage] = useState("");
  const [bannerBgGradient, setBannerBgGradient] = useState("from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20");
  const [bannerSortOrder, setBannerSortOrder] = useState(0);
  const [bannerIsActive, setBannerIsActive] = useState(true);
  const [bannerFilter, setBannerFilter] = useState<"all" | "image" | "promo">("all");
  const [isUploadingBannerImage, setIsUploadingBannerImage] = useState(false);
  const [isUploadingPromoImage, setIsUploadingPromoImage] = useState(false);

  const handleAddBannerClick = (type: "image" | "promo" | "overlay" = "image") => {
    setEditingBannerId(null);
    setBannerType(type);
    setBannerTitle(type === "promo" ? "৳৬,০০০" : "");
    setBannerBadge(type === "promo" ? "৳৬,০০০" : "");
    setBannerBadgeLabel(type === "promo" ? "ছাড়!" : "");
    setBannerSubtitle(type === "promo" ? "ঈদের কেনাকাটায় দারুণ সারপ্রাইজ" : "");
    setBannerButtonText(type === "promo" ? "অফার দেখুন" : "");
    setBannerLink("/shop");
    setBannerImageUrl("");
    setBannerPromoImage("");
    setBannerBgGradient("from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20");
    setBannerSortOrder((bannerData?.data?.length || 0) + 1);
    setBannerIsActive(true);
    setIsBannerModalOpen(true);
  };

  const handleEditBannerClick = (b: any) => {
    setEditingBannerId(b._id || b.id);
    const inferredType = (b.type === "image" && (b.title || b.badge || b.subtitle || b.showOverlay))
      ? "overlay"
      : (b.type || "image");
    setBannerType(inferredType);
    setBannerTitle(b.title || b.badge || "");
    setBannerBadge(b.badge || b.title || "");
    setBannerBadgeLabel(b.badgeLabel || "");
    setBannerSubtitle(b.subtitle || "");
    setBannerButtonText(b.buttonText || "");
    setBannerLink(b.link || "/shop");
    setBannerImageUrl(b.imageUrl || "");
    setBannerPromoImage(b.promoImage || "");
    setBannerBgGradient(b.bgGradient || "from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20");
    setBannerSortOrder(b.sortOrder ?? 0);
    setBannerIsActive(b.isActive !== false);
    setIsBannerModalOpen(true);
  };

  const handleSubmitBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualType = bannerType === "promo" ? "promo" : "image";
    const isOverlay = bannerType === "overlay";
    const payload = {
      type: actualType,
      title: bannerType === "image" && !isOverlay ? undefined : (bannerTitle || bannerBadge || undefined),
      badge: bannerType === "image" && !isOverlay ? undefined : (bannerBadge || bannerTitle || undefined),
      badgeLabel: bannerType === "image" && !isOverlay ? undefined : (bannerBadgeLabel || undefined),
      subtitle: bannerType === "image" && !isOverlay ? undefined : (bannerSubtitle || undefined),
      buttonText: bannerType === "image" && !isOverlay ? undefined : (bannerButtonText || undefined),
      link: bannerLink || "/shop",
      imageUrl: bannerImageUrl || undefined,
      promoImage: bannerPromoImage || undefined,
      bgGradient: bannerBgGradient || undefined,
      showOverlay: isOverlay,
      sortOrder: Number(bannerSortOrder) || 0,
      isActive: bannerIsActive
    };

    try {
      if (editingBannerId) {
        await updateBanner({ id: editingBannerId, body: payload }).unwrap();
      } else {
        await createBanner(payload).unwrap();
      }
      refetchBanners();
      setIsBannerModalOpen(false);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to save hero banner.");
    }
  };

  const handleDeleteBannerClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero banner?")) return;
    try {
      await deleteBanner(id).unwrap();
      refetchBanners();
    } catch (err: any) {
      alert("Failed to delete banner.");
    }
  };

  // 5. DYNAMIC MENU FORM STATE
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuId, setEditingMenuId] = useState<string | null>(null);
  const [menuTitleEn, setMenuTitleEn] = useState("");
  const [menuTitleBn, setMenuTitleBn] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [menuType, setMenuType] = useState<"navbar" | "footer">("navbar");
  const [menuGroup, setMenuGroup] = useState("");
  const [menuSortOrder, setMenuSortOrder] = useState(0);
  const [menuParentId, setMenuParentId] = useState("");
  const [menuBadgeEn, setMenuBadgeEn] = useState("");
  const [menuBadgeBn, setMenuBadgeBn] = useState("");
  const [menuDescEn, setMenuDescEn] = useState("");
  const [menuDescBn, setMenuDescBn] = useState("");
  const [menuCtaEn, setMenuCtaEn] = useState("");
  const [menuCtaBn, setMenuCtaBn] = useState("");

  const handleAddMenuClick = () => {
    setEditingMenuId(null);
    setMenuTitleEn("");
    setMenuTitleBn("");
    setMenuUrl("");
    setMenuType("navbar");
    setMenuGroup("");
    setMenuSortOrder(0);
    setMenuParentId("");
    setMenuBadgeEn("");
    setMenuBadgeBn("");
    setMenuDescEn("");
    setMenuDescBn("");
    setMenuCtaEn("");
    setMenuCtaBn("");
    setIsMenuModalOpen(true);
  };

  const handleEditMenuClick = (item: any) => {
    setEditingMenuId(item._id);
    setMenuTitleEn(item.titleEn);
    setMenuTitleBn(item.titleBn);
    setMenuUrl(item.url);
    setMenuType(item.type);
    setMenuGroup(item.group || "");
    setMenuSortOrder(item.sortOrder || 0);
    setMenuParentId(item.parentId || "");
    setMenuBadgeEn(item.badgeEn || "");
    setMenuBadgeBn(item.badgeBn || "");
    setMenuDescEn(item.descriptionEn || "");
    setMenuDescBn(item.descriptionBn || "");
    setMenuCtaEn(item.ctaEn || "");
    setMenuCtaBn(item.ctaBn || "");
    setIsMenuModalOpen(true);
  };

  const handleSubmitMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuTitleEn || !menuTitleBn || !menuUrl) {
      alert("Please enter all mandatory fields.");
      return;
    }

    const payload = {
      titleEn: menuTitleEn,
      titleBn: menuTitleBn,
      url: menuUrl,
      type: menuType,
      parentId: menuParentId || undefined,
      group: menuGroup || undefined,
      sortOrder: Number(menuSortOrder),
      badgeEn: menuBadgeEn || undefined,
      badgeBn: menuBadgeBn || undefined,
      descriptionEn: menuDescEn || undefined,
      descriptionBn: menuDescBn || undefined,
      ctaEn: menuCtaEn || undefined,
      ctaBn: menuCtaBn || undefined,
    };

    try {
      if (editingMenuId) {
        await updateMenuItem({ id: editingMenuId, body: payload }).unwrap();
      } else {
        await createMenuItem(payload).unwrap();
      }
      refetchMenus();
      setIsMenuModalOpen(false);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to save menu link.");
    }
  };

  // Modals States
  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isUiModalOpen, setIsUiModalOpen] = useState(false);
  const [isCampModalOpen, setIsCampModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // 1. PRODUCT FORM STATE (Supports Create & Update)
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formSku, setFormSku] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameBn, setFormNameBn] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formDescBn, setFormDescBn] = useState("");
  const [formBrandEn, setFormBrandEn] = useState("");
  const [formBrandBn, setFormBrandBn] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState(0);
  const [formDealEndsAt, setFormDealEndsAt] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetRow, setSheetRow] = useState<number | "">(2);
  const [parseGoogleSheet, { isLoading: isAutofilling }] = useParseGoogleSheetMutation();
  const handleAutofill = async () => {
    if (!sheetUrl) {
      alert("Please paste a valid Google Sheets URL first.");
      return;
    }
    try {
      const res = await parseGoogleSheet({ sheetUrl, row: sheetRow || 2 }).unwrap();
      if (res.success && res.data) {
        const d = res.data;
        if (d.sku) setFormSku(d.sku);
        if (d.slug) setFormSlug(d.slug);
        if (d.nameEn) setFormNameEn(d.nameEn);
        if (d.nameBn) setFormNameBn(d.nameBn);
        if (d.descriptionEn) setFormDescEn(d.descriptionEn);
        if (d.descriptionBn) setFormDescBn(d.descriptionBn);
        if (d.brandEn) setFormBrandEn(d.brandEn);
        if (d.brandBn) setFormBrandBn(d.brandBn);
        if (d.price !== undefined) setFormPrice(d.price);
        if (d.originalPrice !== undefined) setFormOriginalPrice(d.originalPrice);
        if (d.ageMonthsMin !== undefined) setFormAgeMin(d.ageMonthsMin);
        if (d.ageMonthsMax !== undefined) setFormAgeMax(d.ageMonthsMax);
        if (d.safetyScore !== undefined) setFormSafetyScore(d.safetyScore);
        if (d.tags) setFormTags(d.tags);

        // Multiple Images Bindings
        if (d.images && d.images.length > 0) {
          setFormImages(d.images);
        } else if (d.image) {
          setFormImages([d.image]);
        }

        // Auto-match Sodayon categories & subcategories tree by name!
        let matchedCat: any = null;
        if (d.categoryName && catData?.data) {
          matchedCat = catData.data.find((c: any) => 
            c.nameEn?.toLowerCase() === d.categoryName.toLowerCase() ||
            c.nameBn?.toLowerCase() === d.categoryName.toLowerCase() ||
            c.slug?.toLowerCase() === d.categoryName.toLowerCase()
          );
          if (matchedCat) {
            setFormCategory(matchedCat._id || matchedCat.id);
          }
        }

        if (d.subcategoryName && matchedCat?.subcategories) {
          const matchedSub = matchedCat.subcategories.find((s: any) =>
            s.nameEn?.toLowerCase() === d.subcategoryName.toLowerCase() ||
            s.nameBn?.toLowerCase() === d.subcategoryName.toLowerCase() ||
            s.slug?.toLowerCase() === d.subcategoryName.toLowerCase()
          );
          if (matchedSub) {
            setFormSubcategory(matchedSub._id || matchedSub.id);
          }
        }

        // Play Personality states
        if (d.playPersonalityLabelEn) setFormPlayPersonalityLabelEn(d.playPersonalityLabelEn);
        if (d.playPersonalityLabelBn) setFormPlayPersonalityLabelBn(d.playPersonalityLabelBn);
        if (d.playPersonalityDescEn) setFormPlayPersonalityDescEn(d.playPersonalityDescEn);
        if (d.playPersonalityDescBn) setFormPlayPersonalityDescBn(d.playPersonalityDescBn);

        // Directions / Playbook
        if (d.directionsEn) setFormDirectionsEn(d.directionsEn);
        if (d.directionsBn) setFormDirectionsBn(d.directionsBn);

        // Developmental Benefits
        if (d.benefits && d.benefits.length > 0) {
          setFormBenefits(d.benefits);
        }

        // Package Items
        if (d.packageItems && d.packageItems.length > 0) {
          setFormPackageItems(d.packageItems);
        }

        // Specifications
        const parsedSpecs = [
          { key: "material", val: d.material || "Cotton Canvas" },
          { key: "dimensions", val: d.dimensions || "120 x 120 x 140 cm" }
        ];
        if (d.weight) parsedSpecs.push({ key: "weight", val: d.weight });
        if (d.battery) parsedSpecs.push({ key: "battery", val: d.battery });
        setSpecs(parsedSpecs);

        // Multiple Videos Gallery Bindings
        if (d.videos && d.videos.length > 0) {
          setFormVideos(d.videos);
        } else if (d.youtubeUrl) {
          setFormVideos([
            {
              youtubeUrl: d.youtubeUrl,
              titleBn: "প্লে টিউটোরিয়াল",
              channelName: "Sodayon TV",
              duration: "১০:০০"
            }
          ]);
        }

        // Multiple Variation Matrix Bindings
        if (d.variants && d.variants.length > 0) {
          setVariants(d.variants);
        }

        alert("Modal fields successfully pre-populated from Google Sheet!");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.data?.message || "Failed to fetch and parse Google Sheet. Make sure 'Anyone with the link can view' is enabled.");
    }
  };
  const [formAgeMin, setFormAgeMin] = useState(12);
  const [formAgeMax, setFormAgeMax] = useState(48);
  const [formSafetyScore, setFormSafetyScore] = useState(9);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState("");
  const [formSubcategory, setFormSubcategory] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>([
    { key: "material", val: "Cotton Canvas" },
    { key: "dimensions", val: "120 x 120 x 140 cm" }
  ]);
  const [variants, setVariants] = useState<{ sku: string; nameEn: string; nameBn: string; price: number; stock: number; color: string }[]>([
    { sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }
  ]);

  // Dynamic visual/specialized fields
  const [formPlayPersonalityLabelEn, setFormPlayPersonalityLabelEn] = useState("");
  const [formPlayPersonalityLabelBn, setFormPlayPersonalityLabelBn] = useState("");
  const [formPlayPersonalityDescEn, setFormPlayPersonalityDescEn] = useState("");
  const [formPlayPersonalityDescBn, setFormPlayPersonalityDescBn] = useState("");

  const [formBenefits, setFormBenefits] = useState<{ icon: string; titleEn: string; titleBn: string; descEn: string; descBn: string }[]>([]);
  const [formPackageItems, setFormPackageItems] = useState<{ count: string; textEn: string; textBn: string; detailsEn?: string; detailsBn?: string }[]>([]);
  
  const [formDirectionsEn, setFormDirectionsEn] = useState("");
  const [formDirectionsBn, setFormDirectionsBn] = useState("");

  const [formVideos, setFormVideos] = useState<{ youtubeUrl: string; titleBn?: string; channelName?: string; duration?: string }[]>([]);

  // 2. CATEGORY FORM STATE
  const [catSlug, setCatSlug] = useState("");
  const [catNameEn, setCatNameEn] = useState("");
  const [catNameBn, setCatNameBn] = useState("");
  const [catParentId, setCatParentId] = useState("");
  const [catShowMega, setCatShowMega] = useState(true);
  const [catShowDrop, setCatShowDrop] = useState(true);
  const [catSort, setCatSort] = useState(1);

  // 3. UI SECTION FORM STATE
  const [uiType, setUiType] = useState("QUICK_DEAL");
  const [uiTitleEn, setUiTitleEn] = useState("");
  const [uiTitleBn, setUiTitleBn] = useState("");
  const [uiStyle, setUiStyle] = useState("GRID");
  const [uiMaxItems, setUiMaxItems] = useState(8);
  const [uiBannerImage, setUiBannerImage] = useState("");
  const [uiBannerLink, setUiBannerLink] = useState("");

  // 4. CAMPAIGN FORM STATE
  const [campTitleEn, setCampTitleEn] = useState("");
  const [campTitleBn, setCampTitleBn] = useState("");
  const [campStart, setCampStart] = useState("");
  const [campEnd, setCampEnd] = useState("");

  if (!user) return null;

  if (!user.permissions.canManageContent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Content Module Secured</h1>
        <p className="text-slate-400 max-w-md">
          Editing inventory and website design modules requires the <span className="text-primary-400 font-bold">CONTENT_MANAGER</span> role. You are currently logged in as <span className="font-bold">{user.role}</span>.
        </p>
      </div>
    );
  }

  // Handle image file upload to Cloudinary via backend upload endpoint
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadMedia(formData).unwrap();
      if (response.success && response.url) {
        setFormImages((prev) => [...prev, response.url]);
      }
    } catch (err) {
      alert("Failed to upload image. Please try again.");
    }
  };

  // Add/Remove Spec rows
  const addSpecRow = () => setSpecs([...specs, { key: "", val: "" }]);
  const removeSpecRow = (idx: number) => setSpecs(specs.filter((_, i) => i !== idx));

  // Add/Remove Variant rows
  const addVariantRow = () => setVariants([...variants, { sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }]);
  const removeVariantRow = (idx: number) => setVariants(variants.filter((_, i) => i !== idx));

  // Launch Product in Edit Mode
  const handleEditProductClick = (p: any) => {
    setEditingProductId(p.id || p._id);
    setFormSku(p.sku || "");
    setFormSlug(p.slug || "");
    setFormNameEn(p.nameEn || p.name || "");
    setFormNameBn(p.nameBn || "");
    setFormDescEn(p.descriptionEn || p.description || "");
    setFormDescBn(p.descriptionBn || "");
    setFormBrandEn(p.brandEn || "");
    setFormBrandBn(p.brandBn || "");
    setFormPrice(p.price || 0);
    setFormOriginalPrice(p.originalPrice || p.price || 0);
    setFormDealEndsAt(p.dealEndsAt ? new Date(p.dealEndsAt).toISOString().slice(0, 16) : "");
    setFormAgeMin(p.ageMonthsMin || 12);
    setFormAgeMax(p.ageMonthsMax || 48);
    setFormSafetyScore(p.safetyScore || 9);
    setFormImages(p.images || [p.image] || []);

    // Hierarchical parsing for Category and Subcategory
    const selectedCats = p.categories || [];
    const flatCategories = catData?.data || [];
    const parentCat = selectedCats.find((catId: string) => {
      const cat = flatCategories.find((c: any) => (c._id === catId || c.id === catId));
      return cat && !cat.parentId;
    }) || selectedCats[0] || "";

    const subCat = selectedCats.find((catId: string) => {
      const cat = flatCategories.find((c: any) => (c._id === catId || c.id === catId));
      return cat && cat.parentId;
    }) || "";

    setFormCategory(parentCat);
    setFormSubcategory(subCat);

    setFormTags(p.tags || []);
    
    // Load specifications
    if (p.specifications) {
      const loadedSpecs = Object.entries(p.specifications).map(([key, val]) => ({ key, val: String(val) }));
      setSpecs(loadedSpecs.length > 0 ? loadedSpecs : [{ key: "", val: "" }]);
    } else {
      setSpecs([{ key: "", val: "" }]);
    }

    // Load variants
    if (p.variants && p.variants.length > 0) {
      const loadedVariants = p.variants.map((v: any) => ({
        sku: v.sku || "",
        nameEn: v.nameEn || "",
        nameBn: v.nameBn || "",
        price: v.price || p.price,
        stock: v.stock || 0,
        color: v.options?.color || ""
      }));
      setVariants(loadedVariants);
    } else {
      setVariants([{ sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }]);
    }

    // Load dynamic visual components
    setFormPlayPersonalityLabelEn(p.playPersonality?.labelEn || "");
    setFormPlayPersonalityLabelBn(p.playPersonality?.labelBn || "");
    setFormPlayPersonalityDescEn(p.playPersonality?.descEn || "");
    setFormPlayPersonalityDescBn(p.playPersonality?.descBn || "");

    setFormBenefits(p.benefits || []);
    setFormPackageItems(p.packageItems || []);
    setFormDirectionsEn(p.directionsEn || "");
    setFormDirectionsBn(p.directionsBn || "");
    setFormVideos(p.videos || []);

    setIsProdModalOpen(true);
  };

  // Launch fresh Add Product form
  const handleAddProductClick = () => {
    setEditingProductId(null);
    setFormSku("");
    setFormSlug("");
    setFormNameEn("");
    setFormNameBn("");
    setFormDescEn("");
    setFormDescBn("");
    setFormBrandEn("");
    setFormBrandBn("");
    setFormPrice(0);
    setFormOriginalPrice(0);
    setFormDealEndsAt("");
    setFormAgeMin(12);
    setFormAgeMax(48);
    setFormSafetyScore(9);
    setFormImages([]);
    setFormCategory("");
    setFormSubcategory("");
    setFormTags([]);
    setSpecs([
      { key: "material", val: "Cotton Canvas" },
      { key: "dimensions", val: "120 x 120 x 140 cm" }
    ]);
    setVariants([{ sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }]);

    // Reset dynamic visual components
    setFormPlayPersonalityLabelEn("");
    setFormPlayPersonalityLabelBn("");
    setFormPlayPersonalityDescEn("");
    setFormPlayPersonalityDescBn("");
    setFormBenefits([]);
    setFormPackageItems([]);
    setFormDirectionsEn("");
    setFormDirectionsBn("");
    setFormVideos([]);

    setIsProdModalOpen(true);
  };

  // Submit Product Form (Handles Create or Update)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSku || !formNameEn || !formNameBn || !formPrice) {
      alert("Please enter mandatory core fields.");
      return;
    }

    const specificationsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key) specificationsObj[s.key] = s.val;
    });

    const cleanedVariants = variants
      .filter((v) => v.sku && v.nameEn)
      .map((v) => ({
        sku: v.sku,
        nameEn: v.nameEn,
        nameBn: v.nameBn,
        price: v.price || formPrice,
        stock: v.stock,
        images: formImages,
        options: { color: v.color }
      }));

    const categoriesArray = [formCategory, formSubcategory].filter(Boolean);

    const finalPayload = {
      sku: formSku,
      slug: formSlug || formNameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: formNameEn,
      nameEn: formNameEn,
      nameBn: formNameBn,
      description: formDescEn,
      descriptionEn: formDescEn,
      descriptionBn: formDescBn,
      brandEn: formBrandEn || "Sodayon",
      brandBn: formBrandBn || "সদায়ণ",
      price: formPrice,
      originalPrice: formOriginalPrice || formPrice,
      discount: formOriginalPrice ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100) : 0,
      dealEndsAt: formDealEndsAt ? new Date(formDealEndsAt).toISOString() : undefined,
      image: formImages[0] || "https://sodayon.com/default-product.jpg",
      images: formImages.length > 0 ? formImages : ["https://sodayon.com/default-product.jpg"],
      ageMonthsMin: formAgeMin,
      ageMonthsMax: formAgeMax,
      ageRange: `${Math.floor(formAgeMin/12)}-${Math.floor(formAgeMax/12)}`,
      safetyScore: formSafetyScore,
      tags: formTags,
      categories: categoriesArray,
      specifications: specificationsObj,
      variants: cleanedVariants,
      playPersonality: {
        labelEn: formPlayPersonalityLabelEn,
        labelBn: formPlayPersonalityLabelBn,
        descEn: formPlayPersonalityDescEn,
        descBn: formPlayPersonalityDescBn
      },
      benefits: formBenefits,
      packageItems: formPackageItems,
      directionsEn: formDirectionsEn,
      directionsBn: formDirectionsBn,
      videos: formVideos
    };

    try {
      if (editingProductId) {
        await updateProduct({ id: editingProductId, body: finalPayload }).unwrap();
      } else {
        await createProduct(finalPayload).unwrap();
      }
      setUploadSuccess(true);
      refetchProds();
      setTimeout(() => {
        setIsProdModalOpen(false);
        setUploadSuccess(false);
      }, 1200);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to submit product.");
    }
  };

  // Submit Category Form
  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catSlug || !catNameEn || !catNameBn) {
      alert("Please fill in category slug and titles.");
      return;
    }

    const payload = {
      slug: catSlug,
      nameEn: catNameEn,
      nameBn: catNameBn,
      parentId: catParentId || undefined,
      showInMegaMenu: catShowMega,
      showInDropdown: catShowDrop,
      sortOrder: Number(catSort)
    };

    try {
      await createCategory(payload).unwrap();
      refetchCats();
      setIsCatModalOpen(false);
      setCatSlug("");
      setCatNameEn("");
      setCatNameBn("");
      setCatParentId("");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create category node.");
    }
  };

  // Submit UI Section Form
  const handleSubmitUISection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uiTitleEn || !uiTitleBn) {
      alert("Please provide visual section titles.");
      return;
    }

    const payload = {
      type: uiType,
      titleEn: uiTitleEn,
      titleBn: uiTitleBn,
      layoutStyle: uiStyle,
      maxItems: Number(uiMaxItems),
      bannerImageEn: uiBannerImage || undefined,
      bannerLink: uiBannerLink || undefined,
      gridColsResponsive: { xs: 2, md: 3, lg: 4 }
    };

    try {
      await createUISection(payload).unwrap();
      refetchUi();
      setIsUiModalOpen(false);
      setUiTitleEn("");
      setUiTitleBn("");
      setUiBannerImage("");
      setUiBannerLink("");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create UI Section.");
    }
  };

  // Submit Flash Sale Campaign
  const handleSubmitCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitleEn || !campTitleBn || !campStart || !campEnd) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      titleEn: campTitleEn,
      titleBn: campTitleBn,
      startDate: new Date(campStart).toISOString(),
      endDate: new Date(campEnd).toISOString(),
      isActive: true
    };

    try {
      await createFlashSale(payload).unwrap();
      refetchCamps();
      setIsCampModalOpen(false);
      setCampTitleEn("");
      setCampTitleBn("");
      setCampStart("");
      setCampEnd("");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create Campaign.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* CMS Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Edit3 className="h-8 w-8 text-amber-400" />
            Content & Product CMS
          </h1>
          <p className="text-slate-400 mt-1">Manage visual layout blocks, categorizations, and catalog inventories.</p>
        </div>
        
        {/* Dynamic Context Actions */}
        <div className="flex gap-2">
          {activeTab === "products" && (
            <button
              onClick={handleAddProductClick}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Add Product
            </button>
          )}
          {activeTab === "categories" && (
            <button
              onClick={() => setIsCatModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Layers className="h-5 w-5" />
              Add Category
            </button>
          )}
          {activeTab === "ui-sections" && (
            <button
              onClick={() => setIsUiModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <LayoutTemplate className="h-5 w-5" />
              Add UI Section
            </button>
          )}
          {activeTab === "campaigns" && (
            <button
              onClick={() => setIsCampModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              Schedule Sale
            </button>
          )}
          {activeTab === "menus" && (
            <button
              onClick={handleAddMenuClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Add Menu Link
            </button>
          )}
          {activeTab === "banners" && (
            <button
              onClick={() => handleAddBannerClick("image")}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Add Hero Banner
            </button>
          )}
        </div>
      </div>

      {/* Tabs System */}
      <div className="flex gap-2 border-b border-slate-850 overflow-x-auto">
        <button
          onClick={() => setActiveTab("products")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "products" ? "border-amber-500 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Plus className="h-4 w-4" />
          Catalogue ({prodData?.total || 0})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "categories" ? "border-emerald-500 text-emerald-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Layers className="h-4 w-4" />
          Taxonomy Tree
        </button>
        <button
          onClick={() => setActiveTab("banners")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "banners" ? "border-rose-500 text-rose-400 bg-slate-900/50 shadow-sm" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl relative`}
        >
          <ImageIcon className="h-4 w-4 text-rose-500" />
          Hero Banners ({bannerData?.count ?? bannerData?.data?.length ?? 0})
          <span className="bg-rose-500/20 text-rose-400 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">Slider</span>
        </button>
        <button
          onClick={() => setActiveTab("ui-sections")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "ui-sections" ? "border-blue-500 text-blue-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <LayoutTemplate className="h-4 w-4" />
          Homepage Designs ({uiData?.results || 0})
        </button>
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "campaigns" ? "border-purple-500 text-purple-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Calendar className="h-4 w-4" />
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab("menus")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "menus" ? "border-indigo-500 text-indigo-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Sliders className="h-4 w-4" />
          Navigation Menus ({menuData?.count || 0})
        </button>
      </div>

      {/* =========================================================
          TAB 1: PRODUCTS INVENTORY CATALOG
          ========================================================= */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Live Stock Listings
              </h2>
              {/* Searching Catalog */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Scan SKU or Name..."
                  className="w-full bg-slate-950 border border-slate-800 py-2.5 pl-4 pr-10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>

            {prodsLoading ? (
              <div className="py-24 text-center text-slate-500 text-sm animate-pulse">Loading catalogue items...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-2">Thumb</th>
                      <th className="py-3 px-2">SKU Code</th>
                      <th className="py-3 px-2">Product Name</th>
                      <th className="py-3 px-2 text-right">Price</th>
                      <th className="py-3 px-2 text-center">Variants</th>
                      <th className="py-3 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prodData?.data?.map((p: any) => (
                      <tr key={p.id || p._id} className="border-b border-slate-850 hover:bg-slate-850/30 transition-colors group">
                        <td className="py-3 px-2">
                          <img
                            src={p.image || "https://sodayon.com/default-product.jpg"}
                            alt={p.nameEn}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-800 bg-slate-950"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-bold text-slate-200">{p.sku}</div>
                          <div className="text-[10px] text-slate-500">ID: {p.numericId || "N/A"}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">{p.nameEn}</div>
                          <div className="text-[10px] text-slate-400 font-bengali mt-0.5">{p.nameBn}</div>
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-emerald-400">
                          ৳{p.price}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                            {p.variants?.length || 0}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="text-amber-500 hover:text-white p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this product permanently?")) {
                                  deleteProduct(p.id || p._id);
                                }
                              }}
                              className="text-red-500 hover:text-white p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Inventory Summary</h2>
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Products</div>
                    <div className="text-3xl font-black text-white mt-1">{prodData?.total || 0}</div>
                  </div>
                  <Plus className="h-8 w-8 text-slate-700" />
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Taxonomies</div>
                    <div className="text-3xl font-black text-emerald-500 mt-1">{catData?.results || 0}</div>
                  </div>
                  <Layers className="h-8 w-8 text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: CATEGORY SUBSYSTEM
          ========================================================= */}
      {activeTab === "categories" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-500 h-5 w-5" />
            Categories Taxonomy Tree
          </h2>
          
          <div className="space-y-4">
            {catData?.data?.map((c: any) => (
              <div key={c.id || c._id} className="border border-slate-850 p-4 rounded-2xl bg-slate-950/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-emerald-400">
                      {c.nameEn[0]}
                    </div>
                    <div>
                      <span className="font-bold text-white">{c.nameEn}</span>
                      <span className="text-xs text-slate-400 font-bengali ml-2">({c.nameBn})</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Root</span>
                </div>
                
                {/* Secondary subcategories */}
                {c.children && c.children.length > 0 && (
                  <div className="pl-10 mt-3 border-l border-slate-800 space-y-2">
                    {c.children.map((child: any) => (
                      <div key={child.id || child._id} className="flex justify-between items-center text-xs py-2 border-b border-slate-900/60 last:border-0 hover:bg-slate-900/20 px-2 rounded-lg">
                        <div>
                          <span className="text-slate-200 font-semibold">{child.nameEn}</span>
                          <span className="text-slate-400 font-bengali ml-2">({child.nameBn})</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Slug: {child.slug}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: HOMEPAGE VISUAL SECTIONS
          ========================================================= */}
      {activeTab === "ui-sections" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <LayoutTemplate className="text-blue-500 h-5 w-5" />
                Homepage Dynamic UI Grid Blocks (কন্টেন্ট গ্রিড ব্লক)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage dynamic collection blocks and product grids on the homepage.
              </p>
            </div>
            <button
              onClick={() => setIsUiModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add UI Section
            </button>
          </div>

          {/* Quick Notice for Hero Banners */}
          <div className="bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Looking to add / edit the top rotating Hero Banners?</h4>
                <p className="text-[11px] text-slate-400">Manage image and promo sliders displayed at the top of your homepage under the <strong>Hero Banners</strong> tab.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("banners")}
              className="shrink-0 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Go to Hero Banners
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uiData?.data?.map((sec: any) => (
              <div key={sec.id || sec._id} className="border border-slate-800 rounded-2xl p-5 bg-slate-950/40 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{sec.titleEn}</h3>
                    <p className="text-xs font-bengali text-slate-400 mt-0.5">{sec.titleBn}</p>
                  </div>
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    {sec.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                  <div>
                    <span className="text-slate-500 font-bold block">Layout Style</span>
                    <span className="text-slate-300 font-semibold">{sec.layoutStyle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Max Items Cap</span>
                    <span className="text-slate-300 font-semibold">{sec.maxItems} items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: SCHEDULED CAMPAIGNS
          ========================================================= */}
      {activeTab === "campaigns" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="text-purple-500 h-5 w-5" />
            Active Scheduled Campaigns
          </h2>

          <div className="space-y-4">
            {campData?.data?.map((camp: any) => (
              <div key={camp.id || camp._id} className="border border-slate-850 p-5 rounded-2xl bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white">{camp.titleEn}</h3>
                  <p className="text-xs font-bengali text-slate-400 mt-0.5">{camp.titleBn}</p>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider">Campaign Run</span>
                    <span className="text-slate-300 font-semibold">
                      {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: DYNAMIC MENUS (NAV & FOOTER LINKS)
          ========================================================= */}
      {activeTab === "menus" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="text-indigo-500 h-5 w-5" />
            Navigation Items & Footer Links
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">English Title</th>
                  <th className="py-3 px-2">Bengali Title</th>
                  <th className="py-3 px-2">Target Href (URL)</th>
                  <th className="py-3 px-2">Placement Target</th>
                  <th className="py-3 px-2">Parent Link</th>
                  <th className="py-3 px-2">Group / Column</th>
                  <th className="py-3 px-2 text-center">Sort Order</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuData?.data?.map((item: any) => (
                  <tr key={item._id} className="border-b border-slate-850 hover:bg-slate-850/30 transition-colors group">
                    <td className="py-3 px-2 font-semibold text-white">
                      {item.titleEn}
                    </td>
                    <td className="py-3 px-2 text-slate-200 font-bengali">
                      {item.titleBn}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-400">
                      {item.url}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.type === 'navbar' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {item.parentId ? (
                        <span className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded font-medium">
                          {menuData?.data?.find((p: any) => p._id === item.parentId)?.titleBn || 'Parent'}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-slate-400">
                      {item.group || '—'}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-300">
                      {item.sortOrder}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditMenuClick(item)}
                          className="text-indigo-500 hover:text-white p-2 hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Edit Menu Link"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this menu item permanently?")) {
                              try {
                                await deleteMenuItem(item._id).unwrap();
                                refetchMenus();
                              } catch (err: any) {
                                alert("Failed to delete menu item.");
                              }
                            }
                          }}
                          className="text-red-500 hover:text-white p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Menu Link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: HERO BANNERS MANAGEMENT
          ========================================================= */}
      {activeTab === "banners" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-rose-500" />
                Hero Section Image & Promo Banners (হোমপেজ হিরো ব্যানার সমূহের তালিকা)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Manage the rotating carousel banners on your customer homepage hero section. Supports both <strong>Without Title (Full Image Graphic)</strong> and <strong>With Title (Promo Text + Cutout)</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleAddBannerClick("image")}
                className="bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <PlusCircle className="h-4 w-4 text-rose-400" />
                + Pure Image Banner (Without Title)
              </button>
              <button
                onClick={() => handleAddBannerClick("promo")}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-rose-600/20"
              >
                <Sparkles className="h-4 w-4" />
                + Promo Banner (With Title)
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
            <button
              onClick={() => setBannerFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                bannerFilter === "all" ? "bg-rose-600 text-white" : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Banners ({bannerData?.data?.length || 0})
            </button>
            <button
              onClick={() => setBannerFilter("image")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                bannerFilter === "image" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              🖼️ Full Image Only ({bannerData?.data?.filter((b: any) => b.type === "image" && !b.title && !b.badge && !b.showOverlay)?.length || 0})
            </button>
            <button
              onClick={() => setBannerFilter("promo")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                bannerFilter === "promo" ? "bg-orange-600 text-white" : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              🎨 Promo Text ({bannerData?.data?.filter((b: any) => b.type === "promo" || b.title || b.badge || b.showOverlay)?.length || 0})
            </button>
          </div>

          {/* Banner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bannerData?.data
              ?.filter((b: any) => {
                if (bannerFilter === "image") return b.type === "image" && !b.title && !b.badge && !b.showOverlay;
                if (bannerFilter === "promo") return b.type === "promo" || b.title || b.badge || b.showOverlay;
                return true;
              })
              ?.map((b: any, idx: number) => {
                const isPureImage = b.type === "image" && !b.title && !b.badge && !b.showOverlay;
                const isOverlay = b.type === "image" && (b.title || b.badge || b.showOverlay);
                const titleText = b.title || b.badge;

                return (
                  <div key={b._id || b.id || idx} className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-md flex flex-col group relative transition-all">
                    {/* Visual Preview Box */}
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                      {isPureImage ? (
                        b.imageUrl ? (
                          <img src={b.imageUrl} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                          <div className="text-slate-600 text-xs">No image uploaded</div>
                        )
                      ) : isOverlay ? (
                        <div className="relative w-full h-full">
                          {b.imageUrl && <img src={b.imageUrl} alt="Overlay Banner" className="w-full h-full object-cover" />}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-center text-white">
                            <span className="text-base font-black">{titleText} {b.badgeLabel && <span className="text-amber-400 text-xs">{b.badgeLabel}</span>}</span>
                            {b.subtitle && <p className="text-[11px] text-slate-300 line-clamp-1 mt-1">{b.subtitle}</p>}
                            {b.buttonText && <span className="inline-block mt-2 bg-primary-600 text-white font-bold text-[9px] px-2.5 py-0.5 rounded w-fit">{b.buttonText}</span>}
                          </div>
                        </div>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-r ${b.bgGradient || "from-orange-50 to-amber-100"} flex flex-col justify-center p-4 text-slate-900 relative overflow-hidden`}>
                          <div className="relative z-10">
                            <span className="text-base font-black">{titleText} <span className="text-xs text-primary-600">{b.badgeLabel}</span></span>
                            <p className="text-[11px] font-medium text-slate-700 mt-1 line-clamp-2">{b.subtitle}</p>
                            <span className="inline-block mt-2 bg-primary-600 text-white font-bold text-[10px] px-3 py-1 rounded w-fit">{b.buttonText || "অফার দেখুন"}</span>
                          </div>
                          {b.promoImage && (
                            <img src={b.promoImage} alt="Cutout" className="absolute right-1 bottom-1 w-20 h-20 object-contain drop-shadow-md z-0 opacity-90" />
                          )}
                        </div>
                      )}

                      {/* Top Order Badge */}
                      <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-sm text-[11px] px-2.5 py-0.5 rounded-full text-slate-300 font-mono border border-slate-700/50">
                        Order #{b.sortOrder ?? 0}
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isPureImage 
                              ? "bg-blue-500/20 text-blue-400" 
                              : isOverlay 
                              ? "bg-purple-500/20 text-purple-400" 
                              : "bg-orange-500/20 text-orange-400"
                          }`}>
                            {isPureImage ? "Without Title (Image)" : isOverlay ? "Image with Title Overlay" : "Promo Banner (With Title)"}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>
                            {b.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 font-mono truncate">
                          Link: <span className="text-slate-200">{b.link || "/shop"}</span>
                        </p>
                      </div>

                      {/* Card Actions */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
                        <button
                          onClick={() => handleEditBannerClick(b)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-amber-400" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBannerClick(b._id || b.id)}
                          className="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty State */}
          {(!bannerData?.data || bannerData.data.length === 0) && (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl space-y-3">
              <ImageIcon className="h-10 w-10 text-slate-600 mx-auto" />
              <h4 className="text-slate-300 font-bold">No Hero Banners Found in Database</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Click below to upload your first banner image or create a rich promo slide.</p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => handleAddBannerClick("image")}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl"
                >
                  Add Full Image Banner
                </button>
                <button
                  onClick={() => handleAddBannerClick("promo")}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2 px-4 rounded-xl"
                >
                  Add Promo Banner
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODAL: HERO BANNER CREATION & UPDATE (Cloudinary Image Upload)
          ========================================================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col my-6 max-h-[90vh]">
            <div className="flex justify-between items-center bg-slate-950/90 px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-rose-500" />
                {editingBannerId ? "Edit Hero Banner Slide" : "Add New Hero Banner Slide"}
              </h2>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitBanner} className="p-6 space-y-5 overflow-y-auto text-xs text-slate-300">
              {/* 1. Format Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Choose Banner Format Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setBannerType("image")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center text-center gap-1.5 ${
                      bannerType === "image" ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-base">🖼️</span>
                    <span>Full Image Banner</span>
                    <span className="text-[10px] font-normal text-slate-400">Without Title (Canva/Photoshop graphic)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBannerType("promo")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center text-center gap-1.5 ${
                      bannerType === "promo" ? "bg-rose-600/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/10" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-base">🎨</span>
                    <span>Rich Promo Banner</span>
                    <span className="text-[10px] font-normal text-slate-400">With Title, Subtitle, CTA & Cutout Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBannerType("overlay")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center text-center gap-1.5 ${
                      bannerType === "overlay" ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md shadow-purple-500/10" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-base">🏷️</span>
                    <span>Image with Title Overlay</span>
                    <span className="text-[10px] font-normal text-slate-400">Background photo + Title text overlay</span>
                  </button>
                </div>
              </div>

              {/* 2. Banner Image Uploader (For Full Image & Overlay modes) */}
              {(bannerType === "image" || bannerType === "overlay") && (
                <div className="space-y-3 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Cloudinary Banner Image (ব্যানার ইমেজ আপলোড করুন) *
                    </label>
                    <span className="text-[10px] text-slate-400">Recommended: 1200 x 480 px</span>
                  </div>

                  {/* Upload Area */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={bannerImageUrl}
                      onChange={(e) => setBannerImageUrl(e.target.value)}
                      placeholder="Paste image URL (https://res.cloudinary.com/...)"
                      className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                    />
                    <label className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-rose-600/20">
                      {isUploadingBannerImage ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <UploadCloud className="h-4 w-4" />
                      )}
                      <span>{isUploadingBannerImage ? "Uploading..." : "Upload from Device"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingBannerImage}
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploadingBannerImage(true);
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await uploadMedia(formData).unwrap();
                            if (res.url) setBannerImageUrl(res.url);
                          } catch (err: any) {
                            alert(err?.data?.message || "Image upload failed! Check file size or format.");
                          } finally {
                            setIsUploadingBannerImage(false);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Preview Box */}
                  {bannerImageUrl && (
                    <div className="relative h-40 w-full rounded-xl overflow-hidden border border-slate-800 group bg-slate-900">
                      <img src={bannerImageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setBannerImageUrl("")}
                          className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Text Fields (For Promo & Overlay modes) */}
              {(bannerType === "promo" || bannerType === "overlay") && (
                <div className="space-y-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Banner Title, Badge & Subtitle Texts
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Main Title / Badge (e.g. ৳৬,০০০ or ঈদ অফার)
                      </label>
                      <input
                        type="text"
                        value={bannerBadge}
                        onChange={(e) => {
                          setBannerBadge(e.target.value);
                          setBannerTitle(e.target.value);
                        }}
                        placeholder="৳৬,০০০"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-bengali font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Badge Label / Highlight Tag (e.g. ছাড়! or MEGA SALE)
                      </label>
                      <input
                        type="text"
                        value={bannerBadgeLabel}
                        onChange={(e) => setBannerBadgeLabel(e.target.value)}
                        placeholder="ছাড়!"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-bengali"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Subtitle / Promotional Description</label>
                    <textarea
                      rows={2}
                      value={bannerSubtitle}
                      onChange={(e) => setBannerSubtitle(e.target.value)}
                      placeholder="ঈদের কেনাকাটায় দারুণ সারপ্রাইজ..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-bengali"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={bannerButtonText}
                        onChange={(e) => setBannerButtonText(e.target.value)}
                        placeholder="অফার দেখুন"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-bengali"
                      />
                    </div>

                    {/* Cutout Promo Image (for Promo Mode) */}
                    {bannerType === "promo" && (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Right-Side Cutout Product Image</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={bannerPromoImage}
                            onChange={(e) => setBannerPromoImage(e.target.value)}
                            placeholder="Cutout PNG URL"
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                          />
                          <label className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap flex items-center gap-1">
                            {isUploadingPromoImage ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <UploadCloud className="h-3.5 w-3.5" />}
                            <span>{isUploadingPromoImage ? "..." : "Upload"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={isUploadingPromoImage}
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setIsUploadingPromoImage(true);
                                const formData = new FormData();
                                formData.append("file", file);
                                try {
                                  const res = await uploadMedia(formData).unwrap();
                                  if (res.url) setBannerPromoImage(res.url);
                                } catch (err: any) {
                                  alert(err?.data?.message || "Cutout image upload failed!");
                                } finally {
                                  setIsUploadingPromoImage(false);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gradient / Theme Presets (For Promo Mode) */}
                  {bannerType === "promo" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Background Gradient Theme</label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[
                          { name: "Sunset Orange", gradient: "from-orange-50 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/20", color: "bg-gradient-to-r from-orange-400 to-amber-300" },
                          { name: "Emerald Breeze", gradient: "from-emerald-50 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/20", color: "bg-gradient-to-r from-emerald-400 to-teal-300" },
                          { name: "Royal Indigo", gradient: "from-indigo-50 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/20", color: "bg-gradient-to-r from-indigo-400 to-blue-300" },
                          { name: "Rose Bloom", gradient: "from-rose-50 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/20", color: "bg-gradient-to-r from-rose-400 to-pink-300" },
                          { name: "Cyber Violet", gradient: "from-purple-50 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/20", color: "bg-gradient-to-r from-purple-400 to-violet-300" },
                          { name: "Slate Dark", gradient: "from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 text-white", color: "bg-gradient-to-r from-slate-700 to-slate-900" },
                        ].map((theme) => (
                          <button
                            key={theme.name}
                            type="button"
                            onClick={() => setBannerBgGradient(theme.gradient)}
                            className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                              bannerBgGradient === theme.gradient ? "border-rose-500 ring-2 ring-rose-500/30" : "border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className={`w-full h-5 rounded-lg ${theme.color}`} />
                            <span className="text-[10px] font-bold text-slate-300 truncate w-full">{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Shared Settings: Link & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Click Destination URL / Route *</label>
                  <input
                    type="text"
                    required
                    value={bannerLink}
                    onChange={(e) => setBannerLink(e.target.value)}
                    placeholder="/shop, /deals, or /shop?category=toys"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Sort Order #</label>
                  <input
                    type="number"
                    value={bannerSortOrder}
                    onChange={(e) => setBannerSortOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>

              {/* 5. Live Slide Preview Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-emerald-400" />
                  Live Hero Section Preview (গ্রাহক সাইটের প্রিভিউ)
                </label>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
                  {bannerType === "image" ? (
                    bannerImageUrl ? (
                      <img src={bannerImageUrl} alt="Live Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1">
                        <ImageIcon className="h-6 w-6 text-slate-600" />
                        <span>Upload or enter an image URL to preview</span>
                      </div>
                    )
                  ) : bannerType === "overlay" ? (
                    <div className="relative w-full h-full">
                      {bannerImageUrl ? (
                        <img src={bannerImageUrl} alt="Live Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-800" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center text-white">
                        <span className="text-xl font-black">{bannerBadge || "৳৬,০০০"} <span className="text-amber-400 text-sm">{bannerBadgeLabel || "ছাড়!"}</span></span>
                        <p className="text-xs text-slate-200 mt-1 line-clamp-1">{bannerSubtitle || "ঈদের কেনাকাটায় দারুণ সারপ্রাইজ"}</p>
                        <span className="inline-block mt-3 bg-primary-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg w-fit shadow">
                          {bannerButtonText || "অফার দেখুন"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${bannerBgGradient || "from-orange-50 to-amber-100"} flex flex-col justify-center p-6 text-slate-900 relative overflow-hidden`}>
                      <div className="relative z-10 max-w-xs">
                        <span className="text-xl font-black">{bannerBadge || "৳৬,০০০"} <span className="text-primary-600 text-sm">{bannerBadgeLabel || "ছাড়!"}</span></span>
                        <p className="text-xs font-medium text-slate-700 mt-1 line-clamp-2">{bannerSubtitle || "ঈদের কেনাকাটায় দারুণ সারপ্রাইজ"}</p>
                        <span className="inline-block mt-3 bg-primary-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg w-fit shadow">
                          {bannerButtonText || "অফার দেখুন"}
                        </span>
                      </div>
                      {bannerPromoImage && (
                        <img src={bannerPromoImage} alt="Cutout Preview" className="absolute right-4 bottom-2 w-28 h-28 object-contain drop-shadow-md z-0" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-5 rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-7 rounded-xl text-xs shadow-lg shadow-rose-500/20 transition flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  Save Hero Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 1: CREATE OR UPDATE PRODUCT
          ========================================================= */}
      {isProdModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col my-8 max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-500" />
                {editingProductId ? "Modify Product Specifications" : "Create Catalog Product Profile"}
              </h2>
              <button onClick={() => setIsProdModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scroll form */}
            <form onSubmit={handleSubmitProduct} className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-355 text-sm">
              {uploadSuccess ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce mb-4" />
                  <h3 className="text-2xl font-black text-white">Database Synced Successfully!</h3>
                  <p className="text-slate-400 text-sm mt-1">Catalogue is loading new updates.</p>
                </div>
              ) : (
                <>
                  {/* Google Sheets Autofill Bar */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                        Google Sheets Autofill Integration
                      </h4>
                      <p className="text-[11px] text-slate-400">Paste your shared sheet URL to instantly pre-populate all input fields below.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch gap-2.5 md:w-[65%]">
                      <input
                        type="text"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="Google Sheet shared link"
                        className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 min-w-0"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="2"
                          value={sheetRow}
                          onChange={(e) => setSheetRow(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                          placeholder="Row (e.g. 2)"
                          className="w-[95px] bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-xs text-slate-355 text-slate-300 focus:outline-none focus:border-amber-500 text-center"
                          title="Row number (Row 1 is Header, Row 2 is 1st product, Row 3 is 2nd product, etc.)"
                        />
                        <button
                          type="button"
                          disabled={isAutofilling}
                          onClick={handleAutofill}
                          className="flex-grow md:flex-grow-0 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 whitespace-nowrap"
                        >
                          {isAutofilling ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              Autofilling...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                              Autofill
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Master SKU *</label>
                      <input
                        type="text"
                        required
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        placeholder="e.g. SDY-PLY-TENT"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Slug</label>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="e.g. premium-playhouse-tent"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose Category *</label>
                      <select
                        required
                        value={formCategory}
                        onChange={(e) => {
                          setFormCategory(e.target.value);
                          setFormSubcategory("");
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      >
                        <option value="">Select Category</option>
                        {catData?.data?.filter((c: any) => !c.parentId).map((c: any) => (
                          <option key={c.id || c._id} value={c.id || c._id}>{c.nameEn} ({c.nameBn})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose Subcategory</label>
                      <select
                        value={formSubcategory}
                        onChange={(e) => setFormSubcategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                        disabled={!formCategory}
                      >
                        <option value="">Select Subcategory</option>
                        {catData?.data?.filter((c: any) => c.parentId === formCategory).map((c: any) => (
                          <option key={c.id || c._id} value={c.id || c._id}>{c.nameEn} ({c.nameBn})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={formNameEn}
                        onChange={(e) => setFormNameEn(e.target.value)}
                        placeholder="Sodayon Premium Playhouse Tent"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title (Bengali) *</label>
                      <input
                        type="text"
                        required
                        value={formNameBn}
                        onChange={(e) => setFormNameBn(e.target.value)}
                        placeholder="সদায়ণ প্রিমিয়াম প্লেহাউস তাঁবু"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description (English)</label>
                      <textarea
                        rows={3}
                        value={formDescEn}
                        onChange={(e) => setFormDescEn(e.target.value)}
                        placeholder="Detailed technical specifications..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description (Bengali)</label>
                      <textarea
                        rows={3}
                        value={formDescBn}
                        onChange={(e) => setFormDescBn(e.target.value)}
                        placeholder="খেলনা তাঁবুর বিস্তারিত বর্ণনা..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Brand (English)</label>
                      <input
                        type="text"
                        value={formBrandEn}
                        onChange={(e) => setFormBrandEn(e.target.value)}
                        placeholder="Sodayon"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Brand (Bengali)</label>
                      <input
                        type="text"
                        value={formBrandBn}
                        onChange={(e) => setFormBrandBn(e.target.value)}
                        placeholder="সদায়ণ"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs font-bengali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Price (৳) *</label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-emerald-400 font-bold focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Strike Price (৳)</label>
                      <input
                        type="number"
                        value={formOriginalPrice}
                        onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deal Expiration Timer</label>
                      <input
                        type="datetime-local"
                        value={formDealEndsAt}
                        onChange={(e) => setFormDealEndsAt(e.target.value)}
                        onClick={(e) => {
                          try {
                            e.currentTarget.showPicker();
                          } catch (err) {
                            console.log("showPicker not supported", err);
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs cursor-pointer hover:border-amber-500/50 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Safety Rating (1-10)</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={formSafetyScore}
                        onChange={(e) => setFormSafetyScore(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Min Age (Months)</label>
                      <input
                        type="number"
                        value={formAgeMin}
                        onChange={(e) => setFormAgeMin(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Max Age (Months)</label>
                      <input
                        type="number"
                        value={formAgeMax}
                        onChange={(e) => setFormAgeMax(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tags / Milestones</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Tag (e.g., STEM, Toys)"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tagInput.trim()) {
                            setFormTags([...formTags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl text-xs"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formTags.map((t, idx) => (
                        <span key={idx} className="bg-slate-805 text-amber-400 border border-slate-800 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
                          <Tag className="h-3 w-3" />
                          {t}
                          <button
                            type="button"
                            onClick={() => setFormTags(formTags.filter((_, i) => i !== idx))}
                            className="hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Media Uploader Area */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <UploadCloud className="h-5 w-5 text-amber-500" />
                      Dynamic Media Assets Uploader
                    </h4>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <label className="cursor-pointer bg-slate-900 border-2 border-dashed border-slate-800 hover:border-amber-500 p-6 rounded-xl flex flex-col items-center justify-center w-32 h-32 transition-colors">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                        {isUploadingImage ? (
                          <span className="text-[10px] text-amber-500 font-bold animate-pulse text-center">Uploading...</span>
                        ) : (
                          <>
                            <UploadCloud className="h-6 w-6 text-slate-400 mb-1" />
                            <span className="text-[10px] text-slate-400 text-center font-semibold">Upload Image</span>
                          </>
                        )}
                      </label>

                      {formImages.map((img, idx) => (
                        <div key={idx} className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-800">
                          <img src={img} alt="upload" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormImages(formImages.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/90 text-white rounded-full p-1.5 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white">Polymorphic Specifications Map</h4>
                      <button
                        type="button"
                        onClick={addSpecRow}
                        className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Row
                      </button>
                    </div>
                    <div className="space-y-3">
                      {specs.map((s, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <input
                            type="text"
                            placeholder="Specification Key (e.g. material)"
                            value={s.key}
                            onChange={(e) => {
                              setSpecs(specs.map((item, i) => i === idx ? { ...item, key: e.target.value } : item));
                            }}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-1/3"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={s.val}
                            onChange={(e) => {
                              setSpecs(specs.map((item, i) => i === idx ? { ...item, val: e.target.value } : item));
                            }}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                          />
                          <button type="button" onClick={() => removeSpecRow(idx)} className="text-red-500 hover:text-red-400 p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Variational SKU options */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40 font-heading">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white">Variational SKU Matrix</h4>
                      <button
                        type="button"
                        onClick={addVariantRow}
                        className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Variant
                      </button>
                    </div>
                    <div className="space-y-4">
                      {variants.map((v, idx) => (
                        <div key={idx} className="border-b border-slate-850 pb-3 space-y-2 last:border-0 last:pb-0">
                           <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                            <input
                              type="text"
                              placeholder="SKU Code"
                              value={v.sku}
                              onChange={(e) => {
                                setVariants(variants.map((item, i) => i === idx ? { ...item, sku: e.target.value } : item));
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              placeholder="Title (English)"
                              value={v.nameEn}
                              onChange={(e) => {
                                setVariants(variants.map((item, i) => i === idx ? { ...item, nameEn: e.target.value } : item));
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              placeholder="Title (Bengali)"
                              value={v.nameBn}
                              onChange={(e) => {
                                setVariants(variants.map((item, i) => i === idx ? { ...item, nameBn: e.target.value } : item));
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bengali"
                            />
                            <input
                              type="number"
                              placeholder="Price (৳)"
                              value={v.price}
                              onChange={(e) => {
                                setVariants(variants.map((item, i) => i === idx ? { ...item, price: Number(e.target.value) || 0 } : item));
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="number"
                              placeholder="Stock"
                              value={v.stock}
                              onChange={(e) => {
                                setVariants(variants.map((item, i) => i === idx ? { ...item, stock: Number(e.target.value) || 0 } : item));
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder="Color Option"
                                value={v.color}
                                onChange={(e) => {
                                  setVariants(variants.map((item, i) => i === idx ? { ...item, color: e.target.value } : item));
                                }}
                                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                              />
                              <button type="button" onClick={() => removeVariantRow(idx)} className="text-red-500 hover:text-red-400 p-1">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Play Personality Panel */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-amber-500" />
                      Play Personality Match (প্লে পার্সোনালিটি)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Personality Label (English)</label>
                        <input
                          type="text"
                          value={formPlayPersonalityLabelEn}
                          onChange={(e) => setFormPlayPersonalityLabelEn(e.target.value)}
                          placeholder="e.g. Master Builder"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Personality Label (Bengali)</label>
                        <input
                          type="text"
                          value={formPlayPersonalityLabelBn}
                          onChange={(e) => setFormPlayPersonalityLabelBn(e.target.value)}
                          placeholder="e.g. মাস্টার বিল্ডার"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs font-bengali"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Personality Description (English)</label>
                        <textarea
                          value={formPlayPersonalityDescEn}
                          onChange={(e) => setFormPlayPersonalityDescEn(e.target.value)}
                          placeholder="Why this toy matches this personality..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs h-20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Personality Description (Bengali)</label>
                        <textarea
                          value={formPlayPersonalityDescBn}
                          onChange={(e) => setFormPlayPersonalityDescBn(e.target.value)}
                          placeholder="কেন এই খেলনাটি এই পার্সোনালিটির সাথে মিলে..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs h-20 font-bengali"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Beneficial Milestones Grid */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        Developmental Benefits (খেললে যে উপকারিতা পায়)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setFormBenefits([...formBenefits, { icon: "Brain", titleEn: "", titleBn: "", descEn: "", descBn: "" }])}
                        className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Benefit Card
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formBenefits.map((b, idx) => (
                        <div key={idx} className="border border-slate-805 p-4 rounded-xl space-y-3 relative bg-slate-900/60">
                          <button
                            type="button"
                            onClick={() => setFormBenefits(formBenefits.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Select Icon</label>
                              <select
                                value={b.icon}
                                onChange={(e) => {
                                  setFormBenefits(formBenefits.map((item, i) => i === idx ? { ...item, icon: e.target.value } : item));
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              >
                                <option value="Brain">Brain (বুদ্ধিবৃত্তিক)</option>
                                <option value="Lightbulb">Lightbulb (সৃজনশীলতা)</option>
                                <option value="Smartphone">Smartphone (মোবাইল মুক্তি)</option>
                                <option value="Gift">Gift (উপহার)</option>
                                <option value="Smile">Smile (আনন্দ)</option>
                                <option value="Star">Star (বিশেষত্ব)</option>
                                <option value="Heart">Heart (যত্ন)</option>
                                <option value="Shield">Shield (নিরাপত্তা)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Benefit Title (English)</label>
                              <input
                                type="text"
                                value={b.titleEn || ""}
                                onChange={(e) => {
                                  setFormBenefits(formBenefits.map((item, i) => i === idx ? { ...item, titleEn: e.target.value } : item));
                                }}
                                placeholder="e.g. Cognitive Growth"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Benefit Title (Bengali)</label>
                              <input
                                type="text"
                                value={b.titleBn || ""}
                                onChange={(e) => {
                                  setFormBenefits(formBenefits.map((item, i) => i === idx ? { ...item, titleBn: e.target.value } : item));
                                }}
                                placeholder="e.g. বুদ্ধিবৃত্তিক বিকাশ"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bengali"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Description (English)</label>
                              <textarea
                                value={b.descEn || ""}
                                onChange={(e) => {
                                  setFormBenefits(formBenefits.map((item, i) => i === idx ? { ...item, descEn: e.target.value } : item));
                                }}
                                placeholder="Explain benefit details..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-16"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Description (Bengali)</label>
                              <textarea
                                value={b.descBn || ""}
                                onChange={(e) => {
                                  setFormBenefits(formBenefits.map((item, i) => i === idx ? { ...item, descBn: e.target.value } : item));
                                }}
                                placeholder="উপকারিতা বিস্তারিত লিখুন..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-16 font-bengali"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package Checklist Panel */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Package className="h-5 w-5 text-amber-500" />
                        Package Items Checklist (প্যাকেজে যা যা থাকছে)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setFormPackageItems([...formPackageItems, { count: "১x", textEn: "", textBn: "", detailsEn: "", detailsBn: "" }])}
                        className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Package Item
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formPackageItems.map((item, idx) => (
                        <div key={idx} className="border border-slate-805 p-4 rounded-xl space-y-3 relative bg-slate-900/60">
                          <button
                            type="button"
                            onClick={() => setFormPackageItems(formPackageItems.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Item Quantity / Count</label>
                              <input
                                type="text"
                                value={item.count || ""}
                                onChange={(e) => {
                                  setFormPackageItems(formPackageItems.map((val, i) => i === idx ? { ...val, count: e.target.value } : val));
                                }}
                                placeholder="e.g. ৫০x"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Item Name (English)</label>
                              <input
                                type="text"
                                value={item.textEn || ""}
                                onChange={(e) => {
                                  setFormPackageItems(formPackageItems.map((val, i) => i === idx ? { ...val, textEn: e.target.value } : val));
                                }}
                                placeholder="e.g. Magnetic Triangles"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Item Name (Bengali)</label>
                              <input
                                type="text"
                                value={item.textBn || ""}
                                onChange={(e) => {
                                  setFormPackageItems(formPackageItems.map((val, i) => i === idx ? { ...val, textBn: e.target.value } : val));
                                }}
                                placeholder="e.g. ম্যাগনেটিক ত্রিভুজ"
                                className="w-full bg-slate-950 border border-slate-805 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bengali"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Detailed Explanation (English)</label>
                              <textarea
                                value={item.detailsEn || ""}
                                onChange={(e) => {
                                  setFormPackageItems(formPackageItems.map((val, i) => i === idx ? { ...val, detailsEn: e.target.value } : val));
                                }}
                                placeholder="Detail what is inside..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-16"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Detailed Explanation (Bengali)</label>
                              <textarea
                                value={item.detailsBn || ""}
                                onChange={(e) => {
                                  setFormPackageItems(formPackageItems.map((val, i) => i === idx ? { ...val, detailsBn: e.target.value } : val));
                                }}
                                placeholder="বিস্তারিত ব্যাখ্যা লিখুন..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 h-16 font-bengali"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Directions Panel */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-amber-500" />
                      Usage Directions (ব্যবহারের নির্দেশনা)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Directions & Specifications (English)</label>
                        <textarea
                          value={formDirectionsEn}
                          onChange={(e) => setFormDirectionsEn(e.target.value)}
                          placeholder="Detailed steps of how to play or handle..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs h-24"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Directions & Specifications (Bengali)</label>
                        <textarea
                          value={formDirectionsBn}
                          onChange={(e) => setFormDirectionsBn(e.target.value)}
                          placeholder="খেলার বা ব্যবহারের বিস্তারিত গাইড..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs h-24 font-bengali"
                        />
                      </div>
                    </div>
                  </div>

                  {/* YouTube Videos Playlist Gallery */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Video className="h-5 w-5 text-amber-500" />
                        Dynamic YouTube Video Gallery (ভিডিওসমূহ)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setFormVideos([...formVideos, { youtubeUrl: "", titleBn: "", channelName: "Sodayon Toys", duration: "১০:০০" }])}
                        className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Video
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formVideos.map((vid, idx) => (
                        <div key={idx} className="border border-slate-805 p-4 rounded-xl space-y-3 relative bg-slate-900/60">
                          <button
                            type="button"
                            onClick={() => setFormVideos(formVideos.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">YouTube Video URL *</label>
                              <input
                                type="text"
                                required
                                value={vid.youtubeUrl || ""}
                                onChange={(e) => {
                                  setFormVideos(formVideos.map((val, i) => i === idx ? { ...val, youtubeUrl: e.target.value } : val));
                                }}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Video Title (Bengali) *</label>
                              <input
                                type="text"
                                required
                                value={vid.titleBn || ""}
                                onChange={(e) => {
                                  setFormVideos(formVideos.map((val, i) => i === idx ? { ...val, titleBn: e.target.value } : val));
                                }}
                                placeholder="ভিডিওর শিরোনাম বাংলায় লিখুন"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bengali"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Channel Name (Optional)</label>
                              <input
                                type="text"
                                value={vid.channelName || ""}
                                onChange={(e) => {
                                  setFormVideos(formVideos.map((val, i) => i === idx ? { ...val, channelName: e.target.value } : val));
                                }}
                                placeholder="e.g. Sodayon Toys"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Video Duration (e.g. ১০:৪৫)</label>
                              <input
                                type="text"
                                value={vid.duration || ""}
                                onChange={(e) => {
                                  setFormVideos(formVideos.map((val, i) => i === idx ? { ...val, duration: e.target.value } : val));
                                }}
                                placeholder="e.g. ৮:৪৫"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-slate-850">
                    <button
                      type="button"
                      onClick={() => setIsProdModalOpen(false)}
                      className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2.5 px-6 rounded-xl transition-all text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingProduct || isUpdatingProduct}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingProduct || isUpdatingProduct ? "Saving Changes..." : "Publish Product Profile"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: ADD CATEGORY NODE
          ========================================================= */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-500" />
                Add Taxonomy Node Category
              </h2>
              <button onClick={() => setIsCatModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitCategory} className="p-6 space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Category Slug *</label>
                <input
                  type="text"
                  required
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  placeholder="e.g., educational-STEM"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Name (English) *</label>
                <input
                  type="text"
                  required
                  value={catNameEn}
                  onChange={(e) => setCatNameEn(e.target.value)}
                  placeholder="STEM Kits"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Name (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={catNameBn}
                  onChange={(e) => setCatNameBn(e.target.value)}
                  placeholder="স্টেম কিটস"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-bengali"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Parent Category (Optional)</label>
                <select
                  value={catParentId}
                  onChange={(e) => setCatParentId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">No Parent (Root Node)</option>
                  {catData?.data?.map((c: any) => (
                    <option key={c.id || c._id} value={c.id || c._id}>{c.nameEn}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={catShowMega} onChange={(e) => setCatShowMega(e.target.checked)} className="rounded accent-emerald-500" />
                  <span>Show in Mega Menu</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={catShowDrop} onChange={(e) => setCatShowDrop(e.target.checked)} className="rounded accent-emerald-500" />
                  <span>Show in Dropdown</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingCat}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  {isCreatingCat ? "Saving..." : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: ADD HOMEPAGE UI SECTION
          ========================================================= */}
      {isUiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-blue-500" />
                Add homepage UI Grid Block
              </h2>
              <button onClick={() => setIsUiModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitUISection} className="p-6 space-y-4 text-xs text-slate-300">
              {/* Guidance Callout */}
              <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-3 flex items-start gap-2.5">
                <ImageIcon className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-300">
                  <span className="font-bold text-rose-300">Looking for Top Hero Carousel Banners?</span>
                  <p className="text-slate-400 mt-0.5">To upload image banners or create rotating slides for the top hero section, use the dedicated <button type="button" onClick={() => { setIsUiModalOpen(false); setActiveTab("banners"); }} className="text-rose-400 underline font-bold hover:text-rose-300">Hero Banners tab</button>.</p>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Block Section Type *</label>
                <select
                  value={uiType}
                  onChange={(e) => setUiType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="QUICK_DEAL">Quick Deals Slider</option>
                  <option value="FLASH_SALE">Flash Sales Grid</option>
                  <option value="BEST_SELLERS">Best Sellers Section</option>
                  <option value="GRID_COLLECTION">Category Grid Collection</option>
                  <option value="HERO_BANNER">Custom Banner Block</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Section Title (English) *</label>
                <input
                  type="text"
                  required
                  value={uiTitleEn}
                  onChange={(e) => setUiTitleEn(e.target.value)}
                  placeholder="e.g., Hot Summer Deals"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Section Title (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={uiTitleBn}
                  onChange={(e) => setUiTitleBn(e.target.value)}
                  placeholder="যেমন: সেরা অফার সমূহ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 font-bengali"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Visual Layout Style</label>
                <select
                  value={uiStyle}
                  onChange={(e) => setUiStyle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="GRID">Responsive Columns Grid</option>
                  <option value="CAROUSEL">Horizontal Carousel Slider</option>
                  <option value="LIST">Single Column Rows list</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsUiModalOpen(false)}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingUi}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  {isCreatingUi ? "Saving..." : "Create UI Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 4: SCHEDULE FLASH SALE CAMPAIGN
          ========================================================= */}
      {isCampModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                Schedule Flash Sale Campaign
              </h2>
              <button onClick={() => setIsCampModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitCampaign} className="p-6 space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Campaign Title (English) *</label>
                <input
                  type="text"
                  required
                  value={campTitleEn}
                  onChange={(e) => setCampTitleEn(e.target.value)}
                  placeholder="e.g. Eid Mega Sale Campaign"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Campaign Title (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={campTitleBn}
                  onChange={(e) => setCampTitleBn(e.target.value)}
                  placeholder="যেমন: ঈদ মেগা সেল ক্যাম্পেইন"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 font-bengali"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Start Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={campStart}
                    onChange={(e) => setCampStart(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={campEnd}
                    onChange={(e) => setCampEnd(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsCampModalOpen(false)}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingCamp}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  {isCreatingCamp ? "Scheduling..." : "Schedule Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 5: CREATE OR UPDATE DYNAMIC MENU LINK
          ========================================================= */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col my-8">
            
            {/* Header */}
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-indigo-500" />
                {editingMenuId ? "Modify Menu Link Configuration" : "Add New Dynamic Menu Link"}
              </h2>
              <button onClick={() => setIsMenuModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
 
            {/* Form */}
            <form onSubmit={handleSubmitMenu} className="p-6 space-y-6 text-slate-300 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={menuTitleEn}
                    onChange={(e) => setMenuTitleEn(e.target.value)}
                    placeholder="e.g. Home"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title (Bengali) *</label>
                  <input
                    type="text"
                    required
                    value={menuTitleBn}
                    onChange={(e) => setMenuTitleBn(e.target.value)}
                    placeholder="e.g. হোম"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">URL Href Path *</label>
                <input
                  type="text"
                  required
                  value={menuUrl}
                  onChange={(e) => setMenuUrl(e.target.value)}
                  placeholder="e.g. /shop or /deals"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Placement Target *</label>
                  <select
                    value={menuType}
                    onChange={(e) => {
                      const val = e.target.value as "navbar" | "footer";
                      setMenuType(val);
                      if (val === 'navbar') {
                        setMenuGroup("");
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="navbar">Header Navbar</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sort Weight Order</label>
                  <input
                    type="number"
                    value={menuSortOrder}
                    onChange={(e) => setMenuSortOrder(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              {menuType === 'navbar' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Parent Menu Item (Optional)</label>
                      <select
                        value={menuParentId}
                        onChange={(e) => setMenuParentId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                      >
                        <option value="">No Parent (Top-level Navigation)</option>
                        {menuData?.data
                          ?.filter((p: any) => p.type === 'navbar' && !p.parentId && p._id !== editingMenuId)
                          ?.map((p: any) => (
                            <option key={p._id} value={p._id}>{p.titleBn} ({p.titleEn})</option>
                          ))
                        }
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mega Menu Column (Optional)</label>
                      <select
                        value={menuGroup}
                        onChange={(e) => setMenuGroup(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                      >
                        <option value="">No Column (Simple Dropdown)</option>
                        <option value="quick-links">কুইক লিংক (quick-links)</option>
                        <option value="top-categories">শীর্ষ ক্যাটাগরি (top-categories)</option>
                        <option value="baby-products">শিশু পণ্য (baby-products)</option>
                        <option value="promo-card">প্রমোশনাল কার্ড (promo-card)</option>
                      </select>
                    </div>
                  </div>

                  {menuGroup === 'promo-card' && (
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-850 space-y-4 animate-in fade-in duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 block mb-1">
                        Promotional Card Content Configuration
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Badge text (English)</label>
                          <input
                            type="text"
                            value={menuBadgeEn}
                            onChange={(e) => setMenuBadgeEn(e.target.value)}
                            placeholder="e.g. Limited Time"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Badge text (Bengali)</label>
                          <input
                            type="text"
                            value={menuBadgeBn}
                            onChange={(e) => setMenuBadgeBn(e.target.value)}
                            placeholder="যেমন: সীমিত সময়"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-bengali"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Promo Description (English)</label>
                          <input
                            type="text"
                            value={menuDescEn}
                            onChange={(e) => setMenuDescEn(e.target.value)}
                            placeholder="e.g. Explore our new educational toolkit"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Promo Description (Bengali)</label>
                          <input
                            type="text"
                            value={menuDescBn}
                            onChange={(e) => setMenuDescBn(e.target.value)}
                            placeholder="যেমন: আমাদের নতুন খেলনা সমূহ"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-bengali"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Button CTA Text (English)</label>
                          <input
                            type="text"
                            value={menuCtaEn}
                            onChange={(e) => setMenuCtaEn(e.target.value)}
                            placeholder="e.g. Shop Now"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Button CTA Text (Bengali)</label>
                          <input
                            type="text"
                            value={menuCtaBn}
                            onChange={(e) => setMenuCtaBn(e.target.value)}
                            placeholder="যেমন: শপ নাও"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-bengali"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {menuType === 'footer' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Footer Group Column</label>
                  <select
                    value={menuGroup}
                    onChange={(e) => setMenuGroup(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="">Select Footer Group</option>
                    <option value="quick-links">খেলনা কিনুন (quick-links)</option>
                    <option value="baby-products">শিশু পণ্য (baby-products)</option>
                    <option value="ai-features">এআই ফিচারসমূহ (ai-features)</option>
                    <option value="support">সাপোর্ট (support)</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
