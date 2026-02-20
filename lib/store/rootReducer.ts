import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import premieresReducer from './slices/premieresSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  premieres: premieresReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
