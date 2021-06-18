var a = []

var b = a.unshift(1)
console.log(a, b)// [1] 1

var c = a.unshift(2, 3)
console.log(a, c)// [2, 3, 1] 3

var d = a.shift()
console.log(a, d)// [3, 1] 2

var e = a.shift()
console.log(a,e)// [1] 3