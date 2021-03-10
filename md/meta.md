# meta 标签

## 定义和用法

```js
meta 标签位于文档头部，不包含任何内容。meta标签的属性定义了与文档相关联的名称/值对。
meta 元素提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
```

__提示和注释：__

1. `<meta>`标签永远位于head元素内部。
2. 元数据总是以名称/值的形式被成对传递的。

## 属性

| 属性  | 值   | 描述  |
|:-------:|:-----|:--------|
|charset | character encoding | 定义文档的字符编码。      |
|content | some_text |定义与 http-equiv 或 name 属性相关的元信息。 |
http-equiv  
content-type
expires
refresh
set-cookie
把 content 属性关联到 HTTP 头部。    4   5
name    
author
description
keywords
generator
revised
others
把 content 属性关联到一个名称。    4   5
scheme  some_text   定义用于翻译 content 属性值的格式。不支持。  4    

