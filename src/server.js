/* global process */
/* global __dirname */
import dotenv from 'dotenv';
dotenv.load();

import http from 'server.http';
import socketServer from 'socket.io';
import _ from 'lodash';

import {
    getChannelList,
    getMessageList,
    sendMessage
} from 'server.mongo';

const io = socketServer.listen(http, { log: false });

let users = [];
let names = [
    'Athony', 'Billy', 'Carter', 'Demian',
    'Elis', 'Francis', 'Greg', 'Ian', 'Josh',
    'Ken', 'Luis', 'Moris', 'Nico', 'Orgrim'
];

io.on("connection", function(socket) {

    const user = {
        id: socket.id,
        name: names[_.random(0, names.length - 1)],
        channelId: -1
    };
    // Set user data
    socket.emit("set user data", user);

    // Add user to list and update
    users.push(user);
    io.emit("get user list", users);

    // Get channel list for user
    getChannelList(result => {
        socket.emit("get channel list", result);
    });

    console.log("[Connect]", socket.id);

    socket.on("disconnect", () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit("get user list", users);
        console.log("[Disconnect]", socket.id);
    });

    socket.on("get user list", () => {
        socket.emit("get user list", users);
    });

    socket.on("get channel list", () => {
        getChannelList(result => {
            socket.emit("get channel list", result);
        });
    });

    socket.on("set current channel", channelId => {
        users.map(user => {
            if (user.id === socket.id) {
                return _.assign(user, { channelId });
            }
            return user;
        });
        // get user list
        getMessageList(channelId, result => {
            socket.emit("get message list", result);
        });
    });

    socket.on("send message", msg => {
        sendMessage(msg, () => {
            io.emit("update message list");
        });
    });
});
