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
  useUploadMediaMutation
} from "@/store/admin/adminContentApi";
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
  Eye
} from "lucide-react";

export default function ContentPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "ui-sections" | "campaigns">("products");
  
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
  const [formAgeMin, setFormAgeMin] = useState(12);
  const [formAgeMax, setFormAgeMax] = useState(48);
  const [formSafetyScore, setFormSafetyScore] = useState(9);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>([
    { key: "material", val: "Cotton Canvas" },
    { key: "dimensions", val: "120 x 120 x 140 cm" }
  ]);
  const [variants, setVariants] = useState<{ sku: string; nameEn: string; nameBn: string; price: number; stock: number; color: string }[]>([
    { sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }
  ]);

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
    setFormAgeMin(p.ageMonthsMin || 12);
    setFormAgeMax(p.ageMonthsMax || 48);
    setFormSafetyScore(p.safetyScore || 9);
    setFormImages(p.images || [p.image] || []);
    setFormCategory(p.categories?.[0] || "");
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
    setFormAgeMin(12);
    setFormAgeMax(48);
    setFormSafetyScore(9);
    setFormImages([]);
    setFormCategory("");
    setFormTags([]);
    setSpecs([
      { key: "material", val: "Cotton Canvas" },
      { key: "dimensions", val: "120 x 120 x 140 cm" }
    ]);
    setVariants([{ sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }]);
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
      image: formImages[0] || "https://sodayon.com/default-product.jpg",
      images: formImages.length > 0 ? formImages : ["https://sodayon.com/default-product.jpg"],
      ageMonthsMin: formAgeMin,
      ageMonthsMax: formAgeMax,
      ageRange: `${Math.floor(formAgeMin/12)}-${Math.floor(formAgeMax/12)}`,
      safetyScore: formSafetyScore,
      tags: formTags,
      categories: formCategory ? [formCategory] : [],
      specifications: specificationsObj,
      variants: cleanedVariants
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
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="text-blue-500 h-5 w-5" />
            Homepage Dynamic UI Grid Blocks
          </h2>

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose Category *</label>
                      <select
                        required
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                      >
                        <option value="">Select Category</option>
                        {catData?.data?.map((c: any) => (
                          <option key={c.id || c._id} value={c.id || c._id}>{c.nameEn}</option>
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

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                              const updated = [...specs];
                              updated[idx].key = e.target.value;
                              setSpecs(updated);
                            }}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-1/3"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={s.val}
                            onChange={(e) => {
                              const updated = [...specs];
                              updated[idx].val = e.target.value;
                              setSpecs(updated);
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
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input
                              type="text"
                              placeholder="SKU Code"
                              value={v.sku}
                              onChange={(e) => {
                                const updated = [...variants];
                                updated[idx].sku = e.target.value;
                                setVariants(updated);
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              placeholder="Title (English)"
                              value={v.nameEn}
                              onChange={(e) => {
                                const updated = [...variants];
                                updated[idx].nameEn = e.target.value;
                                setVariants(updated);
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              placeholder="Title (Bengali)"
                              value={v.nameBn}
                              onChange={(e) => {
                                const updated = [...variants];
                                updated[idx].nameBn = e.target.value;
                                setVariants(updated);
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bengali"
                            />
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder="Color Option"
                                value={v.color}
                                onChange={(e) => {
                                  const updated = [...variants];
                                  updated[idx].color = e.target.value;
                                  setVariants(updated);
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
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-400 mb-2">Block Section Type *</label>
                <select
                  value={uiType}
                  onChange={(e) => setUiType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="HERO_BANNER">Hero Banner</option>
                  <option value="QUICK_DEAL">Quick Deals Slider</option>
                  <option value="FLASH_SALE">Flash Sales Grid</option>
                  <option value="BEST_SELLERS">Best Sellers Section</option>
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
    </div>
  );
}
