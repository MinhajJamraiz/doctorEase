import { GET_REPORTS, DELETE_REPORTS } from "./../actions/types";
import { setAlert } from "./alert";
import axios from "axios";

export const setReports =
  ({ id }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_REPORTS });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      user: id,
    };
    await axios
      .post("http://localhost:5000/api/v1/report/getUserReports", body, config)
      .then((res) => {
        if (res) {
          dispatch({ type: GET_REPORTS, payload: res.data.reports });
        }
      })

      .catch((err) => {
        dispatch({ type: DELETE_REPORTS });
        dispatch(setAlert("Could not get User Reports. Try again.", "error"));
        console.log(err);
      });
    //   JSON.stringify(intents);

    // CHeceking If a Intent already exsists in the state.
    // If true , search based upon name rather than Examples. ( After First Intent)
    // Else Search based on Examples. (If Intent)
  };

export const removeReport = () => (dispatch) => {
  dispatch({ type: DELETE_REPORTS });
};
