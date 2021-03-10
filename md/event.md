# event

## 兼容问题 
1. 火狐浏览器支持带参
2. ie678浏览器支持不带参
3. 谷歌带参不带参都可以

```js
    // 兼容写法：
    document.onclik = funciton(event){
        event = event || window.event;
        console.log(event)
    }
```

## 常用事件对象

### pageY screenY 和 clientY

1. 浏览器的位置 event.clientY
2. 屏幕的位置 event.screenY
3. 网页位置 event.pageY (ie678 不支持)

```js
    // 兼容获取鼠标在页面中的位置
   
   document.onclick = function (event) {
       event = event || window.event;

       var pagex = event.pageX || event.clientX + scroll().left;
       var pagey = event.pageY || event.clientY + top;
       console.log(pagex);
       console.log(pagey);

       console.log(event.screenX);
       console.log(event.screenY);

       console.log(event.clientX);
       console.log(event.clientY);

      // pageY 和 pageX  ie678不支持 ；所以兼容获取
      // 鼠标在整个页面的坐标 = 可视区域的坐标 + 页面被卷去的部分

    function scroll() {
        return {
            top:window.pageYOffset || document.documentElement.scrollTop,
            left:window.pageXOffset || document.documenElement.scrollLeft;
        }
    }

   }
```


