import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, Profile } from './profileTypes';

const initialState: ProfileState = {
  data: null,
  isLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.data = action.payload;
    },
    clearProfile(state) {
      state.data = null;
    }
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
