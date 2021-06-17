/**
 * Set本身是一个构造函数，用来生成 Set 数据结构。
 * 它类似于数组，但是成员的值都是唯一的，没有重复的值。
 * 可以通过add()方法向 Set 结构加入成员，且不会添加重复的值。
 */
var a = new Set();
console.log(a); // Set(0) {}
[1, 2, 3, 4, 5, 2, 1, 4].forEach(e => {
  a.add(e);
});
console.log(a); // Set(5) {1, 2, 3, 4, 5}


/**
 * 参数
 * 可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
 */
var a = new Set([1, 2, 3, 4, 4]);
var b = [...a];
var c = a.size;
console.log(a, b, c); // Set(4) {1, 2, 3, 4}  [1, 2, 3, 4] 4

// 去除重复数组
// 方法1
var a = [1, 5, 2, 6, 3, 4, 2];
var b = [...new Set(a)];
console.log(b); // [1, 5, 2, 6, 3, 4]
// 方法2
var c = Array.from(new Set(a));
console.log(c); // [1, 5, 2, 6, 3, 4]

// 去除字符串里面的重复字符
var a = [...new Set('ababbc')].join('');
console.log(a); // abc


/**
 * 向 Set 加入值的时候，不会发生类型转换
 * Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，
 * 它类似于精确相等运算符（===），
 * 主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
 * 
 * 两个对象总是不相等的
 */
var a = new Set();
var b = NaN;
var c = NaN;
a.add(b);
a.add(c);
console.log(a); // Set(1) {NaN}

a.add({});
a.add({});
console.log(a.size); // 3


/**
 * Set 实例的属性和方法
 * "constructor", "has", "add", "delete", "clear", "entries", "forEach", "size", "values", "keys"
 * constructor：构造函数，默认就是Set函数。
 * has(value)：返回一个布尔值，表示该值是否为Set的成员。
 * add(value)：添加某个值，返回 Set 结构本身。
 * delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * clear()：清除所有成员，没有返回值。
 * size：返回Set实例的成员总数。
 */
var a = new Set();
var b = Object.getOwnPropertyNames(a.__proto__);
console.log(b);
// ["constructor", "has", "add", "delete", "clear", "entries", "forEach", "size", "values", "keys"]


// 举例
var a = new Set();
a.add(1).add(2).add(3);
console.log(a); // Set(3) {1, 2, 3}

var b = a.has(1);
var c = a.has(4);
console.log(b, c); // true false

var d = a.delete(1);
console.log(d, a); // true Set(2) {2, 3}

var e = a.clear();
console.log(e, a); // undefined Set(0) {}



/**
 * 遍历操作 - Set的遍历顺序就是插入顺序。
 * keys()：返回键名的遍历器
 * values()：返回键值的遍历器
 * entries()：返回键值对的遍历器
 * forEach()：使用回调函数遍历每个成员
 * 
 * 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
 * 
 * Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
 * 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
 */

// keys values entries
var a = new Set(['red', 'green', 'blue']);
var b = a.keys(); // SetIterator {"red", "green", "blue"}
var c = a.values(); // SetIterator {"red", "green", "blue"}
var d = a.entries(); // SetIterator {"red" => "red", "green" => "green", "blue" => "blue"}
console.log(b, c, d);

// 默认遍历器生成函数就是它的values方法
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
var a = new Set(['red', 'green', 'blue']);
for (let x of a) {
  console.log(x); // red  green  blue
}

// forEach - 与数组一样
var a = new Set([1, 4, 9]);
var obj = {
  name: 'wyq'
};
a.forEach(function (value, key, arr) {
  console.log(key + ' : ' + value) // 1 : 1   4 : 4   9 : 9
  console.log(arr) // Set(3) {1, 4, 9}   Set(3) {1, 4, 9}   Set(3) {1, 4, 9}
  console.log(this); // {name: "wyq"}  {name: "wyq"}  {name: "wyq"}
}, obj)

