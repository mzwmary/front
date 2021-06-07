var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(0, 3)
var c = a.slice(3) // [1, 2, 3]
var d = a.slice() // [1, 2, 3, 4, 5, 6]
var e = a.slice(-1, -3) // []
var f = a.slice(-3, -1) //[4, 5]
var g = a.slice(0, -3) // [1, 2, 3]
var h = a.slice(-3, 0) // []
var i = a.slice(6) // []
var j = a.slice(-6) // [1, 2, 3, 4, 5, 6]
var k = a.slice(-7)// [1, 2, 3, 4, 5, 6]
var l = a.slice(1,1) // []
console.log(a,b,c,d,e,f,g,h,i,j,k,l)