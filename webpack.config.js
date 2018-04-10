var webpack = require('webpack');
var path = require('path');

var configCjs = {
  entry: {
    Bem: './src/Bem.js',
    static: './src/static/index.js',
    hoc: './src/hoc/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib/cjs'),
    library: 'react-bem',
    libraryTarget: 'commonjs',
  },
};

var configUmd = {
  entry: {
    Bem: './src/Bem.js',
    static: './src/static/index.js',
    hoc: './src/hoc/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib/umd'),
    library: 'react-bem',
    libraryTarget: 'umd',
  },
};

module.exports = [configCjs, configUmd];