// 与...结合
var a = new Set([1, 2, 3]);
a = new Set([...a].map(x => x * 2));
console.log(a); // Set(3) {2, 4, 6}

var a = new Set([1, 2, 3, 4, 5]);
a = new Set([...a].filter(x => (x % 2) == 0));
console.log(a); // Set(2) {2, 4}

/**
 * 并集 交集 差集
 */
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
console.log(union); // Set(4) {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(intersect); // Set(2) {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference); // Set(1) {1}










/**
 * WeakSet
 * "constructor", "delete", "has", "add"
 * 与 Set 类似，也是不重复的值的集合。
 * 
 * 区别:
 * 1、WeakSet 的成员只能是对象，而不能是其他类型的值。
 * 
 * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
 * 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
 * 
 * WeakSet 不可遍历
 * 
 * 任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。
 */
var ws = new WeakSet();
console.log(Object.getOwnPropertyNames(ws.__proto__)); // ["constructor", "delete", "has", "add"]

// ws.add(1) // Invalid value used in weak sets
// var ws = new WeakSet([1,2,3,4]) // Invalid value used in weak set

var ws = new WeakSet([
  [1, 2],
  [3, 4]
]);
console.log(ws); // WeakSet {Array(2), Array(2)}

/**
 * WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
 * WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
 * WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在
 */
var a = {};
var b = {};
ws.add(a);
console.log(ws) // WeakSet {{…}, Array(2), Array(2)}

var aa = ws.has(a);
var bb = ws.has(b);
console.log(aa, bb); // true false

var aa = ws.delete(a);
console.log(aa); // true

/**
 * WeakSet 没有size属性，没有办法遍历它的成员。
 * 
 * WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
 * WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
 */









/**
 * Map
 * 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
 * 
 * "constructor", "get", "set", "has", "delete", "clear", "entries", "forEach", "keys", "size", "values"
 */
var m = new Map();
console.log(m);
// ["constructor", "get", "set", "has", "delete", "clear", "entries", "forEach", "keys", "size", "values"]
console.log(Object.getOwnPropertyNames(m.__proto__));

var m = new Map();
var o = {
  p: 'Hello World'
};

m.set(o, 'content');
console.log(m); // Map(1) {{…} => "content"}
var b = m.get(o);
var c = m.has(o);
var d = m.delete(o);
var e = m.has(o);
console.log(b, c, d, e); // content true true false


/**
 * Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
 */
var m = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
console.log(m, m.size, m.has('name'), m.get('name'));
// Map(2) {"name" => "张三", "title" => "Author"} 2 true "张三"

/**
 * 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。
 * 这就是说，Set和Map都可以用来生成新的 Map。
 */
var set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
var m1 = new Map(set);
console.log(m1.get('foo')); // 1

var m2 = new Map([
  ['baz', 3]
]);
var m3 = new Map(m2);
console.log(m3.get('baz')); // 3

/**
 * 如果对同一个键多次赋值，后面的值将覆盖前面的值。
 * 
 * 如果读取一个未知的键，则返回undefined。
 * 
 * Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
 * 这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
 * 
 * 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
 * 比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
 * 另外，undefined和null也是两个不同的键。
 * 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
 */
var map = new Map();
map
  .set(1, 'aaa')
  .set(1, 'bbb');

var a = map.get(1);
console.log(a); // bbb
var b = map.get('asdddef');
console.log(b); // undefined


var map = new Map();
map.set(-0, 123);
map.get(+0) // 123
map.set(true, 1);
map.set('true', 2);
map.get(true) // 1
map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3
map.set(NaN, 123);
map.get(NaN) // 123


/**
 * Map.prototype.keys()：返回键名的遍历器。
 * Map.prototype.values()：返回键值的遍历器。
 * Map.prototype.entries()：返回所有成员的遍历器。
 * Map.prototype.forEach()：遍历 Map 的所有成员。
 * 
 * 需要特别注意的是，Map 的遍历顺序就是插入顺序。
 */


