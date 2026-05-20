import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      // Attach JWT token from cookie automatically if needed
      if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/);
        if (match) {
          headers.set('Authorization', `Bearer ${decodeURIComponent(match[1])}`);
        }
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // Endpoints are injected dynamically via feature api.ts files
  tagTypes: ['Cart', 'User', 'Product', 'Finance', 'Order', 'Blog', 'Deals'],
});
