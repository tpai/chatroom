const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { apiServerAddress } = require('./server.config.js');
const config = require('./webpack.config.js');

module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: 'public',
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_SERVER_ADDRESS': JSON.stringify(apiServerAddress),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
