/* global process */
/* global __dirname */
require("dotenv").load();

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    port = (process.env.SERVER_PORT || 8080),
    mongodb = require('mongodb').MongoClient,
    _ = require("lodash")
    path = require('path');

var root = path.resolve(__dirname, './www');
app.use(express.static(root));
app.get('*', function (req, res) {
  res.sendFile(path.join(root, 'index.html'))
})
server.listen(port);

var users = [];
var username = require("./username");

io.on("connection", function(socket) {
    var name = username[Math.ceil(Math.random()*username.length-1)];

    var user = { id: socket.id, name: name, channelId: -1 };
    console.log("[Connect]", user);
    users.push(user);
    socket.emit("set user data", user);

    getUserList(socket);
    getChannelList(socket);

    socket.on("disconnect", function() {
        var index = getUserIndex(socket);
        console.log("[Disconnect]", users[index]);
        users.splice(index, 1);
        io.emit("get user list", users);
    });

    socket.on("set current channel", function(channelId) {
        var index = getUserIndex(socket);
        users[index].channelId = channelId;
        getMessageList(socket, channelId);
    });

    socket.on("get user list", function() {
        socket.emit("get user list", users);
    });

    socket.on("get channel list", function() {
        getChannelList(socket);
    });

    socket.on("send message", function(msg) {
        sendMessage(msg);
    });
});

var getUserIndex = function(socket) {
   return  _.findKey(users, function(user) {return user.id === socket.id;});
};

var getUserList = function(socket) {
    io.emit("get user list", users);
};

var getChannelList = function(socket) {
    mongodb.connect(process.env.MONGO_URL, function(err, db) {
        db.collection("channels").find({}).toArray(function(err, result) {
            socket.emit("get channel list", result);
            db.close();
        });
    });
};

var getMessageList = function(socket, channelId) {
    mongodb.connect(process.env.MONGO_URL, function(err, db) {
        db.collection("messages").find({
            "channelId": parseInt(channelId)
        }).sort({
            $natural: -1
        }).limit(50).toArray(function(err, result) {
            socket.emit("get message list", result);
            db.close();
        });
    });
};

var sendMessage = function(msg) {
    mongodb.connect(process.env.MONGO_URL, function(err, db) {
        var WriteResult = db.collection("messages").insert({
            user: msg.user,
            channelId: parseInt(msg.channelId),
            text: msg.text
        });

        if (WriteResult.nInserted === 0)
            console.log(WriteResult.writeError.errmsg);
        else
            io.emit("update message list");
    })
};
