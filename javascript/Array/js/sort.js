var a = [33,4,1111,222]
var b = a.sort() // 字母表排序: [1111,222,33,4]
console.log(b)
var c = a.sort(function (a,b) {return a-b}) // [4, 33, 222, 1111]
console.log(c) 
var d = a.sort(function (a,b) {return b - a}) // [1111, 222, 33, 4]
console.log(d)
console.log(a === b && a === c && a === d)// true