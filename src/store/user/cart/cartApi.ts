import { baseApi } from '../../baseApi';
import { CartItem } from './cartTypes';

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavedCart: builder.query<CartItem[], string>({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: 'GET'
      }),
      providesTags: ['Cart'],
    }),
    checkoutCart: builder.mutation<{ success: boolean }, CartItem[]>({
      queryFn: async (items) => {
        // Mocking an async checkout transaction
        console.log("Checking out...", items);
        await new Promise(r => setTimeout(r, 1000));
        return { data: { success: true } };
      },
      invalidatesTags: ['Cart']
    })
  })
});

export const { useGetSavedCartQuery, useCheckoutCartMutation } = cartApi;
