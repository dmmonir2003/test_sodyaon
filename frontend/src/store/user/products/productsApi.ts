import { baseApi } from '../../baseApi';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  brand?: string;
  isFeatured?: string;
  categoryId?: number | string;
  ageRange?: string;
  search?: string;
  sort?: string;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get all products with filters
    getProducts: builder.query<any, GetProductsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        return {
          url: `/products?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),

    // 2. Get single product by Mongo ObjectId or numeric ID
    getProductById: builder.query<any, string | number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // 3. EAV Facet Filters
    getCategoryFilters: builder.query<any, string | number>({
      query: (categoryId) => ({
        url: `/filters/category/${categoryId}`,
        method: 'GET',
      }),
    }),

    // 4. Coupons & Checkout
    validateCoupon: builder.mutation<any, { code: string; subtotal: number }>({
      query: (body) => ({
        url: '/coupons/validate',
        method: 'POST',
        body,
      }),
    }),

    checkoutOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: '/orders/checkout',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),

    // 5. UGC Verified Reviews
    getProductReviews: builder.query<any, { productId: string; page?: number; limit?: number }>({
      query: ({ productId, page = 1, limit = 10 }) => ({
        url: `/reviews/product/${productId}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

    checkProductPurchase: builder.query<{ success: boolean; purchased: boolean }, string>({
      query: (productId) => ({
        url: `/reviews/check-purchase/${productId}`,
        method: 'GET',
      }),
    }),

    createReview: builder.mutation<any, { productId: string; rating: number; body: string; images?: string[] }>({
      query: (body) => ({
        url: '/reviews',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),

    // 6. pre-purchase parenting Q&A
    getProductQA: builder.query<any, { productId: string; page?: number; limit?: number }>({
      query: ({ productId, page = 1, limit = 10 }) => ({
        url: `/qa/product/${productId}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

    askQuestion: builder.mutation<any, { productId: string; question: string }>({
      query: (body) => ({
        url: '/qa',
        method: 'POST',
        body,
      }),
    }),

    answerQuestion: builder.mutation<any, { qaId: string; answer: string }>({
      query: ({ qaId, answer }) => ({
        url: `/qa/${qaId}/answer`,
        method: 'POST',
        body: { answer },
      }),
    }),

    // 7. custom pool combos validation
    validateCombo: builder.mutation<any, { templateId: string; items: any[] }>({
      query: (body) => ({
        url: '/combos/validate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoryFiltersQuery,
  useValidateCouponMutation,
  useCheckoutOrderMutation,
  useGetProductReviewsQuery,
  useCheckProductPurchaseQuery,
  useCreateReviewMutation,
  useGetProductQAQuery,
  useAskQuestionMutation,
  useAnswerQuestionMutation,
  useValidateComboMutation,
} = productsApi;
