const {existsSync}=require('fs')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const theme = require('../theme')
/****************/
const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',//按需加载模块
    // publicPath:'http://localhost:3016/dist/'
    // publicPath:'../dist/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.join(__dirname, '/../app/components'),
      actions: path.join(__dirname, '/../app/actions'),
      api: path.join(__dirname, '/../app/api'),
      reducers: path.join(__dirname, '/../app/reducers'),
      utils: path.join(__dirname, '/../app/utils'),
      controllers: path.join(__dirname, '/../app/controllers'),
      style: path.join(__dirname, '/../app/style'),
      images: path.join(__dirname, '/../app/images'),
      base: path.join(__dirname, '/../app/base'),
      functions: path.join(__dirname, '/../app/functions'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          // 'postcss-loader',
          // 'less-loader',
          // { loader: 'style', options: { } },
          { loader: 'css', options: {sourceMap: true,modules:false } },
          // { loader: 'less', options: {sourceMap: true,modules:false } }
        ],
      },
      {
        test: /\.less$/,
        // exclude:[/\.custom.less/],
        // not:[
        //   path.resolve(__dirname, "./app/test"),
        //   path.resolve(__dirname, "./app/custom.less"),
        // ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          // 'postcss-loader',
          // 'less-loader',
          // { loader: 'style', options: { } },
          { loader: 'css', options: {sourceMap: true,modules:true } },
          { loader: 'less', options: {sourceMap: true,modules:false } }
        ],
      },
      /* {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: {sourceMap: true,modules:false } }
          ]
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
              { loader: 'css', options: {sourceMap: true,modules:true } },
              { loader: 'less', options: { sourceMap: true,modules:false } },
          ]
        }),
      }, */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
    // noParse: /index.less/
  },
  plugins: [
    // 提取css
    // new ExtractTextPlugin('style.[hash:4].css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
    }),
    new webpack.SourceMapDevToolPlugin(),
    new ProgressBarPlugin()
  ],
  /* optimization:{
    minimize:true,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: 'all', // 只对入口文件处理 all initial async(default)
      "automaticNameDelimiter": "~",
      cacheGroups: {
          vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
              test: /node_modules\//,
              // name: 'page/vendor',
              priority: 10,
              enforce: true
          },
      }
    }
  } */

  /* commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
    // test: /common\/|components\//,
    // name: 'page/commons',
    priority: 10,
    enforce: true
  } */
}

module.exports = webpackConfigBase
