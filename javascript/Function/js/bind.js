Function.prototype.myBind = function (thisArg, ...args1) {
  if (typeof this !== 'function') {
    throw new Error('this must be function');
  }
  var self = this;
  let fBound = function (...args2) {
    let result = self.myApply(this instanceof fBound ? this : thisArg, args1.concat(args2))
    return result
  }
  let fNop = function () { };
  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
}