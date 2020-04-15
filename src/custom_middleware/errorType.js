const util = require('util');



function JsonError( code, message) {
  Error.call(this, message);
  this.message = msg || '发生了一个致命错误！';
  return { code: this.code, message: this.message }
}
util.inherits(JsonError, Error);

function PageError(message) {
  Error.call(this, message);
}
util.inherits(PageError, Error);

exports.JsonError = JsonError;
exports.PageError = PageError;