const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') // 引入生成html文件的插件

module.exports = {
  entry: ['babel-polyfill', './src/app.js'], // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包路径，必须使用绝对地址，输出文件夹
    filename: 'main.js' // 打包后输出的文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/, // js文件才使用babel
        use: 'babel-loader', // 使用哪个 loader
        exclude: /node_modules/ // 不包括路径
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader', // 配置 url-loader 的可选项
            options: {
              limit: 10000, // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
              name: 'images/[name].[hash].[ext]' // 超出限制，创建的文件格式 build/images/[图片名].[hash].[图片格式]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 生成html文件的插件
    new htmlWebpackPlugin({
      filename: 'index_prod.html', // 打包后生成的html文件
      template: 'src/index.html' // 生成html文件的模板
    })
  ]
}
