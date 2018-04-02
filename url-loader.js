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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[hash].[ext]',
              limit: 10000
            }
          },

          {
            loader: 'img-loader',
            options: {
              pngquant: {
                quality: 80
              }
            }
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 限制大小10KB，小于限制会转换为base64格式
              name: 'fonts/[name].[hash].[ext]' // 超出限制，创建的文件格式images/[名称].[hash].[格式]
            }
          }
        ]
      }
    ]
  }
}
