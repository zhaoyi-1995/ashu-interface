const { join, resolve } = require('path')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const notifier = require('node-notifier')
const logo = join(__dirname, 'icon.png')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const port = 3003
module.exports = {
  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(__dirname, '../dist')
    },
    hot: true,
    port
  },

  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },

  stats: 'errors-only',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'ashu', // 设置 HTML 文件的标题
      filename: 'index.html', // 输出的 HTML 文件名称
      template: resolve(__dirname, '../src/index_dev.html') // 使用的模板文件
    }),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here http://localhost:3000'], // 显示应用运行地址
        notes: ['构建信息,及时关注右上角'] // 附加的提示信息
      },
      onErrors: function (severity, errors) {
        if (severity !== errors) {
          return
        }
        const error = errors[0]
        notifier.notify({
          title: 'webpack 构建失败', // 通知的标题
          message: severity + ':' + error.name, // 通知的内容，显示错误的严重性和名称
          subtitle: error.file || '', // 错误所在文件（如果有）
          icon: logo // 通知图标
        })
      },
      clearConsole: true
    })
  ]
}
