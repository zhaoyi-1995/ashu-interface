// 导入 Node.js 的 path 模块，用于处理文件和目录路径
const { join, resolve } = require('path')

// 引入 FriendlyErrorsWebpackPlugin 插件，用于美化 Webpack 构建输出
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 引入 HtmlWebpackPlugin 插件，用于生成 HTML 文件并自动注入打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 设置项目图标路径
const logo = join(__dirname, 'icon.png')

// 引入 node-notifier 库，用于在构建失败时显示通知
const notifier = require('node-notifier')

// 引入 Webpack Bundle Analyzer 插件，用于可视化分析打包后的文件体积
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 导出 Webpack 配置
module.exports = {
  // 配置开发服务器
  devServer: {
    // 启用 history API 的回退，支持前端路由
    historyApiFallback: true,
    // 配置代理，将 /api 请求转发到本地的 3000 端口
    proxy: [
      {
        '/api': 'http://localhost:3000',
      }
    ],
    // 配置静态资源目录，指向打包输出的目录
    static: {
      directory: join(__dirname, '../dist')
    },
    // 启用热模块替换（HMR），实时更新应用
    hot: true,
    // 设置开发服务器的端口为 3000
    port: 3000
  },

  // 配置输出选项
  output: {
    // 设置公共路径，用于加载应用中的资源
    publicPath: '/',
    // 配置 JavaScript 输出文件的命名规则
    filename: 'scripts/[name].bundle.js',
    // 配置静态资源（如图片等）的输出文件命名规则
    assetModuleFilename: 'images/[name].[ext]',
  },

  // 配置 Webpack 打包输出的日志级别，这里仅显示错误
  stats: 'errors-only',

  // 配置插件
  plugins: [
    // 配置 HtmlWebpackPlugin 插件，自动生成 HTML 文件，并注入打包后的 JavaScript 文件
    new HtmlWebpackPlugin({
      title: 'ashu', // 设置 HTML 文件的标题
      filename: 'index.html', // 输出的 HTML 文件名称
      template: resolve(__dirname, '../src/index_dev.html') // 使用的模板文件
    }),

    // 配置 FriendlyErrorsWebpackPlugin 插件，优化构建日志输出并在构建失败时发送通知
    new FriendlyErrorsWebpackPlugin({
      // 配置构建成功时的提示信息
      compilationSuccessInfo: {
        messages: ['Your application is running here http://localhost:3000'], // 显示应用运行地址
        notes: ['构建信息,及时关注右上角'] // 附加的提示信息
      },
      // 配置错误通知逻辑
      onErrors: function (severity, errors) {
        // 如果错误的严重性不匹配，则不执行通知
        if (severity !== errors) {
          return
        }
        // 获取第一个错误对象
        const error = errors[0]
        // 使用 node-notifier 显示桌面通知
        notifier.notify({
          title: 'webpack 构建失败', // 通知的标题
          message: severity + ':' + error.name, // 通知的内容，显示错误的严重性和名称
          subtitle: error.file || '', // 错误所在文件（如果有）
          icon: logo // 通知图标
        })
      },
      // 构建成功时清除控制台输出
      clearConsole: true
    })
  ]
}
