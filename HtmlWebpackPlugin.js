var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html文件
      template: './index.html', // 模板
      inject: true, // 不把生成的css、js注入html,默认为false
      chunks: ['app'], //指定后，会只把指定的chunk插入模板
      minify: { // 压缩
        collapseWhitespace: true // 去除空格
      }
    })
  ]
}
