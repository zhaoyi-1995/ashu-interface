//开启JS多线程的压缩
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const WorkboxConfig = require('./workbox.config.js')

const ProdConfig = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[contenthash:5].[ext]',
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  // CDN 引入 react 相关资源
  // externals: {
  //   'react': 'React',
  //   'react-dom/client': 'ReactDOM',
  //   'react-router-dom': 'ReactRouterDOM'
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ashu',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index_prod.html'),
      favicon: './public/favicon.ico',
    }),
  ],
};

module.exports = merge.default(ProdConfig, WorkboxConfig)
