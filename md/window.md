# window 对象

1. Window 对象表示浏览器中打开的窗口。
2. 如果文档包含框架（frame 或 iframe 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。
3. 没有应用于 window 对象的公开标准，不过所有浏览器都支持该对象。

# window 对象集合

## frames-用不上

1. 返回窗口中所有命名的框架。
2. 该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架或 `<iframe>`。属性 frames.length 存放数组 frames[] 中含有的元素个数。注意，frames[] 数组中引用的框架可能还包括框架，它们自己也具有 frames[] 数组。

# window 对象属性

## devicePixelRatio

### 定义

1. window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
2. __公式表示：__window.devicePixelRatio = 物理像素 / dips
3. __设备物理像素：__设备能显示的最小单位。
4. __设备独立像素：__独立于设备的用于逻辑上衡量像素的单位。
5. 如果设备总是以物理像素来显示内容，可能导致内容太小而看不清。浏览器就会对内容做一次放大后再渲染。这个放大比例就是设备像素比。当我们进行浏览器缩放时，其实就是在改变浏览器的设备像素比。

### PPI

1. PPI：单位英寸的像素数(pixel per inch)，代表屏幕的像素密度。
2. 当PPI越高时在同一尺寸的屏幕上能显示更多的像素，也能够展现更多的画面细节。
3. PPI的计算：屏幕的物理像素除以物理尺寸。
4. PPI过高的问题：相同的图片素材，在越高的设备上会显示得越小（PPI提高一倍，图片在设备中显示小了4倍）

### CSS像素

1. 前端开发时，用来控制元素样式的单位像素，称为CSS像素。
2. 浏览器默认情况下，CSS像素和屏幕像素1:1。
3. 当页面放大时，CSS像素被拉伸，1个CSS像素大于1个屏幕像素。

## closed-用不上

1. closed 属性可返回一个布尔值，该值声明了窗口是否已经关闭。
2. 该属性为只读。
3. 当浏览器窗口关闭时，表示该窗口的 Windows 对象并不会消失，它将继续存在，不过它的 closed 属性将设置为 true。

## defaultStatus-没什么用，谷歌浏览器就没有状态栏

1. defaultStatus 属性可设置或返回窗口状态栏中的默认文本。
2. 该属性可读可写。
3. 该文本会在页面加载时被显示。

## length-不大用的到

1. 返回在当前窗口中frames的数量（包括IFRAMES）。

## name-不大用的到

可设置或返回存放窗口的名称的一个字符串。

## opener-试了一下不大好用

opener 属性是一个可读可写的属性，可返回对创建该窗口的 Window 对象的引用。当使用window.open()打开一个窗口，您可以使用此属性返回来自目标窗口源（父）窗口的详细信息。
总之就是：实现父窗口和子窗口传值。

__兼容性：__所有

[实例1](../../实验基地/window/opener.html)
[实例2](../../实验基地/window/openerF.html)

## innerheight、innerwidth-重点研究兼容性

1. 只读属性，声明了窗口的文档显示区的高度和宽度，以像素计。
2. 这里的宽度和高度不包括菜单栏、工具栏以及滚动条等的高度。
3. __兼容性：__ie9+ opera google safari firefox
4. IE678 不支持这些属性。它用 document.documentElement 或 document.body 的 clientWidth 和 clientHeight 属性作为替代。

## outerWidth、outerHeight

1. outerHeight属性设置或返回一个窗口的外部高度，包括所有界面元素（如工具栏/滚动条）。
2. outerWidth属性设置或返回窗口的外部宽度，包括所有的界面元素（如工具栏/滚动）。
3. 兼容性：ie9+ opera google safari firefox

## document

__参照document对象__

## history

__参照history对象__

## location 

__参照location对象__

## navigator

__参照navigator对象__


