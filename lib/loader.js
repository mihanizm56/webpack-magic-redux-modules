const path = require('path');

module.exports = function Loader(source) {
  // cache the loader
  this.cacheable();

  // get dirname of file
  const dirname = path.basename(path.dirname(this.resource));
  // get all replacements
  const regExpToReplace = /(\s{1,3}=\s{1,3}')([A-Z_]+)(';\s)/g;

  // check the match
  const isMatchReplaceContent = regExpToReplace.test(source);

  if (isMatchReplaceContent) {
    // prepare the replacement content
    const replacedContent = source.replace(
      regExpToReplace,
      (match, p1, p2, p3) => {
        return `${p1}${dirname}_${p2}${p3}`;
      },
    );

    // replace the content
    source = replacedContent;
  }

  return source;
};
