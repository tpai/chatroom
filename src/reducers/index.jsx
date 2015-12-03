import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";

import * as user from "./user";
import * as channel from "./channel";

const reducers = Object.assign(user, channel, {routing: routeReducer});

export default combineReducers(reducers);