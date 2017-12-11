const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const vueConfig = require('')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: isProd 
        ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'vue-style-loader'
        })
        : ['vue-style-loader', 'css-loader']
      }
    ]
  }
}