import { createAsyncThunk } from "@reduxjs/toolkit";
import * as courseService from "../../apis/service/CourseService";

export const getDetailCourse = createAsyncThunk(
  "courseDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await courseService.getDetailCourse(id);
      if (!res?.success) return rejectWithValue(res.error);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "updateCourse",
  async (id, data, { rejectWithValue }) => {
    try {
      const res = await courseService.updateCourse(id, data);
      console.log("res: ", res);
      if (!res?.success) return rejectWithValue(res.error);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);
