import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, Profile } from './profileTypes';

// Load auth from localStorage if available (Client-side only)
const getInitialState = (): ProfileState => {
  if (typeof window !== 'undefined') {
    try {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');
      if (storedToken && storedUser) {
        return {
          data: JSON.parse(storedUser),
          isAuthenticated: true,
          token: storedToken,
          isLoading: false,
        };
      }
    } catch (e) {
      console.error("Failed to parse auth user", e);
    }
  }
  return {
    data: null,
    isAuthenticated: false,
    token: null,
    isLoading: false,
  };
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: getInitialState(),
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: Profile; token: string }>) {
      state.data = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
        // Save to cookie for Next.js Middleware
        document.cookie = `auth_token=${action.payload.token}; path=/; max-age=86400`;
      }
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.data = action.payload;
      if (typeof window !== 'undefined' && state.isAuthenticated) {
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      }
    },
    logout(state) {
      state.data = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        // Clear cookie
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  },
});

export const { setCredentials, setProfile, logout } = profileSlice.actions;
export default profileSlice.reducer;
