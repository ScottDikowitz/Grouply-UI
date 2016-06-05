'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var development = process.env.NODE_ENV !== 'production';
module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'app.jsx'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
},

plugins: [
    new HtmlWebpackPlugin({
      template: development ? 'dev.html' : 'index.html',
      inject: true,
      filename: development ? 'dev.html' : 'index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': development ? '"development"' : '"production"',
      'API_SERVER': development ? '"http://localhost:8000"' : '"http://grouplyapi.herokuapp.com"'
    }
  })],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
   resolve: {
     extensions: ["", ".js", ".jsx"]
   }
};
