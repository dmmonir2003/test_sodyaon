import { baseApi } from '../../baseApi';

export interface OrderItem {
  id: string;
  quantity: number;
  variantSku?: string;
  price?: number;
  name?: string;
}

export interface CheckoutPayload {
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress: string;
  shippingPhone: string;
  fullName: string;
  couponCode?: string;
  notes?: string;
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, CheckoutPayload>({
      query: (payload) => ({
        url: '/orders/checkout',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),
    getMyOrders: builder.query<any, void>({
      query: () => '/orders/my-orders',
      providesTags: ['Order'],
    }),
    trackOrder: builder.query<any, { orderId: string; phone?: string }>({
      query: ({ orderId, phone }) => ({
        url: `/orders/track/${orderId}`,
        params: phone ? { phone } : undefined,
      }),
      providesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),
    adminGetOrders: builder.query<any, { status?: string } | void>({
      query: (params) => ({
        url: '/orders',
        params: params || undefined,
      }),
      providesTags: ['Order'],
    }),
    adminUpdateOrderStatus: builder.mutation<any, { orderId: string; status?: string; paymentStatus?: string }>({
      query: ({ orderId, ...body }) => ({
        url: `/orders/${orderId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useTrackOrderQuery,
  useAdminGetOrdersQuery,
  useAdminUpdateOrderStatusMutation,
} = ordersApi;
