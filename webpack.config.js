const { resolve } = require('path');
const merge = require('webpack-merge')

const argv = require('yargs-parser')(process.argv.slice(2))

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBar = require('webpackbar');
const { ThemedProgressPlugin } = require('themed-progress-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


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
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
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
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      // 公用包提出来
      chunks: 'all',
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'chunk-common',
          minChunks: 2,
          maxInitialRequests: 5,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
        uiComponent: {
          name: 'chunk-components',
          test: /([\\/]node_modules[\\/]@mui[\\/].+\w)|(src[\\/]components[\\/]common)|([\\/]node_modules[\\/]@ashu[\\/]components)/,
          chunks: 'all',
          priority: 4,
          reuseExistingChunk: true,
          enforce: true,
        },
        ethersSDK: {
          name: 'chunk-web3-sdk',
          test: /[\\/]node_modules[\\/](ethers*\w|@ethersproject*\w|@web3-react*\w)/,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        reactLibs: {
          name: 'chunk-react-libs',
          test: /[\\/]node_modules[\\/](react|react.+\w)/,
          chunks: 'all',
          priority: 6,
          reuseExistingChunk: true,
          enforce: true,
        },
      }
    },
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
    new WebpackManifestPlugin({
      fileName: 'manifest.json', // 输出文件名，默认为 manifest.json
    })
  ]
}
module.exports = merge.default(webpackBaseConfig, _mergeConfig)