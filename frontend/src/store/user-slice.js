import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getLocalStorage || null,
    location: null,
    message: null,
  },
  reducers: {
    userData(state, action) {
      state.user = action.payload;
      const user = state.user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    showMessage(state, action) {
      state.message = {
        open: action.payload.open,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearMessage(state, action) {
      state.message = null;
    },
    handleLocation(state, action) {
      state.location = action.payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
