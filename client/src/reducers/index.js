import { combineReducers } from "redux";
import alert from "./alert.js";
import auth from "./auth.js";
import intent from "./intent.js";
import report from "./report.js";

export default combineReducers({
  auth,
  alert,
  intent,
  report,
});
