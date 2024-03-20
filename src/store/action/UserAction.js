import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../apis/service/UserService";

export const getProfile = createAsyncThunk(
  "user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userService.getProfile();
      if (!res?.success) return rejectWithValue({ error: res.error });
      return res.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const getDetailUser = createAsyncThunk(
  "userDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userService.getDetailUser(id);
      if (!res?.success) return rejectWithValue({ error: res.error });
      return res.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
