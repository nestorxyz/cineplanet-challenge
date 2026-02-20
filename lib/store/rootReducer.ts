import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import premieresReducer from './slices/premieresSlice';
import candystoreReducer from './slices/candystoreSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  premieres: premieresReducer,
  candystore: candystoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
