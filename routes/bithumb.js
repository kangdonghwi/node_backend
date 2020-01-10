var app = require('http').createServer(handler).listen(),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	request = require('request');

