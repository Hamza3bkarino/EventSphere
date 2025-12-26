import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './Redux/AdminSlice'
import cartReducer from './Redux/CartSlice'

export const store = configureStore({
  reducer: {
    admin:adminReducer,
    cart : cartReducer,
  },
});
