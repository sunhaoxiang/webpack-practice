var webpack = require('webpack');
var path = require('path');

module.export = {
  entry: {
    pageA: './src/pageA',
    pageB: './src/pageB',
    vendor: ['lodash']  // 第三方库
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  plugin: [
    // 打包自己业务代码的公共部分
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2, // 重复两次就提取出来
      chunks: ['pageA', 'pageB'] // 指定打包公共代码的范围
    }),
    
    // 打包第三方库和生成的代码
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
}
