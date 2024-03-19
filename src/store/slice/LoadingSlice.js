import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
