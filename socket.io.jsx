import io from "socket.io-client";
export const socket = io("http://" + location.hostname + ":8051");
import { store } from "./index";
import { setUserData, getUserList } from "./src/actions/user";
import { getChannelList, setCurrentChannel } from "./src/actions/channel";
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

