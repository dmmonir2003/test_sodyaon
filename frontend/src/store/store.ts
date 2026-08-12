import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import adminAuthReducer from './admin/auth/adminAuthSlice';
import financeReducer from './admin/finance/financeSlice';
import cartReducer from './user/cart/cartSlice';
import profileReducer from './user/profile/profileSlice';
import uiReducer from './ui/uiSlice';
import { trackClientAddToCart } from '@/utils/marketing';

const analyticsMiddleware = (storeApi: any) => (next: any) => (action: any) => {
  if (action.type === 'cart/addItem') {
    const item = action.payload;
    if (item) {
      const eventId = `add_to_cart_${item.id}_${Date.now()}`;
      trackClientAddToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
        },
        item.quantity || 1,
        eventId
      );
    }
  }
  return next(action);
};

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
    getDefaultMiddleware().concat(baseApi.middleware, analyticsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
