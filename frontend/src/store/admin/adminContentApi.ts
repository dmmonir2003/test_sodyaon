import { baseApi } from '../baseApi';

export const adminContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------------------------
    // MEDIA UPLOADER (Binary FormData to Cloudinary)
    // ---------------------------------------------------------
    uploadMedia: builder.mutation<{ success: boolean; url: string }, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    // ---------------------------------------------------------
    // PRODUCT CRUD
    // ---------------------------------------------------------
    getAdminProducts: builder.query<any, { search?: string; limit?: number; page?: number; categoryId?: string; sort?: string; ageRange?: string }>({
      query: ({ search = '', limit = 50, page = 1, categoryId = '', sort = '', ageRange = '' } = {}) => ({
        url: '/products',
        params: { search, limit, page, categoryId, sort, ageRange },
      }),
      providesTags: ['Product'],
    }),
    getSpecialOffers: builder.query<any, { limit?: number; page?: number } | void>({
      query: (params) => ({
        url: '/products/deals/special-offers',
        params: params || {},
      }),
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // ---------------------------------------------------------
    // BRANDS CRUD (Admin Tasks)
    // ---------------------------------------------------------
    getAdminBrands: builder.query<any, void>({
      query: () => '/brands',
    }),
    createBrand: builder.mutation<any, any>({
      query: (body) => ({
        url: '/brands',
        method: 'POST',
        body,
      }),
    }),
    deleteBrand: builder.mutation<any, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: 'DELETE',
      }),
    }),

    // ---------------------------------------------------------
    // DYNAMIC FILTERS CRUD (Admin Tasks)
    // ---------------------------------------------------------
    createFilterAttribute: builder.mutation<any, any>({
      query: (body) => ({
        url: '/filters/attributes',
        method: 'POST',
        body,
      }),
    }),
    createFilterOption: builder.mutation<any, any>({
      query: (body) => ({
        url: '/filters/options',
        method: 'POST',
        body,
      }),
    }),
    linkCategoryFilter: builder.mutation<any, any>({
      query: (body) => ({
        url: '/filters/link',
        method: 'POST',
        body,
      }),
    }),

    // ---------------------------------------------------------
    // COUPON CAMPAIGNS CRUD (Admin Tasks)
    // ---------------------------------------------------------
    getAdminCoupons: builder.query<any, void>({
      query: () => '/coupons',
    }),
    createCoupon: builder.mutation<any, any>({
      query: (body) => ({
        url: '/coupons',
        method: 'POST',
        body,
      }),
    }),
    deleteCoupon: builder.mutation<any, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
    }),

    // ---------------------------------------------------------
    // CATEGORIES CRUD
    // ---------------------------------------------------------
    getCategories: builder.query<any, { tree?: boolean }>({
      query: ({ tree = true } = {}) => ({
        url: '/categories',
        params: { tree: tree ? 'true' : 'false' },
      }),
      providesTags: ['Product'],
    }),
    createCategory: builder.mutation<any, any>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    // ---------------------------------------------------------
    // UI LAYOUT SECTIONS CRUD
    // ---------------------------------------------------------
    getUISections: builder.query<any, { includeDrafts?: boolean }>({
      query: ({ includeDrafts = true } = {}) => ({
        url: '/content/ui-sections',
        params: { includeDrafts: includeDrafts ? 'true' : 'false' },
      }),
      providesTags: ['Deals'],
    }),
    createUISection: builder.mutation<any, any>({
      query: (body) => ({
        url: '/content/ui-sections',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deals'],
    }),

    // ---------------------------------------------------------
    // CAMPAIGNS CRUD
    // ---------------------------------------------------------
    getFlashSales: builder.query<any, void>({
      query: () => '/campaigns/flash-sales',
      providesTags: ['Deals'],
    }),
    createFlashSale: builder.mutation<any, any>({
      query: (body) => ({
        url: '/campaigns/flash-sales',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deals'],
    }),

    // ---------------------------------------------------------
    // DYNAMIC MENU ITEMS CRUD (Admin Tasks)
    // ---------------------------------------------------------
    createMenuItem: builder.mutation<any, any>({
      query: (body) => ({
        url: '/menus',
        method: 'POST',
        body,
      }),
    }),
    updateMenuItem: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/menus/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteMenuItem: builder.mutation<any, string>({
      query: (id) => ({
        url: `/menus/${id}`,
        method: 'DELETE',
      }),
    }),
    parseGoogleSheet: builder.mutation<any, { sheetUrl: string; row?: number | "" }>({
      query: (body) => ({
        url: '/products/sheets/parse',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useUploadMediaMutation,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSpecialOffersQuery,
  useParseGoogleSheetMutation,
  
  // Brand CRUD Hooks
  useGetAdminBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,

  // Filter CRUD Hooks
  useCreateFilterAttributeMutation,
  useCreateFilterOptionMutation,
  useLinkCategoryFilterMutation,

  // Coupon CRUD Hooks
  useGetAdminCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,

  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetUISectionsQuery,
  useCreateUISectionMutation,
  useGetFlashSalesQuery,
  useCreateFlashSaleMutation,

  // MenuItem CRUD Hooks
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = adminContentApi;
