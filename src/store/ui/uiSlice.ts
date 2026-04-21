import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
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
  },
});

export const { setMobileMenuOpen, toggleMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;