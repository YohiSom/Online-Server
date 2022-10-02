import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import serverSlice from "./server-slice";
import activeLicenseSlice from "./activeLicense-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    server: serverSlice.reducer,
    activeLicense: activeLicenseSlice.reducer,
  },
});

export default store;
