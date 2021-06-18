var a = [1, 2, 3, 4, 5]
var aa = a;
var b = a.push()
console.log(a, a === aa, b)//  [1, 2, 3, 4, 5] true 5

var c = a.push(6)
console.log(a, a === aa, c)// [1, 2, 3, 4, 5, 6] true 6

var d = a.push(7, 8)
console.log(a, a === aa, d)// [1, 2, 3, 4, 5, 6, 7, 8] true 8

var e = a.pop()
console.log(a, a === aa, e)// [1, 2, 3, 4, 5, 6, 7] true 8

var f = a.pop(0)
console.log(a, a === aa, f)// [1, 2, 3, 4, 5, 6] true 7

var g = a.pop(2)
console.log(a,g)//[1, 2, 3, 4, 5] 6