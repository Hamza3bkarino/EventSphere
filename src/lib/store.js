import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './Redux/AdminSlice'

export const store = configureStore({
  reducer: {
    admin:adminReducer,
  },
});
