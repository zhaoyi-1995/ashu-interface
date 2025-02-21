const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'ashu', // 设置 HTML 文件的标题
      filename: 'index.html', // 输出的 HTML 文件名称
      template: resolve(__dirname, '../src/prod.html') // 使用的模板文件
    }),
  ]
}
