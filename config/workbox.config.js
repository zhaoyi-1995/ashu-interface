const { GenerateSW } = require('workbox-webpack-plugin'); // 引入 Workbox 的 GenerateSW 插件，用于生成 Service Worker

module.exports = {
  plugins: [
    new GenerateSW({
      // 基本设置
      swDest: 'sw.js', // 设置生成 Service Worker 文件的路径和名称，输出到 'build/sw.js'
      clientsClaim: true, // 允许新 Service Worker 在激活后立即控制所有打开的页面
      skipWaiting: true, // 跳过等待阶段，让新 Service Worker 立即激活，替换旧版本
      cleanupOutdatedCaches: true, // 自动清理旧的、未使用的缓存，确保缓存一致性

      // 预缓存设置
      exclude: [/\.map$/, /manifest\.json$/], // 排除不需要预缓存的文件，例如 source map 和 manifest 文件
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 设置预缓存文件的最大大小（这里是 5MB），防止缓存过大文件

      // 运行时缓存策略
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // 匹配图片文件（png、jpg、jpeg、svg、gif）的正则表达式
          handler: 'CacheFirst', // 使用“缓存优先”策略，先从缓存读取，缓存未命中时请求网络
          options: {
            cacheName: 'images', // 为图片缓存设置一个独立的缓存名称，避免与其他资源冲突
            expiration: {
              maxEntries: 50, // 限制缓存中最多存储 50 个图片文件，超出时清理旧文件
              maxAgeSeconds: 30 * 24 * 60 * 60, // 设置缓存有效期为 30 天（单位：秒）
            },
          },
        },
        {
          urlPattern: /^https:\/\/your-api\.com\/.*/, // 匹配特定 API 请求的正则表达式，需要替换为你的实际 API 域名
          handler: 'StaleWhileRevalidate', // 使用“后台更新”策略，返回缓存内容并在后台更新最新数据
          options: {
            cacheName: 'api', // 为 API 缓存设置独立的缓存名称
            expiration: {
              maxEntries: 20, // 限制缓存中最多存储 20 个 API 响应
              maxAgeSeconds: 7 * 24 * 60 * 60, // 设置缓存有效期为 7 天
            },
          },
        },
        {
          urlPattern: /\.(?:js)$/, // 匹配 JavaScript 文件的正则表达式
          handler: 'CacheFirst', // 使用“缓存优先”策略，适合内容稳定的 JS 文件
          options: {
            cacheName: 'scripts', // 为 JS 文件缓存设置独立的缓存名称
            expiration: {
              maxEntries: 30, // 限制缓存中最多存储 30 个 JS 文件
              maxAgeSeconds: 7 * 24 * 60 * 60, // 设置缓存有效期为 7 天
            },
          },
        },
        {
          urlPattern: /\.(?:css)$/, // 匹配 CSS 文件的正则表达式
          handler: 'CacheFirst', // 使用“缓存优先”策略，适合内容稳定的 CSS 文件
          options: {
            cacheName: 'styles', // 为 CSS 文件缓存设置独立的缓存名称
            expiration: {
              maxEntries: 20, // 限制缓存中最多存储 20 个 CSS 文件
              maxAgeSeconds: 7 * 24 * 60 * 60, // 设置缓存有效期为 7 天
            },
          },
        },
      ],

      // 单页应用 (SPA) 支持
      navigateFallback: '/index.html', // 对于未缓存的导航请求，回退到 index.html（适用于 SPA）
      navigateFallbackDenylist: [/^\/api/, /\.js$/], // 排除 API 请求和 JS 文件的回退，避免干扰正常请求
    }),
  ],
};