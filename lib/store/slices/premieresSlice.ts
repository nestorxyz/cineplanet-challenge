import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Premiere } from '../../mocks';

interface PremieresState {
  items: Premiere[];
  loading: boolean;
  error: string | null;
}

const initialState: PremieresState = {
  items: [],
  loading: false,
  error: null,
};

const premieresSlice = createSlice({
  name: 'premieres',
  initialState,
  reducers: {
    fetchPremieresRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPremieresSuccess: (state, action: PayloadAction<Premiere[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPremieresFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPremieresRequest,
  fetchPremieresSuccess,
  fetchPremieresFailure,
} = premieresSlice.actions;
export default premieresSlice.reducer;
