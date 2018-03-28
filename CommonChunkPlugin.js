var webpack = require('webpack');
var path = require('path');

module.export = {
  entry: {
    pageA: './src/pageA'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  plugin: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ]
}
