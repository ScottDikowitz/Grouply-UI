var express = require('express');
// var app     = express();
// var server  = require('http').createServer(app);
// var io      = require('socket.io').listen(server);
var app = express();
app.set('port', 3000);
var server = require('http').createServer(app);
server.listen(3000);


var path = require('path');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');

const compiler = webpack(config);

app.use(express.static(__dirname + '/dist'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// io.sockets.on('connection', function(socket){
//     socket.emit('news', {hello: 'world'});
//     socket.on('send-comment', function(data){
//         console.log(data);
//         count += 1;
//         io.sockets.emit('receive-comment', {comment: data, count: count});
//     });
// });
