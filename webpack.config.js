const path = require('path')

module.exports = {
  // 入口
  entry: './src/app.js',
  // 出口
  output: {
    // 打包路径
    path: path.resolve(__dirname, 'dist'),
    // 打包文件名
    filename: 'main.js'
  }
}
