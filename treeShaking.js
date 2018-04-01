var path = require('path');
var webpack = require('webpack');

module.export = {
  entry: {
    app: './src/app.js',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({}) // 压缩并去除无用代码
  ]
}
