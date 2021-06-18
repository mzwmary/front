var a = [1, [2, [3, undefined, null, true, NaN]]]
var b = a.toString() // "1,2,3,,,true,NaN"
var c = a.toLocaleString()// 1,2,3,,,true,NaN
console.log(b,c)