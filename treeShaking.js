var path = require('path');
var webpack = require('webpack');
var PurifyCSS = require('purifycss-webpack');
var glob = require('glob-all');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.export = {
  entry: {
    app: './src/app.js',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['lodash'] // 针对lodash的tree shaking
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: false // 不提取异步加载的css
    }),

    new PurifyCSS({ // css tree shaking
      paths: glob.sync(
        path.join(__dirname, './index.html'),
        path.join(__dirname, './src/*.js')
      )
    }),

    new webpack.optimize.UglifyJsPlugin() // 压缩并去除无用代码
  ]
}
