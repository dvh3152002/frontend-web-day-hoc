import { createSlice } from "@reduxjs/toolkit";
import * as userAction from "../action/UserAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoggedIn: false,
    accessToken: "",
    role: "",
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
      state.accessToken = "";
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAction.getProfile.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(userAction.getProfile.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.user = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(userAction.getProfile.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
