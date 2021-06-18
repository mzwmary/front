var a = [1, 2, 3, 4, 5, 6];

// 正常参数
var b = a.slice(0, 3)

// 一个参数
var c = a.slice(3) // [1, 2, 3]

// 没有参数
var d = a.slice() // [1, 2, 3, 4, 5, 6]

// 开始位置在结束位置前面
var e = a.slice(-1, -3) // []

// 参数为负
var f = a.slice(-3, -1) //[4, 5]

var g = a.slice(0, -3) // [1, 2, 3]
var h = a.slice(-3, 0) // []

// 开始位置大于长度
var j = a.slice(-6) // [1, 2, 3, 4, 5, 6]

// 负数位置大于长度
var i = a.slice(6) // []
var k = a.slice(-7)// [1, 2, 3, 4, 5, 6]

// 开始和结束位置相同
var l = a.slice(1,1) // []
console.log(a,b,c,d,e,f,g,h,i,j,k,l)