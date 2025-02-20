const { resolve } = require('path');
const merge = require('webpack-merge')

const argv = require('yargs-parser')(process.argv.slice(2))

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBar = require('webpackbar');
const { ThemedProgressPlugin } = require('themed-progress-plugin');

const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const _modeflag = _mode === 'production' ? true : false;

const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx')
  },
  output: {
    path: resolve(process.cwd(), 'dist')
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),          // "@/*" 匹配 src 目录中的所有文件
      "@components": resolve(__dirname, 'src/components'),
      "@pages": resolve(__dirname, 'src/pages'), // "@pages/*" 匹配 src/pages 目录中的所有文件
      "@hooks": resolve(__dirname, 'src/hooks'), // "@hooks/*" 匹配 src/hooks 目录中的所有文件
      "@utils": resolve(__dirname, 'src/utils'), // "@utils/*" 匹配 src/utils 目录中的所有文件
      "@layouts": resolve(__dirname, 'src/layouts'),
      "@assets": resolve(__dirname, 'src/assets'),
      "@states": resolve(__dirname, 'src/states'),
      "@service": resolve(__dirname, 'src/service'),
      "@lib": resolve(__dirname, 'src/lib'),
      "@constants": resolve(__dirname, 'src/constants'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
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
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      chunkFilename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new ThemedProgressPlugin(),
  ]
}
module.exports = merge.default(webpackBaseConfig, _mergeConfig)