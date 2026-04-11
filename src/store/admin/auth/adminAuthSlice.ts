import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminAuthState, User, Role } from './adminAuthTypes';

// Initial state checks localStorage safely in Next.js environment
const initialState: AdminAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      // Runs once on client-side mount
      if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem('admin-auth-token') as Role | null;
        if (savedToken) {
          // In a real app, this would dispatch an RTK Query endpoint "useGetMeQuery" to validate the token.
          // For now, we simulate hydration dynamically using the token as the Role.
          state.user = {
            id: `usr_${Math.random().toString(36).substring(2)}`,
            email: "cached@playtime.com",
            name: savedToken.split('_').join(' '),
            role: savedToken,
            permissions: getPermissionsForRole(savedToken),
          };
          state.isAuthenticated = true;
        }
      }
      state.isLoading = false;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-auth-token', action.payload.role);
      }
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin-auth-token');
      }
    },
    setSimulatedRole: (state, action: PayloadAction<Role>) => {
      // Used by the Role Simulator Tool
      if (state.user) {
        state.user.role = action.payload;
        state.user.name = action.payload.split('_').join(' ');
        state.user.permissions = getPermissionsForRole(action.payload);
        if (typeof window !== 'undefined') {
           localStorage.setItem('admin-auth-token', action.payload);
        }
      }
    }
  },
});

// Helper for Mock
function getPermissionsForRole(role: Role) {
  const defaults = {
    canViewFinances: false, canEditFinances: false, canManageMarketing: false, canManageOrders: false, canManageContent: false, canManageTeam: false
  };
  if (role === 'SUPER_ADMIN') return { ...defaults, canViewFinances: true, canEditFinances: true, canManageMarketing: true, canManageOrders: true, canManageContent: true, canManageTeam: true };
  if (role === 'INVESTOR') return { ...defaults, canViewFinances: true };
  if (role === 'FINANCE_MANAGER') return { ...defaults, canViewFinances: true, canEditFinances: true };
  if (role === 'DIGITAL_MARKETER') return { ...defaults, canManageMarketing: true, canManageOrders: true };
  if (role === 'CONTENT_MANAGER') return { ...defaults, canManageContent: true };
  return defaults;
}

export const { hydrateAuth, loginSuccess, logoutSuccess, setSimulatedRole } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
