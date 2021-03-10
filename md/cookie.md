# cookie

1. cookie 其实就是 document 的一个属性，可以通过document.cookie 来访问

2. cookie 就是一个长的字符串，这个字符串的格式 kay=value

3. 存 cookie 可以直接使用 document.cookie='key=value';对于 document.cookie 的赋值操作不会覆盖之前的内容，而是一个追加操作！

```js
  document.cookie = 'name = 张三';
  document.cookie = 'age = 18';

  function getCookie(key){
      // key= value;key=value
      var kvPairArr = document.cookie.split(';');
      var result = undefined;
      kvPairArr.forEach(function(v){
          var kvPair = v.split('=');
          if(key = kvPair[0].trim()){
              result = kvPair[1];
          }
      })
      return result;
  }
```
### cookie设置过期时间和路径

```js
// 过期时间
$.cookie('age',20,{expires:7});
// 设置路径
$.cookie('gender','male',{path:'/home/index'});

```

### cookie 用途
1. 存储数据
2. 同一个域名下共享数据

注意：当前域名中所有的cookie会伴随着每一次请求发送给服务器！！！ so cookie中不能存大量数据


# session

`session 是服务器端的一个存储空间，session 中划分了一个个的小空间，每个小空间都会有一个sessionID`
