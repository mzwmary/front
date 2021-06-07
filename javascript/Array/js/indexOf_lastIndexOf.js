var a = [0, 1, 2, 1, 4, 1, 6, 1]
var b = a.indexOf(1)
var c = a.indexOf(1, 2)
var d = a.indexOf(1, -1)
var e = a.indexOf(1, -4)
console.log(b, c, d, e)// 1 3 7 5

var b = a.lastIndexOf(1)
var c = a.lastIndexOf(1, 2)
var d = a.lastIndexOf(1, -1)
var e = a.lastIndexOf(1, -4)
console.log(b,c,d,e)// 7 1 7 3