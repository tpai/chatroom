import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";

import * as user from "./user";

const reducers = Object.assign(user, {routing: routeReducer});

export default combineReducers(reducers);