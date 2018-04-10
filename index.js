var bemStatic = require('./lib/cjs/static');
var bemHoc = require('./lib/cjs/hoc');
var Bem = require('./lib/cjs/Bem');

module.exports = {
  default: bemStatic,
  bemHoc: bemHoc,
  BemHelper: Bem,
};
