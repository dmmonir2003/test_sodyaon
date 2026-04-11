import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

// Advanced Mock Base Query Simulator for testing RTK Query architecture without a real backend.
// Replace this with standard `fetchBaseQuery({ baseUrl: '/api/' })` when you implement Node.js/PostgreSQL.
const mockBaseQuery: BaseQueryFn<
  { url: string; method?: string; body?: any },
  unknown,
  unknown
> = async ({ url, method = 'GET', body }) => {
  // Simulate network latency (400ms - 800ms)
  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 400));
  
  try {
    // Intercept specific test routes here if needed in the future
    if (url.includes('/throw-error')) {
      throw new Error("Simulated Server Error");
    }

    console.log(`[RTK-Query Mock API Logger] ${method} ${url}`, body ? body : '');
    
    // Default success return
    return { data: { success: true, message: "Mock response generated" } };
  } catch (error: any) {
    return { error: { status: 500, data: error.message } };
  }
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: mockBaseQuery,
  endpoints: () => ({}), // We inject endpoints dynamically via feature api.ts files
  tagTypes: ['Cart', 'User', 'Product', 'Finance'], // Core caching tags
});
