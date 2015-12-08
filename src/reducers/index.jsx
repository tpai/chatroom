import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";

import * as user from "./user";
import * as channel from "./channel";
import * as msg from "./msg";

const reducers = Object.assign(user, channel, msg, {routing: routeReducer});

export default combineReducers(reducers);
