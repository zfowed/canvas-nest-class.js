
`canvas-nest.js` 是一款好看的粒子背景插件，效果比较酷，很早之前就在某网站上发现了，去 `GitHub` 翻找一下就找到了这个：

> `GitHub` 链接: [https://github.com/hustcc/canvas-nest.js](https://github.com/hustcc/canvas-nest.js)

因为不是模块化的，所以我就造了个轮子。。。

[预览](https://zfowed.github.io/canvas-nest-class.js/demo/index.html)

## 特性

- 不依赖任何框架或者内库，比如不依赖 jQuery，使用原生的 javascript。
- 非常小，只有1.6 kb，如果开启 gzip，可以更小。
- 非常容易实现，配置简单，即使你不是web开发者，也能简单搞定。

## 浏览器

使用非常简单，将下面的代码插入到 `<body>` 和 `</body>` 之间就行了。

```html
<html>
<head>
  ...
</head>
<body>
  ...
  ...
  ...
  <script type="text/javascript" src="../dist/canvas-nest-class.js"></script>
  <script type="text/javascript">
    new CanvasNest();
  </script>
</body>
</html>
```

这样子它会自动在 `<body>` 中创建一个 `<canvas>` 并进行一些样式调整。

### NPM安装

```shell
npm install canvas-nest-class.js -S
```

#### CommonJS

```javascript
var CanvasNest require('canvas-nest-class.js')
```

#### ES6

```javascript
import CanvasNest from 'canvas-nest-class.js'
```

#### AMD

```javascript
define(['canvas-nest-class.js'], function(CanvasNest) {
  // body
});
```

#### 配置与使用

```javascript
new CanvasNest({
  el: document.querySelector('canvas'), // 默认自动添加 <canvas> 到 <body>
  opacity: 0.1, // 最低透明度，默认 0.1
  color: '0,0,0', // 线条颜色，默认 "0,0,0"
  count: 99, // 生成点的数量，默认 99
  zIndex: -1 // 自动添加的 <canvas> z-index样式属性，默认 -1
});
```
