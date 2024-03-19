import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../apis/service/UserService";

export const getProfile = createAsyncThunk(
  "user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userService.getProfile();
      if (!res?.success) return rejectWithValue(res.error);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);
