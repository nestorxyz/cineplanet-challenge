import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  isGuest: boolean;
  guestName: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isGuest: false,
  guestName: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isGuest = false;
      state.guestName = null;
      state.loading = false;
    },
    setGuest: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isGuest = true;
      state.guestName = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.user = null;
      state.isGuest = false;
      state.guestName = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, setGuest, signOut, setError } =
  authSlice.actions;
export default authSlice.reducer;
