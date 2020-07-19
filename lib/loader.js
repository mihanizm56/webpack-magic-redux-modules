const path = require('path');

module.exports = function Loader(source) {
  this.cacheable();

  const dirname = path.basename(path.dirname(this.resource));

  const regExpToReplace = /( = ['"])(\w+)(['"];\n)/g;

  const isMatchReplaceContent = regExpToReplace.test(source);

  if (isMatchReplaceContent) {
    const replacedContent = source.replace(
      regExpToReplace,
      (match, p1, p2, p3) => {
        return `${p1}${dirname}_${p2}${p3}`;
      },
    );

    source = replacedContent;
  }

  return source;
};
