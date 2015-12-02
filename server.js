/* global process */
/* global __dirname */
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    port = (process.env.PORT || 5000);

app.use(express.static(__dirname));
server.listen(port);