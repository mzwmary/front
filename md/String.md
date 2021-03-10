# String对象

作用：处理文本（字符串）。

## 创建 String 对象：

```js
new String(s);
String(s);
var str = "";
```

```
1. 参数:
        参数 s 是要存储在 String 对象中或转换成原始字符串的值。
2. 返回值：
        当 String() 和运算符 new 一起作为构造函数使用时，它返回一个新创建的 String 对象，存放的是字符串 s 或 s 的字符串表示。
        当不用 new 运算符调用 String() 时，它只把 s 转换成原始的字符串，并返回转换后的值。
```

```js
举例：
var a = new String('s');//String {0: "s", length: 1, [[PrimitiveValue]]: "s"}
var b = String('s');//s
var s;
var c = new String(s);//String {0: "u", 1: "n", 2: "d", 3: "e", 4: "f", 5: "i", 6: "n", 7: "e", 8: "d", length: 9, [[PrimitiveValue]]: "undefined"}
```

## String 对象属性

1. constructor：对创建该对象的函数的引用
2. prototype：允许您向对象添加属性和方法
3. length：字符串的长度

## String 对象原型链

![String原型链图](../../imgs/string.png)


## 为字符串添加样式

1. Big：__txt.big()__
2. Small：__txt.small()__
3. Bold：__txt.bold()__
4. Italic：__txt.italics()__
5. Blink：__txt.blink()__  _(does not work in IE)_
6. Fixed：__txt.fixed()__
7. Strike：__txt.strike()__
8. Fontcolor：__txt.fontcolor("Red")__
9. Fontsize：__txt.fontsize(16)__
10. Lowercase：__txt.toLowerCase()__
11. Uppercase：__txt.toUpperCase()__
12. Subscript：__txt.sub()__
13. Superscript：__txt.sup()__
14. Link：__txt.link("http://www.w3school.com.cn")__

## 字符串方法

### anchor()

```
1. 作用：创建 HTML 锚
2. 语法：stringObject.anchor(anchorname)
3. 参数：anchorname  (必需,为锚定义名称)
```


### charAt()

```
1. 作用：根据下标找对应的字符
2. 语法：string.charAt(n);
3. 参数：n (可不写,默认为0)
4. 返回值：字符串string的第n个字符。 
           若n不在0~string.length-1范围内，返回 “”
```

```js
举例：
var str = "hello";
//无参数（默认为0）
str.charAt();//h
//在范围的参数
str.charAt(1);//e
//不在范围的参数
str.charAt(100);//""
```

### charCodeAt()

```
1. 作用：根据下标找对应的字符
2. 语法：string.charCodeAt(n);
3. 参数：n (可不写,默认为0)
4. 返回值：返回字符串中第ｎ个字符串在Unicode中的编码 
           若n不在0~string.length-1范围内，返回NaN。
```

```js
举例：
var str = "hello";
//无参数（默认为0）
str.charCodeAt();//104
//在范围内的参数
str.charCodeAt(1);//101
//不在范围内的参数
str.charCodeAt(100);//NaN
```

### fromCharCode()

```
1. 作用：根据字符编码找对应字符
2. 语法：string.fromCharCode(n1,n2…)
3. 参数：n1、n2…（字符编码）
4. 返回值：含有指定编码的字符的新字符串
5. 注意点：fromcharCode()是构造函数 String()的属性，而不是字符串或String对象的方法。
```

```js
举例：
var s = String.fromCharCode(104, 101, 108,108, 111);
console.log(s); //hello
```                
            
### indexOf()

```
1. 作用：根据字符找下标
2. 语法：string.indexOf(str，n)
3. 参数：str - 要在字符串string中检索的子串 
         n - 开始检索的位置 
             可不写，默认为0
4. 返回值：返回第一个出现str的第一个字符在string中的位置要完整包含，否则返回-1 
           若没有，返回-1
```

```js
举例：
var str = "hello";
//无参数
str.indexOf();//-1
//只有一个参数 （n默认为0）
str.indexOf("h");//0
//不能完整包含参数n;
str.indexOf("ho");//-1
```

### lastIndexOf()

```
1. 作用：根据字符找下标，从后往前找
2. 语法：string.lastIndexOf(str，n)
3. 参数：str - 要在字符串string中检索的子串 
         n - 开始检索的位置 
             可不写，默认为0
4. 返回值：返回第一个出现str的第一个字符在string中的位置要完整包含，否则返回-1 
           若没有，返回-1
```

```js
举例：
var str = "hello";
str.lastIndexOf("h");//0
```

### toUpperCase()

```
1. 作用：将小写字母转成大写
2. 语法：string.toUpperCase()
3. 参数：无参数
4. 返回值：将所有小写字符都被转换成了大写字符 后的string
5. 原字符串：不变
```

```js
举例：
var str = hello;
var str1 = str.toUpperCase();
console.log(str);//hello
console.log(str1);//HELLO
```

### toLowerCase()

```
1. 作用：将大写字母转成小写
2. 语法：string.toLowerCase()
3. 参数：无参数
4. 返回值：将所有大写字符都被转换成了小写字符 后的string
5. 原字符串：不变
```

```js
举例：
var str = HELLO;
var str1 = str.toLowerCase();
console.log(str);//HELLO
console.log(str1);//hello
```

### slice()

```
1. 作用: 用于截取字符串，返回新的截取后的字符串
2. 语法：string.slice(start,end)
3. 参数：start - 开始截取的下标 
         end - 结束截取的下标(不包含结束位置)
         如果是负数，从尾部位置开始算起
4. 返回值：截取后新的字符串
5. 原字符串：不变
```

```js
举例：
var str = "hello";
//一个参数，默认截取到最后
str.slice(0);//hello
//两个参数，包括左边，不包括右边
str.slice(0,1);//h
```

### substring()

```
1. 作用：用于截取字符串，返回新的截取后的字符串
2. 语法：string.subString(from,to)
3. 参数：from - 开始截取的位置 
         to - 结束截取的位置（不包含结束的位置） 
         to 可省略，默认到字符串结尾位置
4. 返回值：截取的新的字符串 
           若from = to 返回 “”
           若from > to 先交换参数位置，但包含的还是from, 不包含to
5. 原字符串：不变
```

```js
举例：
//其它与slice相似
var str = "hello";
// from = to
str.substring(0,0);//""
//from > to
str.substring(1,0);//h
```

### split()

```
1. 作用：将字符串用分隔符转成数组
2. 语法：string.split(a,limit)
3. 参数：a - 字符串或正则表达式,从该参数指定的地方分割string 
         limit - 指定了返回的数组的最大长度(可不写)
4. 返回值：一个字符串数组 
           若 a 在 string 开头位置，返回的数组的第一个元素是空字符串
           若 a 在 string 结尾位置，返回的数组的最后一个元素是空字符串
           若 a 为 ""（空字符串），将string中元素全部分割
           若 a 为 " "（空格），从空格处分割
5. 原字符串：不变
```

```js
举例：
var str = "hello";
//a在开头位置
var str1 = str.split('h');
console.log(str1);//["", "ello"]
//a在结尾位置
var str2 = str.split('o');
console.log(str2);//["hell", ""]
//a 为 ""
var str3 = str.split('');
console.log(str3);//["h", "e", "l", "l", "o"]
//a 为 " "
var str3 = str.split(' ');
console.log(str3);//["hello"]

console.log(str);//hello
```