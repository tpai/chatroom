import store from 'redux/store';
import { setUserData } from 'redux/modules/userData';
import { getUserList } from 'redux/modules/userList';
import { getChannelList } from 'redux/modules/channelList';
import { setCurrentChannel } from 'redux/modules/currentChannel';
import { getMessageList } from 'redux/modules/messageList';

import io from 'socket.io-client';

const socket = io.connect('http://' + location.host, {
    'force new connection': true
});

export default socket;

socket.on('set user data', function(data) {
    store.dispatch(setUserData(data));
});

socket.on('get user list', function(list) {
    store.dispatch(getUserList(list));
});

socket.on('get channel list', function(list) {
    store.dispatch(getChannelList(list));
});

socket.on('get message list', function(list) {
    store.dispatch(getMessageList(list));
});

socket.on('update message list', function() {
    store.dispatch(setCurrentChannel(store.getState().currentChannel));
});
