const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getCompilerHooks } = require('webpack-manifest-plugin');

class InlineManifestPlugin {
  apply(compiler) {
    const { beforeEmit: manifestBeforeEmit } = getCompilerHooks(compiler);
    let manifestData = {};
    let manifestPromiseResolve;

    const manifestPromise = new Promise((resolve) => {
      manifestPromiseResolve = resolve;
    });

    manifestBeforeEmit.tap('InlineManifestPlugin', (manifest) => {
      manifestData = manifest;
      console.log('InlineManifestPlugin: Captured manifest data:', JSON.stringify(manifestData));
      manifestPromiseResolve(manifestData);
      return manifest;
    });

    compiler.hooks.compilation.tap('InlineManifestPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.beforeEmit.tapPromise('InlineManifestPlugin', async (data) => {
        const resolvedManifest = await manifestPromise;

        if (!data.html.includes('const manifest = {}')) {
          console.warn('InlineManifestPlugin: "const manifest = {}" not found in template');
        }

        const manifestContent = JSON.stringify(resolvedManifest);
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
        return data;
      });
    });
  }
}

module.exports = InlineManifestPlugin;