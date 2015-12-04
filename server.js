/* global process */
/* global __dirname */
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    port = (process.env.PORT || 5555),
    mongodb = require('mongodb').MongoClient,
    url = require("./config");

process.env.PORT && app.use(express.static(__dirname));
server.listen(port);

var users = [];

io.on("connection", function(socket) {
    console.log("New socket connection!");

    users.push({ id: socket.id, name: "" });

    getUserList(socket);
    getChannelList(socket);

    socket.on("disconnect", function() {
        var index = users.indexOf(users.filter(function(user){return user.id === socket.id;}).shift());
        users.splice(index, 1);
        io.emit("get user list", users);
    });

    socket.on("new user", function(username) {
        var index = users.indexOf(users.filter(function(user){return user.id === socket.id;}).shift());
        users[index].name = username;
        io.emit("get user list", users);
    });

    socket.on("get user list", function() {
        socket.emit("get user list", users);
    });

    socket.on("get channel list", function() {
        getChannelList();
    });
});

var getUserList = function(socket) {
    io.emit("get user list", users);
};

var getChannelList = function(socket) {
    mongodb.connect(url, function(err, db) {
        db.collection("channels").find({}).toArray(function(err, result) {
            socket.emit("get channel list", result);
            db.close();
        });
    });
};
