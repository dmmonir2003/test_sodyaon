"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/admin/AuthContext";
import {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useUploadMediaMutation,
  useGetUISectionsQuery,
  useGetFlashSalesQuery
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
  Layers
} from "lucide-react";

export default function ContentPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "ui-sections" | "campaigns">("products");
  
  // Search & Pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const { data: prodData, isLoading: prodsLoading, refetch: refetchProds } = useGetAdminProductsQuery({ search: searchQuery });
  const { data: catData } = useGetCategoriesQuery({ tree: true });
  const { data: uiData } = useGetUISectionsQuery({ includeDrafts: true });
  const { data: campData } = useGetFlashSalesQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProductMutation();
  const [uploadMedia, { isLoading: isUploadingImage }] = useUploadMediaMutation();

  // Floating Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form State
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
  
  // Lists
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Specifications Key-Value grid
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>([
    { key: "material", val: "Cotton Canvas" },
    { key: "dimensions", val: "120 x 120 x 140 cm" }
  ]);

  // Variant options grid
  const [variants, setVariants] = useState<{ sku: string; nameEn: string; nameBn: string; price: number; stock: number; color: string }[]>([
    { sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }
  ]);

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

  // Add Dynamic Spec Row
  const addSpecRow = () => setSpecs([...specs, { key: "", val: "" }]);
  const removeSpecRow = (idx: number) => setSpecs(specs.filter((_, i) => i !== idx));

  // Add Dynamic Variant Row
  const addVariantRow = () => setVariants([...variants, { sku: "", nameEn: "", nameBn: "", price: 0, stock: 10, color: "" }]);
  const removeVariantRow = (idx: number) => setVariants(variants.filter((_, i) => i !== idx));

  // Handle form submission
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSku || !formNameEn || !formNameBn || !formPrice) {
      alert("Please fill in all mandatory core fields.");
      return;
    }

    // Transform specs list to JSON object
    const specificationsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key) specificationsObj[s.key] = s.val;
    });

    // Clean variants array
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
      await createProduct(finalPayload).unwrap();
      setUploadSuccess(true);
      refetchProds();
      setTimeout(() => {
        setIsModalOpen(false);
        setUploadSuccess(false);
        // Reset states
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
        setFormImages([]);
        setFormTags([]);
      }, 1500);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create product model.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Edit3 className="h-8 w-8 text-amber-400" />
            Content & Product CMS
          </h1>
          <p className="text-slate-400 mt-1">Manage storefront designs, visual sections, and product inventories.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Product
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-2 border-b border-slate-850">
        <button
          onClick={() => setActiveTab("products")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 ${
            activeTab === "products" ? "border-amber-500 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Plus className="h-4 w-4" />
          Product Catalogue ({prodData?.total || 0})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 ${
            activeTab === "categories" ? "border-amber-500 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Layers className="h-4 w-4" />
          Categories Tree ({catData?.results || 0})
        </button>
        <button
          onClick={() => setActiveTab("ui-sections")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 ${
            activeTab === "ui-sections" ? "border-amber-500 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <LayoutTemplate className="h-4 w-4" />
          Landing UI Sections ({uiData?.results || 0})
        </button>
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`py-3 px-6 font-bold text-sm transition-all border-b-2 ${
            activeTab === "campaigns" ? "border-amber-500 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"
          } flex items-center gap-2 rounded-t-xl`}
        >
          <Calendar className="h-4 w-4" />
          Campaigns ({campData?.results || 0})
        </button>
      </div>

      {/* Product Catalog Tab content */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* List of Products (2 Cols) */}
          <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-white">Active Product Inventory</h2>
              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-slate-950 border border-slate-800 py-2 pl-4 pr-10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            {prodsLoading ? (
              <div className="py-12 text-center text-slate-500 text-sm">Loading products catalogue...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-3 px-2">Image</th>
                      <th className="py-3 px-2">SKU / Model</th>
                      <th className="py-3 px-2">Product Name</th>
                      <th className="py-3 px-2 text-right">Price</th>
                      <th className="py-3 px-2 text-center">Variants</th>
                      <th className="py-3 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prodData?.data?.map((p: any) => (
                      <tr key={p.id} className="border-b border-slate-850 hover:bg-slate-850/30 transition-colors group">
                        <td className="py-3 px-2">
                          <img
                            src={p.image}
                            alt={p.nameEn}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-800"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-bold text-slate-300">{p.sku}</div>
                          <div className="text-xs text-slate-500">{p.modelCode || "No model code"}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">{p.nameEn}</div>
                          <div className="text-xs text-slate-400 font-bengali">{p.nameBn}</div>
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-emerald-400">
                          ৳{p.price}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">
                            {p.variants?.length || 0}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this product?")) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Stats Panel (1 Col) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Inventory Breakdown</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total SKU items</div>
                  <div className="text-2xl font-black text-white mt-1">{prodData?.total || 0}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Categories</div>
                  <div className="text-2xl font-black text-amber-500 mt-1">{catData?.results || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories tree preview */}
      {activeTab === "categories" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Taxonomy Hierarchy Tree</h2>
          <div className="space-y-4">
            {catData?.data?.map((c: any) => (
              <div key={c.id} className="border border-slate-850 p-4 rounded-xl bg-slate-950/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {c.icon && <img src={c.icon} alt="" className="w-6 h-6 object-contain" />}
                    <div>
                      <span className="font-bold text-white">{c.nameEn}</span>
                      <span className="text-xs text-slate-400 font-bengali ml-2">({c.nameBn})</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">Root</span>
                </div>
                
                {/* Children categories */}
                {c.children && c.children.length > 0 && (
                  <div className="pl-8 mt-3 border-l border-slate-800 space-y-2">
                    {c.children.map((child: any) => (
                      <div key={child.id} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-900">
                        <span className="text-slate-300">{child.nameEn} ({child.nameBn})</span>
                        <span className="text-xs text-slate-500">Slug: {child.slug}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Landing UI Section content */}
      {activeTab === "ui-sections" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Active Layout Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uiData?.data?.map((sec: any) => (
              <div key={sec.id} className="border border-slate-800 rounded-xl p-4 bg-slate-950/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{sec.titleEn}</div>
                  <div className="text-xs text-slate-500">Type: {sec.type} | Style: {sec.layoutStyle}</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns content */}
      {activeTab === "campaigns" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Scheduled Sales Campaigns</h2>
          <div className="space-y-4">
            {campData?.data?.map((camp: any) => (
              <div key={camp.id} className="border border-slate-800 p-4 rounded-xl bg-slate-950/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{camp.titleEn}</div>
                  <div className="text-xs text-slate-500">
                    Schedule: {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                  </div>
                </div>
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold">Scheduled</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Add Product Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col my-8 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center bg-slate-950/80 px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-500" />
                Add New Product to Sodayon Catalogue
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Scroll Container */}
            <form onSubmit={handleSubmitProduct} className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300">
              {uploadSuccess ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce mb-4" />
                  <h3 className="text-2xl font-black text-white">Product Created Successfully!</h3>
                  <p className="text-slate-400 text-sm mt-1">Catalogue is syncing in background.</p>
                </div>
              ) : (
                <>
                  {/* Row 1: Core IDs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Master SKU *</label>
                      <input
                        type="text"
                        required
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        placeholder="e.g., SDY-PLY-TENT"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">URL Slug</label>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="e.g., playhouse-tent (Auto generated if blank)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category *</label>
                      <select
                        required
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="">Select Category</option>
                        {catData?.data?.map((c: any) => (
                          <option key={c.id} value={c.id}>{c.nameEn}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Localization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Product Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={formNameEn}
                        onChange={(e) => setFormNameEn(e.target.value)}
                        placeholder="e.g. Playhouse canvas tent"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Product Title (Bengali) *</label>
                      <input
                        type="text"
                        required
                        value={formNameBn}
                        onChange={(e) => setFormNameBn(e.target.value)}
                        placeholder="যেমন: খেলনা তাঁবু"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bengali"
                      />
                    </div>
                  </div>

                  {/* Row 3: Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description (English)</label>
                      <textarea
                        rows={3}
                        value={formDescEn}
                        onChange={(e) => setFormDescEn(e.target.value)}
                        placeholder="Premium Canvas tent description..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description (Bengali)</label>
                      <textarea
                        rows={3}
                        value={formDescBn}
                        onChange={(e) => setFormDescBn(e.target.value)}
                        placeholder="খেলনা তাঁবুর বর্ণনা..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bengali"
                      />
                    </div>
                  </div>

                  {/* Row 4: Brands & Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Brand (English)</label>
                      <input
                        type="text"
                        value={formBrandEn}
                        onChange={(e) => setFormBrandEn(e.target.value)}
                        placeholder="Sodayon"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Brand (Bengali)</label>
                      <input
                        type="text"
                        value={formBrandBn}
                        onChange={(e) => setFormBrandBn(e.target.value)}
                        placeholder="সদায়ণ"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bengali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Selling Price (৳) *</label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Original Strike Price (৳)</label>
                      <input
                        type="number"
                        value={formOriginalPrice}
                        onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Row 5: Safety Score & Age limits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Safety Score (1-10)</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={formSafetyScore}
                        onChange={(e) => setFormSafetyScore(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Min Age (Months)</label>
                      <input
                        type="number"
                        value={formAgeMin}
                        onChange={(e) => setFormAgeMin(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Max Age (Months)</label>
                      <input
                        type="number"
                        value={formAgeMax}
                        onChange={(e) => setFormAgeMax(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Dynamic Tags */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tags / Search Milestones</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag and press Add"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tagInput.trim()) {
                            setFormTags([...formTags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formTags.map((t, idx) => (
                        <span key={idx} className="bg-slate-800 text-amber-400 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
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

                  {/* Media Upload (Cloudinary integration) */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <UploadCloud className="h-5 w-5 text-amber-500" />
                      Dynamic Media Assets Uploader
                    </h4>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Upload Button */}
                      <label className="cursor-pointer bg-slate-900 border-2 border-dashed border-slate-800 hover:border-amber-500 p-6 rounded-xl flex flex-col items-center justify-center w-36 h-36 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                        />
                        {isUploadingImage ? (
                          <span className="text-xs text-amber-500 font-bold animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <UploadCloud className="h-6 w-6 text-slate-400 mb-1" />
                            <span className="text-xs text-slate-400 text-center font-semibold">Upload Image</span>
                          </>
                        )}
                      </label>

                      {/* Preview uploads */}
                      {formImages.map((img, idx) => (
                        <div key={idx} className="relative w-36 h-36 rounded-xl overflow-hidden border border-slate-800 group">
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
                      <h4 className="text-sm font-bold text-white">Polymorphic Attributes (Specifications Grid)</h4>
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
                            placeholder="Specification Key (e.g. Weight)"
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
                            placeholder="Value (e.g. 2.5 kg)"
                            value={s.val}
                            onChange={(e) => {
                              const updated = [...specs];
                              updated[idx].val = e.target.value;
                              setSpecs(updated);
                            }}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeSpecRow(idx)}
                            className="text-red-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Variational SKU Matrix */}
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-white">Variational SKU Matrix (Sizes / Colors Options)</h4>
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
                        <div key={idx} className="border-b border-slate-850 pb-3 space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input
                              type="text"
                              placeholder="Variant SKU (e.g. SDY-TENT-BLU)"
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
                                placeholder="Color / Variant Option"
                                value={v.color}
                                onChange={(e) => {
                                  const updated = [...variants];
                                  updated[idx].color = e.target.value;
                                  setVariants(updated);
                                }}
                                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => removeVariantRow(idx)}
                                className="text-red-500 hover:text-red-400 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-slate-850 bg-slate-950/40 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2.5 px-6 rounded-xl transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingProduct}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingProduct ? "Syncing..." : "Publish Product"}
                    </button>
                  </div>
                </>
              )}
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
