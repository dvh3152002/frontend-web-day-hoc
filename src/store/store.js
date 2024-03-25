import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/CategorySlice";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import loadingSlice from "./slice/LoadingSlice";
import courseSlice from "./slice/CourseSlice";

const commonConfig = {
  key: "web/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "accessToken", "role"],
};

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    user: persistReducer(userConfig, userSlice),
    course: courseSlice,
    loading: loadingSlice,
  },
});

export const persistor = persistStore(store);
