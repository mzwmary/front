# new FileReader()(HTML5)

FileReader主要用于将文件内容读入内存，通过一系列异步接口，可以在主线程中访问本地文件。
使用FileReader对象，web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，可以使用File对象或者Blob对象来指定所要处理的文件或数据。

## 对象创建

```js
var render = new FileReader();
```

## 方法

|方法定义|描述|
|--------|----|
|abort():void|终止文件读取操作|
|readAsDataURL(file):void|异步读取文件内容，结果用data:url的字符串形式表示。本方法还是适合于上传内容简单或所占内存较小的文件。|
|readAsText(file,encoding):void|异步按字符读取文件内容，结果用字符串形式表示。对于媒体文件（图片、音频、视频），其内部组成并不是按字符排列，故采用readAsText读取，会产生乱码，同时也不是最理想的读取文件的方式。|
|readAsBinaryString(file):void|异步按字节读取文件内容，结果为文件的二进制串。readAsBinaryString的结果就是读取二进制并编码后的内容。由于读取后的内容被编码为字符，大小会受到影响，故不适合直接传输，也不推荐使用。|
|readAsArrayBuffer(file):void|异步按字节读取文件内容，结果用ArrayBuffer对象表示。文件读取后大小，与原文件大小一致。这也就是readAsArrayBuffer与readAsBinaryString方法的区别，readAsArrayBuffer读取文件后，会在内存中创建一个ArrayBuffer对象（二进制缓冲区），将二进制数据存放在其中。通过此方式，我们可以直接在网络中传输二进制内容。|

## 事件

|事件名称|描述|
|--------|----|
|onloadstart|当读取操作将要开始之前调用|
|onprogress|在读取数据过程中周期性调用|
|onabort|当读取操作被中止时调用|
|onerror|当读取操作发生错误时调用|
|onload|当读取操作成功完成时调用|
|onloadend|当读取操作完成时调用,不管是成功还是失败|

[FileReader异步读取过程](../../../例子/JavaScript/new_object/FileReader异步读取过程.html)

[FileReader图片预览](../../../例子/JavaScript/new_object/FileReader图片预览.html)

[FileReader多图片预览](../../../例子/JavaScript/new_object/FileReader多图片预览.html)

[FileReader图片压缩、预览、图片Base64转换](../../../例子/JavaScript/new_object/FileReader图片压缩-预览-图片Base64转换.html)

[FileReader](../../../例子/JavaScript/new_object/FileReader.html)

# new Image()

Image 对象代表嵌入的图像。
`<img>`标签每出现一次，一个 Image 对象就会被创建

## Image 对象的属性

|属性|描述|
|----|----|
|align|设置或返回与内联内容的对齐方式。|
|alt|设置或返回无法显示图像时的替代文本。|
|border|设置或返回图像周围的边框。|
|complete|返回浏览器是否已完成对图像的加载。|
|height|设置或返回图像的高度。|
|hspace|设置或返回图像左侧和右侧的空白。|
|id|设置或返回图像的 id。|
|isMap|返回图像是否是服务器端的图像映射。|
|longDesc|设置或返回指向包含图像描述的文档的 URL。|
|lowsrc|设置或返回指向图像的低分辨率版本的 URL。|
|name|设置或返回图像的名称。|
|src|设置或返回图像的 URL。|
|useMap|设置或返回客户端图像映射的 usemap 属性的值。|
|vspace|设置或返回图像的顶部和底部的空白。|
|width|设置或返回图像的宽度。|

## 标准属性
|属性|描述|
|----|----|
|className|设置或返回元素的 class 属性。|
|title|设置或返回元素的 title。|

## 事件
|事件句柄|描述|
|--------|----|
|onabort|当用户放弃图像的装载时调用的事件句柄。|
|onerror|在装载图像的过程中发生错误时调用的事件句柄。|
|onload|当图像装载完毕时调用的事件句柄。|