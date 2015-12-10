import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import Store from "./src/store/Store";
import "./socket.io";

export const store = Store ();

render(
	<Provider store={store}>
		<AppRouter />
	</Provider>,
	document.getElementById("react")
);
