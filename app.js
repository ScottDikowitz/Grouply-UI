var express = require('express');
var app = express();
app.set('port', process.env.PORT || 5000);
var server = require('http').createServer(app);
server.listen(process.env.PORT || 5000);
var development = process.env.NODE_ENV !== 'production';

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
    if (development){
        res.sendFile(path.join(__dirname, 'dist/dev.html'));
    } else {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    }
});
