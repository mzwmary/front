# CSS3 渐变（Gradients）

## 线性渐变（Linear Gradients）

### left/right/top/bottom

> - 语法：`background: linear-gradient(direction, color-stop1, color-stop2, ...)`

#### direction 不填;从上到下

```css
#grad {
  background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(red, blue); /* 标准的语法 */
}
```

![从上到下渐变](../images/backgound-linear-gradient-01.jpg) 

#### direction: to right;从左到右

```css
#grad {
  background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

![从左到右渐变](../images/backgound-linear-gradient-02.jpg) 

#### direction：to bottom right;对角

```css
#grad {
  background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
```

![对角](../images/backgound-linear-gradient-03.jpg) 

### 角度

角度是指水平线和渐变线之间的角度，逆时针方向计算。换句话说，0deg 将创建一个从下到上的渐变，90deg 将创建一个从左到右的渐变。

> - 语法：`background: linear-gradient(angle, color-stop1, color-stop2)`

![角度](../images/backgound-linear-gradient-04.jpg) 

### 多个颜色结点

```css
#grad {
  background: -webkit-linear-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(red, green, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(red, green, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(red, green, blue); /* 标准的语法 */
}
```

![多颜色](../images/backgound-linear-gradient-05.jpg) 

### 使用透明度（transparent）

```css
#grad {
  background: -webkit-linear-gradient(left,rgba(255,0,0,0),rgba(255,0,0,1)); /* Safari 5.1 - 6 */
  background: -o-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Opera 11.1 - 12*/
  background: -moz-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Firefox 3.6 - 15*/
  background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 标准的语法 */
}
```

![多颜色](../images/backgound-linear-gradient-06.jpg)

### 重复的线性渐变

repeating-linear-gradient() 函数用于重复线性渐变

```js
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* Opera 11.1 - 12.0 */
  background: -o-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* Firefox 3.6 - 15 */
  background: -moz-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* 标准的语法 */
  background: repeating-linear-gradient(red, yellow 10%, green 20%);
}
``` 

![重复的线性渐变](../images/backgound-linear-gradient-07.jpg)

## 径向渐变（Radial Gradients）

由它们的中心定义

> - `background: radial-gradient(center, shape size, start-color, ..., last-color)`

### 径向渐变 - 颜色结点均匀分布（默认情况下）

```css
#grad {
  background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
  background: radial-gradient(red, green, blue); /* 标准的语法 */
}
```

![径向渐变](../images/backgound-radial-gradient-01.jpg)

### 径向渐变 - 颜色结点不均匀分布

```css
#grad {
  background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
  background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
}
```

![径向渐变](../images/backgound-radial-gradient-02.jpg)

### 设置形状-shape

shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。

```css
#grad1 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, yellow, green); /* 标准的语法（必须放在最后） */
}

#grad2 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle, red, yellow, green); /* 标准的语法（必须放在最后） */
}
```

![径向渐变](../images/backgound-radial-gradient-03.jpg)

### size

```css
#grad1 {
    height: 150px;
    width: 150px;
    background: -webkit-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); /* Firefox 3.6 - 15 */
    background: radial-gradient(60% 55%, closest-side,blue,green,yellow,black); /* 标准的语法（必须放在最后） */
}

#grad2 {
    height: 150px;
    width: 150px;
    background: -webkit-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black); /* Firefox 3.6 - 15 */
    background: radial-gradient(60% 55%, farthest-side,blue,green,yellow,black); /* 标准的语法（必须放在最后） */
}

#grad3 {
    height: 150px;
    width: 150px;
    background: -webkit-radial-gradient(60% 55%, closest-corner,blue,green,yellow,black); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(60% 55%, closest-corner,blue,green,yellow,black); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(60% 55%, closest-corner,blue,green,yellow,black); /* Firefox 3.6 - 15 */
    background: radial-gradient(60% 55%, closest-corner,blue,green,yellow,black); /* 标准的语法（必须放在最后） */
}

#grad4 {
    height: 150px;
    width: 150px;
    background: -webkit-radial-gradient(60% 55%, farthest-corner,blue,green,yellow,black); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(60% 55%, farthest-corner,blue,green,yellow,black); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(60% 55%, farthest-corner,blue,green,yellow,black); /* Firefox 3.6 - 15 */
    background: radial-gradient(60% 55%, farthest-corner,blue,green,yellow,black); /* 标准的语法（必须放在最后） */
}
```

![径向渐变](../images/backgound-radial-gradient-04.jpg)
![径向渐变](../images/backgound-radial-gradient-05.jpg)

### 重复的径向渐变

```css
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* Opera 11.6 - 12.0 */
  background: -o-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* Firefox 3.6 - 15 */
  background: -moz-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* 标准的语法 */
  background: repeating-radial-gradient(red, yellow 10%, green 15%);
}
```

![径向渐变](../images/backgound-radial-gradient-06.jpg)

# 2D 转换

> - 属性：
>   + transform
>   + transform-origin

## translate()

> - 语法：`transform:translate(x [,y])`
> - 参数：
>   + x：必须，x轴方向移动距离，参数为正向右，，为负相反；
>   + y：可选，默认为0，参数为正向下，为负相反；

```css
div
{
    width:100px;
    height:75px;
    background-color:red;
    border:1px solid black;
}
div#div2
{
    transform:translate(50px,100px);
    -ms-transform:translate(50px,100px); /* IE 9 */
    -webkit-transform:translate(50px,100px); /* Safari and Chrome */
}
```

```html
<div>Hello. This is a DIV element.</div>
<div id="div2">Hello. This is a DIV element.</div>
```

![径向渐变](../images/2D-translate-01.jpg)

## rotate()

> - 语法：`transform:rotate(angle)`
> - 参数：
>   + angle:角度，为正顺时针旋转，为负相反；

```css
div#div2
{
    transform:rotate(30deg);
    -ms-transform:rotate(30deg); /* IE 9 */
    -webkit-transform:rotate(30deg); /* Safari and Chrome */
}
```

![径向渐变](../images/2D-rotate-01.jpg)

## scale()

> - 语法：`transform:rotate(x,[,y])`
> - 参数：
>   + x:x轴缩放大小
>   + y:可选，y轴缩放大小，默认与x相同

scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数

```css
//宽度是原始大小的两倍，高度是原始大小的三倍。

-ms-transform:scale(2,3); /* IE 9 */
-webkit-transform: scale(2,3); /* Safari */
transform: scale(2,3); /* 标准语法 */
```

## skew()

> - 语法：`transform:skew(<angle> [,<angle>])`
> - 参数：
>   + skewX(<angle>);表示只在X轴(水平方向)倾斜。
>   + skewY(<angle>);表示只在Y轴(垂直方向)倾斜。

## matrix()

> - 语法：`matrix(a,b,c,d,e,f)`
> - 参数：
>   + a 水平缩放
>   + b 水平倾斜
>   + c 垂直倾斜
>   + d 垂直缩放
>   + e 水平移动
>   + f 垂直移动