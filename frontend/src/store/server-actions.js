import { getAvailableServer } from "../API/api";
import { serverActions } from "./server-slice";

export const getLicenses = (name, location, id) => async (dispatch) => {
  try {
    const res = await getAvailableServer(name, location, id);

    dispatch(serverActions.retrieveLicenses(res));
  } catch (err) {
    dispatch(
      serverActions.sendAlert({
        onOpen: true,
        onMessage: err.message,
        onType: "error",
      })
    );
  }
};
