import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import images from "./imageUpload";
import cart from "./cart";
import tgOrder from "./tgWebReducer";

export default combineReducers({
  auth,
  cart,
  images,
  tgOrder,
});
