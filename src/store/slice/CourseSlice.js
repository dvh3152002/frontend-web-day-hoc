import { createSlice } from "@reduxjs/toolkit";
import * as courseAction from "../action/CourseAction";

export const categorySlice = createSlice({
  name: "course",
  initialState: {
    courseDetail: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(courseAction.getDetailCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(courseAction.getDetailCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetail = action.payload;
      })
      .addCase(courseAction.getDetailCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(courseAction.updateCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(courseAction.updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetail = action.payload;
      })
      .addCase(courseAction.updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  categorySlice.actions;

export default categorySlice.reducer;
