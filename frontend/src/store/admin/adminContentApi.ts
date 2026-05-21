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
    getAdminProducts: builder.query<any, { search?: string; limit?: number; page?: number }>({
      query: ({ search = '', limit = 50, page = 1 } = {}) => ({
        url: '/products',
        params: { search, limit, page },
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
  }),
});

export const {
  useUploadMediaMutation,
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
} = adminContentApi;
