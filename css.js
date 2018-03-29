var webpack = require('webpack');
var path = require('path');

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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },

          // style-loader/url可配合file-loader使用将css打包为<link>引入的css文件，缺点是每引入一个css就会变为一个<link>标签，会造成网络请求过多，影响性能
          // {
          //   loader: 'style-loader/url'
          // },

          // style-loader/useable可控制是否加载css,通过调用 .use() .unuse() 来控制
          // {
          //   loader: 'style-loader/url'
          // },

          {
            loader: 'css-loader'
          }
        ]
      }
    ]
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
