import { createSlice } from "@reduxjs/toolkit";
import * as userAction from "../action/UserAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userDetail: null,
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
    builder
      .addCase(userAction.getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userAction.getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userAction.getProfile.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userAction.getDetailUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userAction.getDetailUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
      })
      .addCase(userAction.getDetailUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
