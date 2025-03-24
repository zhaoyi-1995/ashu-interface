const HtmlWebpackPlugin = require('html-webpack-plugin');

class RemoveChunkScriptsPlugin {
  constructor(options = {}) {
    // 指定要移除的 chunk 文件名（不含路径和 hash）
    this.chunksToRemove = options.chunksToRemove || [
      'chunk-react-libs',
      'chunk-web3-sdk',
    ];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveChunkScriptsPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.alterAssetTagGroups.tapAsync('RemoveChunkScriptsPlugin', (data, cb) => {
        // 过滤 headTags 和 bodyTags 中的 <script> 标签
        data.headTags = data.headTags.filter((tag) => {
          if (tag.tagName === 'script' && tag.attributes && tag.attributes.src) {
            const src = tag.attributes.src;
            // 检查是否包含要移除的 chunk 名
            return !this.chunksToRemove.some((chunk) => src.includes(chunk));
          }
          return true; // 保留非 <script> 标签或其他无关标签
        });

        data.bodyTags = data.bodyTags.filter((tag) => {
          if (tag.tagName === 'script' && tag.attributes && tag.attributes.src) {
            const src = tag.attributes.src;
            return !this.chunksToRemove.some((chunk) => src.includes(chunk));
          }
          return true;
        });
        cb(null, data);
      });
    });
  }
}

module.exports = RemoveChunkScriptsPlugin;