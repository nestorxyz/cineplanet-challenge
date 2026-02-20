import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandyStoreProduct } from '../../mocks';

interface CandyStoreState {
  items: CandyStoreProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: CandyStoreState = {
  items: [],
  loading: false,
  error: null,
};

const candystoreSlice = createSlice({
  name: 'candystore',
  initialState,
  reducers: {
    fetchCandyStoreRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandyStoreSuccess: (
      state,
      action: PayloadAction<CandyStoreProduct[]>,
    ) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCandyStoreFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCandyStoreRequest,
  fetchCandyStoreSuccess,
  fetchCandyStoreFailure,
} = candystoreSlice.actions;

export default candystoreSlice.reducer;
