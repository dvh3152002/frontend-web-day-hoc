import { createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryService from "../../apis/service/CategoryService";

export const getListCategory = createAsyncThunk(
  "categories",
  async (data, { rejectWithValue }) => {
    try {
      const res = await categoryService.getListCategory();
      if (!res?.success) return rejectWithValue(res.error);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);
