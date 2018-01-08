const webpack = require('webpack');
const path = require('path') // node自带库
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入生成html文件的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 引入生成css文件的插件

const VENDOR = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "redux",
  "redux-form",
  "redux-thunk"
]

module.exports = {
  // entry: ['babel-polyfill', './src/app.js'], // 入口文件，使用babel-polyfill
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 打包路径，必须使用绝对地址，输出文件夹
  //   filename: 'main.js' // 打包后输出的文件名
  // },

  entry: {
    // 多文件入口，将文件分为两部分，第一部分是我们自己的代码，第二部分是依赖库
    bundle: [ // 自己的代码
      'babel-polyfill', // 使用babel-polyfill
      './src/index.js'
    ],
    vendor: [ // 依赖库
      "faker",
      "lodash",
      "react",
      "react-dom",
      "react-input-range",
      "react-redux",
      "redux",
      "redux-form",
      "redux-thunk"
    ]
  },
    output: {
      path: path.resolve(__dirname, 'dist'), // 打包路径，必须使用绝对地址，输出文件夹
      filename: '[name].[chunkhash].js' // [chunkhash]会自动根据文件是否更改而更换哈希
    },
  module: {
    rules: [
      {
        test: /\.js$/, // js文件才使用babel
        use: 'babel-loader', // 使用babel-loader
        exclude: /node_modules/ // 不包括路径
      },

      // 不使用'extract-text-webpack-plugin'插件时css-loader的配置
      // {
      //   test: /\.css$/,
      //   use: ['style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //         }
      //     }
      //   ]
      // },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 使用'extract-text-webpack-plugin'将css单独打包
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片格式正则
        use: [
          {
            loader: 'url-loader', // 配置url-loader的可选项
            options: {
              limit: 10000, // 限制图片大小10000B，小于限制会将图片转换为base64格式
              name: 'images/[name].[hash].[ext]' // 超出限制，创建的文件格式build/images/[图片名].[hash].[图片格式]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 生成html文件的插件
    new HtmlWebpackPlugin({
      filename: 'index_prod.html', // 打包后生成的html文件
      template: 'src/index.html' // 生成html文件的模板
    }),

    // 生成css文件的插件
    new ExtractTextPlugin("css/[name].[hash].css"),

    // 抽取公共代码的插件
    new webpack.optimize.CommonsChunkPlugin({
      // vendor 打包依赖库
      // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendor', 'manifest'],
      // 配合 manifest 文件使用
      minChunks: Infinity
    })
  ]
}
