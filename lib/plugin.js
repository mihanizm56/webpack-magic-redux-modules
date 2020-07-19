const path = require('path');

class CustomPlugin {
  onOptimize(modules) {
    modules.forEach(module => {
      const modulePath = module.resource;

      const isNodeModules = /node_modules/.test(modulePath);
      const isActionFile = /actions\.[jt]s$/.test(modulePath);

      if (!isNodeModules && isActionFile) {
        const moduleSource = module._source;
        const regExpToReplace = /=\s'/;

        const isMatchReplaceContent = regExpToReplace.test(moduleSource._value);

        if (isMatchReplaceContent) {
          const dirname = path.basename(path.dirname(modulePath));

          const replacedContent = moduleSource._value.replace(
            new RegExp(regExpToReplace, 'g'),
            match => `${match}${dirname}_`,
          );

          module._source._value = replacedContent;
        }
      }
    });
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CustomPlugin', compilation => {
      compilation.hooks.finishModules.tap('CustomPlugin', this.onOptimize);
    });
  }
}

module.exports = CustomPlugin;
