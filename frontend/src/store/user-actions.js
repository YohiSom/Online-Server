import { userActions } from "./user-slice";
import { registerApi, LoginApi, getLocation } from "../API/api";

export const registerUser = (name, password) => async (dispatch) => {
  try {
    const res = await registerApi(name, password);

    dispatch(userActions.userData(res));

    dispatch(
      userActions.showMessage({
        open: true,
        message: "Succesfully registered",
        type: "success",
      })
    );

    setTimeout(() => {
      dispatch(userActions.clearMessage());
    }, 2000);
  } catch (err) {
    dispatch(
      userActions.showMessage({
        open: true,
        message: err.message,
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(userActions.clearMessage());
    }, 2000);
  }
};
export const loginUser = (name, password) => async (dispatch) => {
  try {
    const res = await LoginApi(name, password);

    dispatch(userActions.userData(res));
    dispatch(
      userActions.showMessage({
        open: true,
        message: "Succesfully logged in, redirecting to dashboard",
        type: "success",
      })
    );

    setTimeout(() => {
      dispatch(userActions.clearMessage());
    }, 3000);
  } catch (err) {
    dispatch(
      userActions.showMessage({
        open: true,
        message: err.message,
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(userActions.clearMessage());
    }, 2000);
  }
};

export const setUserLocation = () => async (dispatch) => {
  try {
    const res = await getLocation();
    dispatch(userActions.handleLocation(res));
  } catch (err) {
    dispatch(
      userActions.showMessage({
        open: true,
        message: err.message,
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(userActions.clearMessage());
    }, 2000);
  }
};
