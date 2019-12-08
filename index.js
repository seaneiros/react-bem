var bemStatic = require('./lib/cjs/static');
var bemHoc = require('./lib/cjs/hoc');
var Bem = require('./lib/cjs/Bem');
var useBem = require('./lib/cjs/hook');

exports.__esModule = true;

exports.default = bemStatic.default;
exports.bemHoc = bemHoc.default;
exports.BemHelper = Bem.default;
exports.useBem = useBem.default;