import { activateLicense, stopLicense } from "../API/api";
import { activeLicenseActions } from "./activeLicense-slice";

export const handleActivationLicense =
  (id, License_Key, location, Server_Id, License_id, time) =>
  async (dispatch) => {
    try {
      const res = await activateLicense(
        id,
        License_Key,
        location,
        Server_Id,
        License_id,
        time
      );
      const license = res.licenseDetails;
      const clientServer = res.liveServer;

      dispatch(
        activeLicenseActions.retrieveLicenseActive({ license, clientServer })
      );
    } catch (err) {
      dispatch(activeLicenseActions.handleError(err.message));
      setTimeout(() => {
        dispatch(activeLicenseActions.clearError());
      }, 3000);
    }
  };

export const licenseExpired = () => async (dispatch) => {
  // try {
  //   const res = await stopLicense(licenceId, _id, serverId);

  dispatch(activeLicenseActions.removeLicenseExpired());
  dispatch(activeLicenseActions.expiredLicenseAlert());

  setTimeout(() => {
    dispatch(activeLicenseActions.clearAlert());
  }, 3000);
  // } catch (err) {
  // //   dispatch(activeLicenseActions.handleError(err.message));
  //   setTimeout(() => {
  //     dispatch(activeLicenseActions.clearError());
  //   }, 3000);
  // }
};
