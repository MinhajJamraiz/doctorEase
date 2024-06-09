import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATED,
  USER_UPDATE_FAILED,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "./../utils/setAuthToken";

//LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:5000/api/v1/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL });
  }

  // }
};

//UPDATE USER
export const updatePassword =
  ({ id, password, newPassword }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const updatedUser = JSON.stringify({
      id,
      password,
      newPassword,
    });
    if (!password || !newPassword) {
      dispatch(setAlert("Password or New Password can not be empty", "error"));
      return;
    }
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/user/updateMyPassword",
        updatedUser,
        config
      );
      dispatch({
        type: USER_UPDATED,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setAlert("User Password Updated Successfully", "success"));
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      if (
        err.response.data.message &&
        err.response.data.message === "Incorrect current password."
      ) {
        dispatch(setAlert(`${err.response.data.message}`, "error"));
      } else {
        dispatch(setAlert(`${err.response.data.message}`, "error"));
        dispatch({ type: USER_UPDATE_FAILED });
      }
    }
  };
//REGISTER USER
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newUser = JSON.stringify({
      name,
      email,
      password,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        newUser,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setAlert("User Sign up Successfully", "success"));
    } catch (err) {
      //   console.log(err);
      const error = err.response.data.error;
      const errorObject = error.errors;
      // console.log(error);
      // dispatch(setAlert(error, "error"));
      // console.log(errorObject.password.kind);
      if (errorObject) {
        Object.entries(errorObject).map((error) => {
          // console.log(error[1].message);
          if (error[1].kind === "minlength") {
            dispatch(
              setAlert("The password must have minimum 8 characters.", "error")
            );
          } else dispatch(setAlert(error[1].message, "error"));
        });
      } else if (error.code === 11000)
        dispatch(
          setAlert(
            "This email already exsists in our database. Please use a different email.",
            "error"
          )
        );
      else {
        dispatch(setAlert(error.message, "error"));
      }

      // if (errorObject) {
      //   errorObject.forEach((error) => {
      //     dispatch(setAlert(error.message, "error"));
      //   });
      //   } else {
      //     dispatch(setAlert(error.message, "error"));
      //   }

      dispatch({ type: REGISTER_FAIL });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const user = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        user,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setAlert("User Logged in Successfully", "success"));
    } catch (err) {
      //   console.log(err);
      const error = err.response.data;

      dispatch(setAlert(error.message, "error"));

      // if (errorObject) {
      //   errorObject.forEach((error) => {
      //     dispatch(setAlert(error.message, "error"));
      //   });
      //   } else {
      //     dispatch(setAlert(error.message, "error"));
      //   }

      dispatch({ type: LOGIN_FAIL });
    }
  };

//LOGOUT == CLEAR PROFILE
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("User Logout Successful", "success"));
};
