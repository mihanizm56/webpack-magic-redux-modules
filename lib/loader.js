const path = require('path');

const actionsRegExp = /actions\.[jt]s$/;
const reducersRegExp = /reducer\.[jt]s$/;
const constantsRegExp = /_?constants\.[jt]s$/;
const sagasRegExp = /saga\.[jt]s$/;
const reduxRegExp = /_?redux/;

module.exports = function Loader(source) {
  // cache the loader
  this.cacheable();

  const pathToModule = this.resource;
  const isActionFile = actionsRegExp.test(pathToModule);
  const isReducersFile = reducersRegExp.test(pathToModule);
  const isSagasFile = sagasRegExp.test(pathToModule);
  const isConstantsFile = constantsRegExp.test(pathToModule);
  const isFromRedux = reduxRegExp.test(pathToModule);

  if (
    (isActionFile || isReducersFile || isSagasFile || isConstantsFile) &&
    isFromRedux
  ) {
    // get dirname of file
    const dirname = path.basename(path.dirname(this.resource));
    // get all replacements
    const regExpToReplace = /(\s{1,4}=\s{1,4}['"])(\w+)(['"];?\s{0,2})/gm;

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
  }

  return source;
};
