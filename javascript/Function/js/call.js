Function.prototype.myCall = function call(thisArg,...args) {
	if (typeof this !== 'function') {
    throw new Error('this must be function');
  }
  if (thisArg == null || thisArg == undefined) {
    thisArg = window
  }
	thisArg.fn = this;
	let result = thisArg.fn(...args);
	delete thisArg.fn;
	return result;
};