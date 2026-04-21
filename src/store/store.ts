import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import adminAuthReducer from './admin/auth/adminAuthSlice';
import financeReducer from './admin/finance/financeSlice';
import cartReducer from './user/cart/cartSlice';
import profileReducer from './user/profile/profileSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    // RTK Query Cache Reducer
    [baseApi.reducerPath]: baseApi.reducer,
    
    // Feature Slices
    adminAuth: adminAuthReducer,
    finance: financeReducer,
    cart: cartReducer,
    profile: profileReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
