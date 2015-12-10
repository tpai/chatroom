import { combineReducers } from "redux";
import objectAssign from "object-assign";

import * as user from "./user";
import * as channel from "./channel";
import * as msg from "./msg";

const reducers = objectAssign(
    user,
    channel,
    msg
);

export default combineReducers(reducers);
