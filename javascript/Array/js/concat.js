var a = [1, 2, 3]
var b = a.concat(4, 5)
console.log(a, b)//[1, 2, 3]  [1, 2, 3, 4, 5]

var c = [6, 7]
var d = a.concat(c)
console.log(a, c, d) // [1, 2, 3] [6, 7] [1, 2, 3, 6, 7]


var a = [1, 2, 3]
var b = a.concat()
console.log(a,b)// [1, 2, 3]  [1, 2, 3]