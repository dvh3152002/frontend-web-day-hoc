import { createSlice } from "@reduxjs/toolkit";
import * as categoryAction from "../action/CategoryAction";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      categoryAction.getListCategory.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.items;
      }
    );
    builder.addCase(
      categoryAction.getListCategory.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      }
    );
  },
});

export const { increment, decrement, incrementByAmount } =
  categorySlice.actions;

export default categorySlice.reducer;
