const path = require('path') // node自带库
const webpack = require('webpack') // 用于访问内置插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 引入生成css文件的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // build时删除不需要文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入生成html文件的插件

module.exports = {
  // 单文件入口
  // entry: ['babel-polyfill', './src/app.js'], // 入口文件，使用babel-polyfill
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 打包路径，必须使用绝对地址，输出文件夹
  //   filename: 'main.js' // 打包后输出的文件名
  // },

  // 多文件入口，将文件分为两部分，第一部分是我们自己的代码，第二部分是依赖库
  entry: {
    bundle: [ // 自己的代码
      'babel-polyfill', // 使用babel-polyfill
      './src/index.js' // 入口文件
    ],
    vendors: [ // 第三方依赖库
      'faker',
      'lodash',
      'react',
      'react-dom',
      'react-input-range',
      'react-router',
      'react-redux',
      'redux',
      'redux-form',
      'redux-thunk'
    ]
  },
  // 如果想修改 webpack-dev-server 配置，在这个对象里面修改
  devServer: {
    open: true, // 自动打开浏览器
    port: 8088, // 端口号
    contentBase: './src/common', // 未打包资源路径
    publicPath: '/' // 服务器所包资源的输出路径
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包路径，必须使用绝对地址，输出文件夹
    filename: 'js/[name].[chunkhash].js', // [chunkhash]会自动根据文件是否更改而更换哈希
    publicPath: '/' // 所有资源的基础路径，必须以'/'结尾
  },
  resolve: {
    extensions: [".js"], // 写在里面的扩展名，在引用时不需要加后缀
    alias: { // 设置引用路径的别名
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // js文件才使用babel
        use: 'babel-loader', // 使用babel-loader
        exclude: [path.resolve(__dirname, 'node_modules')] // 不包括路径
      },

      // 不使用'extract-text-webpack-plugin'插件时css-loader的配置
      // {
      //   test: /\.css$/,
      //   use: ['style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true, // 开启模块化
      //         localIdentName: '[path]-[name]-[local]-[hash:base64:6]' // 查询参数
      //         }
      //     }
      //   ],
      //   exclude: [ // 不使用模块化的目录
      //     path.resolve(__dirname, 'node_modules'),
      //     path.resolve(__dirname, 'src/common')
      //   ]
      // },

      // {
      //   test: /\.css$/, // 不使用模块化的处理方式
      //   use: ['style-loader', 'css-loader'],
      //   include: [
      //     path.resolve(__dirname, 'node_modules'),
      //     path.resolve(__dirname, 'src/common')
      //   ]
      // },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 使用'extract-text-webpack-plugin'将css单独打包
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader' ,
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path]-[name]-[local]-[hash:base64:6]'
            }
          },
          'sass-loader'
        ],
        exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/common')
        ]
      },
      
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/common')
        ]
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash].[ext]' // [字体名].[hash].[图片格式]
            }
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片格式正则
        use: [
          {
            loader: 'url-loader', // 配置url-loader的可选项
            options: {
              limit: 10000, // 限制图片大小10KB，小于限制会将图片转换为base64格式
              name: 'imgs/[name].[hash].[ext]' // 超出限制，创建的文件格式build/images/[图片名].[hash].[图片格式]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 生成css文件的插件
    new ExtractTextPlugin("css/[name].[hash].css"),

    // 抽取公共代码的插件，是webpack自带插件
    new webpack.optimize.CommonsChunkPlugin({
      // vendors 打包依赖库
      // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendors', 'manifest'],
      // 配合 manifest 文件使用
      minChunks: Infinity
    }),

    // build时删除不需要文件的插件
    // 只删除 dist 文件夹下的 bundle 和 manifest 文件
    new CleanWebpackPlugin(['dist/bundle.*.js','dist/manifest.*.js'], {
      // 打印log
      verbose: true,
      // 删除文件
      dry: false
    }),

    // 生成html文件的插件，使用这个插件后，打包后的js和css文件会自动被插入html文件中
    new HtmlWebpackPlugin({
      filename: 'index_prod.html', // 打包后生成的html文件
      template: 'src/index.html' // 生成html文件的模板
    })
  ]
}
