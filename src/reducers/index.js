/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
"use strict";
/**
 * ## Imports
 *
 */
import auth from "./auth/authReducer";
import device from "./device/deviceReducer";
import storedata from "./storedata/storedataReducer";

import { combineReducers } from "@reduxjs/toolkit";

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  storedata,
});

export default rootReducer;
