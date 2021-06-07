// 原理
Function.prototype.myApply = function (thisArg) {
  if (typeof this !== 'function') {
    throw new Error('this must be function');
  }
  if (thisArg == null || thisArg == undefined) {
    thisArg = window
  }
  thisArg.fn = this;
  let res = thisArg.fn(...arguments[1]);
  delete thisArg.fn;
  return res;
}

// Math.max.myApply(NaN, [1, 2, 3, 4]) // 4

// 参数有上限,数组分段传递
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;
  for (var i = 0, len = arr.length; i < len; i += QUANTUM){
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)))
    min = Math.min(submin, min);
  }
  return min
}
// var min = minOfArray([1, 2, 3, 4]);console.log(min)

// Array.prototype.push.myApply([1], [2]) // [1,2]