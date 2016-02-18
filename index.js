
var path = require('path');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

require("babel/register")({
  // workaround for babel's broken src/babel/api/register/node.js:shouldIgnore
  // (adviced require skips files when module is installed with -g)
  only: [
    new RegExp(
      escapeRegExp((path.resolve(path.join(__dirname, 'src')) + path.sep)
        .replace(/\\/g, '/')) + '.*'
    )
  ]
});



var resolve = require('./src/dependency-tree');
var consolidate = require('./src/consolidate');
var grep = require('./src/grep');
var explicitRange = require('./src/explicit-range');
var rangeComparator = require('./src/range-comparator');
var bowerConfig = require('./src/bower-config');



module.exports.resolve = resolve;
module.exports.consolidate = consolidate;
module.exports.grep = grep;
module.exports.explicitRange = explicitRange;
module.exports.rangeComparator = rangeComparator;
module.exports.bowerConfig = bowerConfig;

