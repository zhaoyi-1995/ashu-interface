const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineRuntimePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InlineRuntimePlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.alterAssetTagGroups.tapAsync('InlineRuntimePlugin', (data, cb) => {
        // 找到 runtime chunk
        const runtimeChunk = compilation.chunks.find((chunk) => chunk.name === 'runtime');
        if (runtimeChunk) {
          const runtimeFile = Array.from(runtimeChunk.files)[0]; // 获取 runtime 文件名，例如 "runtime.f85af822.bundle.js"
          const runtimeCode = compilation.assets[runtimeFile].source(); // 获取 runtime 代码内容

          // 移除原始的 runtime <script> 标签（同时检查 headTags 和 bodyTags）
          data.headTags = data.headTags.filter(
            (tag) => !(tag.tagName === 'script' && tag.attributes.src === `/${runtimeFile}`)
          );
          data.bodyTags = data.bodyTags.filter(
            (tag) => !(tag.tagName === 'script' && tag.attributes.src === `/${runtimeFile}`)
          );

          // 添加内联的 <script> 标签到 <head>
          data.headTags.push({
            tagName: 'script',
            voidTag: false,
            innerHTML: runtimeCode,
          });

          // 删除独立的 runtime 文件（避免多余输出）
          delete compilation.assets[runtimeFile];
        }

        cb(null, data);
      });
    });
  }
}

module.exports = InlineRuntimePlugin;