/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* global process */
	/* global __dirname */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dotenv = __webpack_require__(2);

	var _dotenv2 = _interopRequireDefault(_dotenv);

	var _serverHttp = __webpack_require__(3);

	var _serverHttp2 = _interopRequireDefault(_serverHttp);

	var _socketIo = __webpack_require__(7);

	var _socketIo2 = _interopRequireDefault(_socketIo);

	var _lodash = __webpack_require__(8);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _serverMongo = __webpack_require__(9);

	_dotenv2['default'].load();

	var io = _socketIo2['default'].listen(_serverHttp2['default'], { log: false });

	var users = [];
	var names = ['Athony', 'Billy', 'Carter', 'Demian', 'Elis', 'Francis', 'Greg', 'Ian', 'Josh', 'Ken', 'Luis', 'Moris', 'Nico', 'Orgrim'];

	io.on("connection", function (socket) {

	    var user = {
	        id: socket.id,
	        name: names[_lodash2['default'].random(0, names.length - 1)],
	        channelId: -1
	    };
	    // Set user data
	    socket.emit("set user data", user);

	    // Add user to list and update
	    users.push(user);
	    io.emit("get user list", users);

	    // Get channel list for user
	    (0, _serverMongo.getChannelList)(function (result) {
	        socket.emit("get channel list", result);
	    });

	    console.log("[Connect]", socket.id);

	    socket.on("disconnect", function () {
	        users = users.filter(function (user) {
	            return user.id !== socket.id;
	        });
	        io.emit("get user list", users);
	        console.log("[Disconnect]", socket.id);
	    });

	    socket.on("get user list", function () {
	        socket.emit("get user list", users);
	    });

	    socket.on("get channel list", function () {
	        (0, _serverMongo.getChannelList)(function (result) {
	            socket.emit("get channel list", result);
	        });
	    });

	    socket.on("set current channel", function (channelId) {
	        users.map(function (user) {
	            if (user.id === socket.id) {
	                return _lodash2['default'].assign(user, { channelId: channelId });
	            }
	            return user;
	        });
	        // get user list
	        (0, _serverMongo.getMessageList)(channelId, function (result) {
	            socket.emit("get message list", result);
	        });
	    });

	    socket.on("send message", function (msg) {
	        (0, _serverMongo.sendMessage)(msg, function () {
	            io.emit("update message list");
	        });
	    });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _http = __webpack_require__(5);

	var _http2 = _interopRequireDefault(_http);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var port = ("8080") || 8080;
	var app = (0, _express2['default'])();
	var server = _http2['default'].createServer(app);

	var root = _path2['default'].resolve(__dirname, '../www');
	app.use(_express2['default']['static'](root));
	app.get('*', function (req, res) {
	    res.sendFile(_path2['default'].join(root, 'index.html'));
	});
	server.listen(port);

	exports['default'] = server;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mongodb = __webpack_require__(10);

	var _mongodb2 = _interopRequireDefault(_mongodb);

	var mongodb = _mongodb2["default"].MongoClient;

	var getChannelList = function getChannelList(cb) {
	    mongodb.connect(("mongodb://user:pass@localhost:27017/chatroom"), function (err, db) {
	        db.collection("channels").find({}).toArray(function (err, result) {
	            cb(result);
	            db.close();
	        });
	    });
	};

	exports.getChannelList = getChannelList;
	var getMessageList = function getMessageList(channelId, cb) {
	    mongodb.connect(("mongodb://user:pass@localhost:27017/chatroom"), function (err, db) {
	        db.collection("messages").find({ "channelId": parseInt(channelId) }).sort({ $natural: -1 }).limit(50).toArray(function (err, result) {
	            cb(result);
	            db.close();
	        });
	    });
	};

	exports.getMessageList = getMessageList;
	var sendMessage = function sendMessage(msg, cb) {
	    mongodb.connect(("mongodb://user:pass@localhost:27017/chatroom"), function (err, db) {
	        var WriteResult = db.collection("messages").insert({
	            user: msg.user,
	            channelId: parseInt(msg.channelId),
	            text: msg.text
	        });

	        if (WriteResult.nInserted === 0) console.log(WriteResult.writeError.errmsg);else cb();
	    });
	};
	exports.sendMessage = sendMessage;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ }
/******/ ]);