/**
 * Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
 */
console.log(map[Symbol.iterator] === map.entries) // true


// 结合...
var map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
var a = [...map.keys()];
var b = [...map.values()];
var c = [...map.entries()];
console.log(a, b, c); // [1, 2, 3]  ["one", "two", "three"]  [Array(2), Array(2), Array(2)]












/**
 * WeakMap
 * WeakMap与Map的区别有两点:
 * 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
 * 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制
 * 
 * "constructor", "delete", "get", "set", "has"
 * WeakMap 与 Map 在 API 上的区别主要是两个，
 * 一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
 * 二是无法清空，即不支持clear方法。
 * 
 * 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
 */
var wm = new WeakMap();
console.log(Object.getOwnPropertyNames(wm.__proto__)); //["constructor", "delete", "get", "set", "has"]


var map = new WeakMap();
// map.set(1, 2)// Invalid value used as weak map key
// map.set(Symbol(), 2)// Invalid value used as weak map key
// map.set(null, 2)// Invalid value used as weak map key


// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
var wm = new WeakMap();
var key = {};
var obj = {
  foo: 1
};

wm.set(key, obj);
obj = null;
console.log(wm.get(key)); // {foo: 1}





/**
 * WeakMap键名是否存在演示
 * 可以通过 Node 的process.memoryUsage方法看出来。
 * 
 * 第一步:--expose-gc参数表示允许手动执行垃圾回收机制。
 * node --expose-gc
 * 
 * 第二步:
 * // 手动执行一次垃圾回收，保证获取的内存使用状态准确
 * > global.gc();
 * undefined
 * 
 * // 查看内存占用的初始状态，heapUsed 为 4M 左右
 * > process.memoryUsage();
 * { rss: 21106688,
 * heapTotal: 7376896,
 * heapUsed: 4153936,
 * external: 9059 }
 * > let wm = new WeakMap();
 * undefined
 * 
 * // 新建一个变量 key，指向一个 5*1024*1024 的数组
 * > let key = new Array(5 * 1024 * 1024);
 * undefined
 * 
 * // 设置 WeakMap 实例的键名，也指向 key 数组
 * // 这时，key 数组实际被引用了两次，
 * // 变量 key 引用一次，WeakMap 的键名引用了第二次
 * // 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
 * > wm.set(key, 1);
 * WeakMap {}
 * > global.gc();
 * undefined
 * 
 * // 这时内存占用 heapUsed 增加到 45M 了
 * > process.memoryUsage();
 * { rss: 67538944,
 * heapTotal: 7376896,
 * heapUsed: 45782816,
 * external: 8945 }
 * 
 * // 清除变量 key 对数组的引用，
 * // 但没有手动清除 WeakMap 实例的键名对数组的引用
 * > key = null;
 * null
 * 
 * // 再次执行垃圾回收
 * > global.gc();
 * undefined
 * 
 * // 内存占用 heapUsed 变回 4M 左右，
 * // 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
 * > process.memoryUsage();
 * { rss: 20639744,
 * heapTotal: 8425472,
 * heapUsed: 3979792,
 * external: 8956 }
 * 
 * Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。
 * 这个按钮也能用来观察 WeakMap 里面的引用是否消失。
 */




/**
 * WeakMap 的用途
 */
// DOM 节点作为键名
// var myWeakmap = new WeakMap();
// myWeakmap.set(
//   document.getElementById('logo'), {
//     timesClicked: 0
//   });
// document.getElementById('logo').addEventListener('click', function () {
//   let logoData = myWeakmap.get(document.getElementById('logo'));
//   logoData.timesClicked++;
// }, false);


// 部署私有属性
const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}
var c = new Countdown(2, () => console.log('DONE'));
c.dec()
c.dec()
// DONE