# Canvas

## <canvas>元素

```js
<canvas id="myCanvas" width="300" height="150">您的浏览器版本太低，请升级浏览器，或用其它浏览器打开！</canvas>
```

1. canvas 只有两个属性 width 和 height.
2. 不要使用 CSS 的方式设置宽高, 应该使用 HTML 属性.可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。
3. 默认 canvas 的宽高为 300 和 150
4. 如果浏览器不支持 canvas 标签, 那么就会将其解释为 div 标签. 因此常常在 canvas 中嵌入文本, 以提示用户浏览器的能力.
5. canvas 的兼容性非常强, 只要支持该标签的, 基本功能都一样, 因此不用考虑兼容性问题.
6. canvas 本身不能绘图. 是使用 JavaScript 来完成绘图. canvas 对象提供了各种绘图用的api.
7. 与`<img>`元素不同,`<canvas>`元素需要结束标签`</canvas>`。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

## 渲染上下文 - getContext()

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

```js
var canvas = document.createElement( 'canvas' );
canvas.width = 500;
canvas.height = 400;
canvas.style.border = '1px dashed red';
document.body.appendChild( canvas );
// 获得 CanvasRenderingContext2D 对象
var ctx = canvas.getContext( '2d' );
```

或：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>canvas</title>
    <style>
        #mycanvas {
            border:1px solid red;
        }
    </style>
</head>
<body>
    <canvas width="800" height="600" id="mycanvas">您的浏览器版本太低，请升级浏览器，或用其它浏览器打开！</canvas>
    <script>
        var mycanvas = document.querySelector("#mycanvas");
        if(mycanvas.getContext){
            var ctx = mycanvas.getContext("2d");
            
        
        }
    </script>
</body>
</html>
```

[查看列子](../../实验基地/canvas/canvas_00.html)

1. WebGL 使用了基于OpenGL ES的3D上下文 ("experimental-webgl") 。目前对WebGL支持还不够好，先不讨论。
2. getContext()方法，这个方法是用来获得渲染上下文和它的绘画功能。

```
getContext 方法：
语法: Canvas.getContext( typeStr ) 
描述:
1. 该方法用于绘制上下文工具.
2. 如果是绘制平面图形使用 '2d' 作为参数, 如果绘制立体图形使用 'webgl'.
3. 使用 '2d' 返回 CanvasRenderingContext2D 类型的对象.
4. 使用 'webgl' 返回 WebGLRenderingContext 类型的对象.
```

## 检查支持性

替换内容是用于在不支持 `<canvas> `标签的浏览器中展示的。通过简单的测试getContext()方法的存在，脚本可以检查编程支持性。上面的代码片段现在变成了这个样子：

```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## 绘制矩形

```js
//绘制一个填充的矩形
fillRect(x, y, width, height)

//绘制一个矩形的边框
strokeRect(x, y, width, height)

//清除指定矩形区域，让清除部分完全透明
clearRect(x, y, width, height)
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>canvas</title>
    <style>
        #mycanvas {
            border:1px solid #ccc;
        }
    </style>
</head>
<body>
    <canvas width="800" height="600" id="mycanvas">您的浏览器版本太低，请升级浏览器，或用其它浏览器打开！</canvas>
    <script>
        var mycanvas = document.querySelector("#mycanvas");
        if(mycanvas.getContext){
            var ctx = mycanvas.getContext("2d");
            
            //绘制矩形
            ctx.fillRect(25,25,100,100);
            ctx.clearRect(45,45,60,60);
            ctx.strokeRect(50,50,50,50);
        }
    </script>
</body>
</html>
```

[查看列子](../../实验基地/canvas/canvas_01.html)

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。

```js
//新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
beginPath()

//闭合路径之后图形绘制命令又重新指向到上下文中。
closePath()

//通过线条来绘制图形轮廓。
stroke()

//通过填充路径的内容区域生成实心的图形。
fill()
```

第一步：beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论最后的是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。

第二步：调用函数指定绘制路径

第三步：闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

### 移动笔触-moveTo(x,y)

一个非常有用的函数，而这个函数实际上并不能画出任何东西，也是路径列表的一部分。当canvas初始化或者beginPath()调用后，你通常会使用moveTo()函数设置起点。我们也能够使用moveTo()绘制一些不连续的路径。看一下下面的笑脸例子。

```js
function drawSmileFace(ctx) {
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    ctx.stroke();
}
```

[查看列子](../../实验基地/canvas/canvas_01.html)

### 绘制线-lineTo()

```js
//绘制一条从当前位置到指定x以及y位置的直线。
lineTo(x, y)
```

[查看列子](../../实验基地/canvas/canvas_07.html)

### 绘制圆弧

```js
arc(x, y, radius, startAngle, endAngle, anticlockwise)
//画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针false）来生成。

arcTo(x1, y1, x2, y2, radius)
//根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
```

这里详细介绍一下arc方法，该方法有六个参数：x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

__注意__：arc()函数中的角度单位是弧度，不是度数。角度与弧度的js表达式:`radians=(Math.PI/180)*degrees`。

```js
function drawArcs(ctx) {
  for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
          ctx.beginPath();
          var x = 25+j*50; // x 坐标值
          var y = 25+i*50; // y 坐标值
          var radius = 20; // 圆弧半径
          var startAngle = 0; // 开始点
          var endAngle = Math.PI+(Math.PI*j)/2; // 结束点
          var anticlockwise = i%2==0 ? false : true; // 顺时针或逆时针

          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

          if (i>1){
            ctx.fill();
          } else {
            ctx.stroke();
          }
      }
  }
}
```

[查看列子](../../实验基地/canvas/canvas_03.html)

### 绘制矩形

```js
//绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
rect(x, y, width, height)
```

当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置回默认坐标。

[查看列子](../../实验基地/canvas/canvas_06.html)

### 二次贝塞尔曲线及三次贝塞尔曲线

```js
//绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
quadraticCurveTo(cp1x, cp1y, x, y)

//绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```
#### 绘制二次贝塞尔曲线-quadraticCurveTo(cp1x, cp1y, x, y)

```js
function drawQuadraticCurveTo(ctx) {
    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.quadraticCurveTo(125,100,125,62.5);
    ctx.quadraticCurveTo(125,25,75,25);
    ctx.stroke();
}
```

[查看列子](../../实验基地/canvas/canvas_04.html)

#### 绘制三次贝塞尔曲线-bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

```js
function drawBezierCurveTo(ctx) {
    //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.fill();
}
```

[查看列子](../../实验基地/canvas/canvas_05.html)

### 组合使用

[查看列子](../../实验基地/canvas/canvas_08.html)
