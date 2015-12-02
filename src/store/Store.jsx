import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";

import reducer from "../reducers";

const logger = createLogger();

let middleware = [thunk];

middleware = __DEVELOPMENT__?[...middleware, promise, logger]:middleware;

const createStoreWithMiddleware = 
	applyMiddleware(...middleware)(createStore);

export default function Store(initState) {
	const store = createStoreWithMiddleware(reducer, initState);
	return store;
}