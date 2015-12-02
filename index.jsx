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

render(
	<Provider store={store}>
		<AppRouter history={history} />
	</Provider>,
	document.getElementById("react")
);
