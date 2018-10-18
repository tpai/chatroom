/* global API_SERVER_ADDRESS */

import io from 'socket.io-client';

import store from 'redux/store';
import { setData as setUsers } from 'redux/modules/users';
import { setData as setMessages } from 'redux/modules/messages';

const socket = io(API_SERVER_ADDRESS);

socket.on('getUsers', (data) => {
  store.dispatch(setUsers(data));
});

socket.on('getMessages', (data) => {
  store.dispatch(setMessages(data));
});

socket.on('Error', (err) => {
  console.log(err);
});

export const joinChannel = (data) => {
  socket.emit('joinChannel', data);
};

export const leaveChannel = (data) => {
  socket.emit('leaveChannel', data);
};

export const sendMessage = (data) => {
  socket.emit('sendMessage', data);
};

export default socket;
