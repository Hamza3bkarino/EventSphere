import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
    updatePage: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
   toggleUpdatePage: (state) => {
    state.updatePage = !state.updatePage;
    },

  },
});

export const { setAdmin , toggleUpdatePage} = adminSlice.actions;
export default adminSlice.reducer;
