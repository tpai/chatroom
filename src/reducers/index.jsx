import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";

import * as user from "./user";
import * as channel from "./channel";
import * as msg from "./msg";
import * as socket from "./socket";

const reducers = Object.assign(
    user,
    channel,
    msg,
    socket,
    {routing: routeReducer}
);

export default combineReducers(reducers);
