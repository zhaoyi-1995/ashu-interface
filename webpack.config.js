const { resolve } = require('path');
const merge = require('webpack-merge')

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)

const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx')
  },
  output: {
    path: resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader'
        }
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset'
      }
    ]
  }
}
module.exports = merge.default(webpackBaseConfig, _mergeConfig)