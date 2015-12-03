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
   
   socket.on("new user", function(user) {
       users.push(user.name);
       console.log(users);
       io.emit("get user list", users);
   });
   
   socket.on("get user list", function() {
       socket.emit("get user list", users);
   });
   
   socket.on("get channel list", function() {
       mongodb.connect(url, function(err, db) {
           db.collection("channels").find({}).toArray(function(err, result) {
               socket.emit("get channel list", result);
               db.close();
           });  
       });
   });
});