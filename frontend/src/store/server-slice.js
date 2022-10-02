import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("user"));

const serverSlice = createSlice({
  name: "server",
  initialState: {
    licenses: null,
    message: null,
  },
  reducers: {
    retrieveLicenses(state, action) {
      state.licenses = action.payload;
      state.message = null;
    },
    sendAlert(state, action) {
      state.message = action.payload;
    },
  },
});

export const serverActions = serverSlice.actions;
export default serverSlice;
