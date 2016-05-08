'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
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
      template: 'index.html',
      inject: true,
      filename: 'index.html'
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
