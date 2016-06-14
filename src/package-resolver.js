var fs = require('fs');
var path = require('path');

var local = require('./local-package-resolver');
var remote = require('./remote-package-resolver');

var cacheable = ((cache) => {
  return (fn) =>
    (endpoint) => cache[endpoint] ? Promise.resolve(cache[endpoint]) :
      cache[endpoint] = fn(endpoint)
})({});

var resolution = (endpoint, terminal) => {
  return terminal === 'bower.json' ? local(endpoint) :
    cacheable(remote)(endpoint);
};

module.exports = (endpoint) => {
  var split = endpoint.split(path.sep);
  var terminal = split[split.length - 1];
  if (split[0].indexOf(".") === 0) { // endpoint is a relative filepath
    return new Promise((resolve, reject) => {
      fs.lstat(endpoint, (err, stats) => {
        if (err || stats.isDirectory()) {
          return resolution(endpoint, terminal).then(resolve, reject);
        } else {
          return local(endpoint).then(resolve, reject);
        }
      });
    });
  } else {
    return resolution(endpoint, terminal);
  }
};

