import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { syncReduxAndRouter } from "redux-simple-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import AppRouter from "./AppRouter";
import Store from "./src/store/Store";

const store = Store ();
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

import io from "socket.io-client";
export const socket = io("http://" + location.hostname + ":5555");
import { getUserList } from "./src/actions/user";

socket.on("get user list", function(list) {
	store.dispatch(getUserList(list));
});

render(
	<Provider store={store}>
		<AppRouter history={history} />
	</Provider>,
	document.getElementById("react")
);