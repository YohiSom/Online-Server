import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageLicense = JSON.parse(localStorage.getItem("license"));
const getLocalStorageLiveServer = JSON.parse(localStorage.getItem("live"));

const activeLicenseSlice = createSlice({
  name: "activeLicense",
  initialState: {
    licenseDetails: getLocalStorageLicense || null,
    liveServer: getLocalStorageLiveServer || null,
    message: null,
    errorMessage: null,
  },
  reducers: {
    retrieveLicenseActive(state, action) {
      state.licenseDetails = action.payload.license;
      state.liveServer = action.payload.clientServer;

      const licenseDetails = state.licenseDetails;
      const liveServer = state.liveServer;
      localStorage.setItem("license", JSON.stringify(licenseDetails));
      localStorage.setItem("live", JSON.stringify(liveServer));
    },
    handleError(state, action) {
      state.errorMessage = {
        open: true,
        message: action.payload,
        type: "error",
      };
    },
    removeLicenseExpired(state, action) {
      state.licenseDetails = null;
      state.liveServer = null;
      localStorage.removeItem("license");
      localStorage.removeItem("live");
    },
    expiredLicenseAlert(state) {
      state.message = {
        open: true,
        message: "License has expired! You are now disconnected",
        type: "error",
      };
    },
    clearAlert(state) {
      state.message = null;
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
});

export const activeLicenseActions = activeLicenseSlice.actions;
export default activeLicenseSlice;
