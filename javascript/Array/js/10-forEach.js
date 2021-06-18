var a = [1, 2, 3, 4, 5]
var b = a.forEach(function (v, i, arr) {
  console.log(v, i, arr)
  // v:元素 i:索引 arr:数组本身
},this)
console.log(b)



// 提前终止循环
function foreach(arr,f,t) {
  try {
    arr.forEach(f,t)
  }
  catch (e) {
    if (e === foreach.break) return;
    else throw e;
  }
};
foreach.break = new Error("StopIteration")





// if (!Array.prototype.forEach) {
//   Array.prototype.forEach = function(callback/*, thisArg*/) {
//     var T, k;
//     if (this == null) {
//       throw new TypeError('this is null or not defined');
//     }
//     var O = Object(this);
//     var len = O.length >>> 0;
//     if (typeof callback !== 'function') {
//       throw new TypeError(callback + ' is not a function');
//     }
//     if (arguments.length > 1) {
//       T = arguments[1];
//     }
//     k = 0;
//     while (k < len) {
//       var kValue;
//       if (k in O) {
//         kValue = O[k];
//         callback.call(T, kValue, k, O);
//       }
//       k++;
//     }
//   };
// }