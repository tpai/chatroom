/* global process */
/* global __dirname */
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    port = (process.env.PORT || 5555);

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
   })
});