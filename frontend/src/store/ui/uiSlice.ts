import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isMobileMenuOpen: boolean;
  isMobileSearchOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isMobileSearchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileSearchOpen(state, action: PayloadAction<boolean>) {
      state.isMobileSearchOpen = action.payload;
    },
    toggleMobileSearch(state) {
      state.isMobileSearchOpen = !state.isMobileSearchOpen;
    },
  },
});

export const { setMobileMenuOpen, toggleMobileMenu, setMobileSearchOpen, toggleMobileSearch } = uiSlice.actions;
export default uiSlice.reducer;