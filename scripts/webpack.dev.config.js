
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const PORT = 3016
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  mode: 'development',
  plugins: [
    // 定义环境变量为开发环境
    /* new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      // 'process.env.NODE_ENV': JSON.stringify('demo_dev'),
      IS_DEVELOPMETN: true,
    }), */
    new OpenBrowserPlugin({
      // url: `http://localhost:${PORT}/#/login`,
      url: `http://localhost:${PORT}/#/`,
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
      // multiStep:true
    })
  ],
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: false,
    hot: true,
    host: '0.0.0.0',
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
