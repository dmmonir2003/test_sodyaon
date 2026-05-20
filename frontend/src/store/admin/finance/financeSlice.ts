import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FinanceState, FinanceLedger } from './financeTypes';

const initialState: FinanceState = {
  ledger: null,
  isLoading: false,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setLedger(state, action: PayloadAction<FinanceLedger>) {
      state.ledger = action.payload;
    }
  },
});

export const { setLedger } = financeSlice.actions;
export default financeSlice.reducer;
