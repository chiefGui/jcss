var compiler = require ('../core/compiler');

module.exports = {
  compile: function (filename) {
    compiler.read(filename).compile();
    return true;
  }
};
