import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";

const reducers = Object.assign({}, {routing: routeReducer});

export default combineReducers(reducers);