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
export const socket = io("http://" + location.hostname + ":" + (process.env.PORT || 5555));
import { setUserData, getUserList } from "./src/actions/user";
import { setCurrentChannel, getChannelList } from "./src/actions/channel";
import { getMessageList } from "./src/actions/msg";

socket.on("set user data", function(data) {
    store.dispatch(setUserData(data));
});

socket.on("get user list", function(list) {
	store.dispatch(getUserList(list));
});

socket.on("get channel list", function(list) {
	store.dispatch(getChannelList(list));
});

socket.on("get message list", function(list) {
    store.dispatch(getMessageList(list));
});

socket.on("update message list", function() {
    store.dispatch(setCurrentChannel(store.getState().currentChannel));
});

render(
	<Provider store={store}>
		<AppRouter history={history} />
	</Provider>,
	document.getElementById("react")
);
