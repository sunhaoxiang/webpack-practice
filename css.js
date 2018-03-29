var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 引入生成css文件的插件

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
            loader: 'style-loader',
            options: {
              insertInto: '#app', //在id为app的标签下插入style
              singleton: true, // 合并为一个标签
              transform: './css.transform.js' // css形变
            }
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
            loader: 'css-loader',
            options: {
              minimize: true, // 压缩
              modules:  true, // 模块化
              localIdentName: '[path][name]_[local]_[hash:base64:5]' // 定义class名称
            }
          }
        ]
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },

          {
            loader: 'css-loader'
          },

          {
            loader: 'less-loader'
          }
        ]
      },

      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({ // 使用'extract-text-webpack-plugin'将css单独打包
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true // 压缩
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: false // 不提取异步加载的css
    })
  ]
}
