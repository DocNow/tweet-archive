const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    "tweet-archive": './src/index.js',
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, './example')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './example'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + "/example/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})