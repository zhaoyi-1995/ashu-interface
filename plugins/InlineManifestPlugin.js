const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

class InlineManifestPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InlineManifestPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.beforeEmit.tapAsync('InlineManifestPlugin', (data, cb) => {
        // 获取 dist 目录路径
        const outputPath = compilation.options.output.path; // 例如 dist
        const manifestPath = path.resolve(outputPath, 'manifest.json');
        let manifestContent = '{}';

        // 从磁盘读取 manifest.json
        try {
          if (fs.existsSync(manifestPath)) {
            manifestContent = fs.readFileSync(manifestPath, 'utf-8');
            console.log('InlineManifestPlugin: Successfully read manifest.json from disk:', manifestContent);
          } else {
            console.warn('InlineManifestPlugin: manifest.json not found at', manifestPath);
          }
        } catch (error) {
          console.error('InlineManifestPlugin: Error reading manifest.json:', error);
        }

        // 检查模板中是否有占位符
        if (!data.html.includes('const manifest = {}')) {
          console.warn('InlineManifestPlugin: "const manifest = {}" not found in template');
        }

        // 替换 manifest 数据到 HTML
        const replacedHtml = data.html.replace(
          /const manifest = \{\}/,
          `const manifest = ${manifestContent}`
        );

        if (replacedHtml === data.html) {
          console.error('InlineManifestPlugin: Replacement failed');
        } else {
          console.log('InlineManifestPlugin: Replacement successful');
        }

        data.html = replacedHtml;
        cb(null, data);
      });
    });
  }
}

module.exports = InlineManifestPlugin;