var webpack = require('webpack');
var path = require('path');

var configCjs = {
  entry: {
    Bem: './src/Bem.js',
    static: './src/static/index.js',
    hoc: './src/hoc/index.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
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
    libraryTarget: 'commonjs',
  },
};

var configUmd = {
  entry: {
    Bem: './src/Bem.js',
    static: './src/static/index.js',
    hoc: './src/hoc/index.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
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
    libraryTarget: 'umd',
  },
};

module.exports = [configCjs, configUmd];