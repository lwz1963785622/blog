# 一分钟上手React


### 步骤 1： 添加一个 DOM 容器到 HTML

首先，利用你熟悉编辑器(Vscode等)创建一个 HTML 页面。添加一个空的 `<div>` 标签作为标记你想要用 React 显示内容的位置。例如：
```html
<!-- 其他HTML代码 -->
<body>
    <div id="app"></div>
</body>
<!-- 其他HTML代码 -->
```
> 你可以像这样在 `<body>` 标签内的任意位置放置一个“容器” `<div>`。根据需要，你可以在一个页面上放置多个独立的 DOM 容器。它们通常是空标签 —— React 会替换 DOM 容器内的任何已有内容。

### 步骤 2：引入依赖库文件
接下来，在 `</body>` 结束标签之前，向 HTML 页面中添加2个 `<script>` 标签：
```html
<!-- 其他HTML代码 -->
<body>
    <div id="app"></div>

    <!-- 引入react.js与react-dom.js库文件 -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

</body>
```
### 步骤 3：创建一个 React 组件
在 HTML 页面文件引入依赖库文件 `<script>` 后，在 `</body>` 结束标签之前，我们可以添加一个`<script>` ，加入代码。
```html
<!-- 其他HTML代码 -->
<body>
    <div id="app"></div>

    <!-- 引入react.js与react-dom.js库文件 -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script>
    //1. 创建一个React元素
    var hello = React.createElement('h2',null,'hello React!')
    //2. 将该元素渲染至页面
    ReactDOM.render(hello,document.querySelector("#app"))
    </script>
</body>
```

### 就是这么简单！
没有第四步了。你刚刚已经将第一个 React 组件添加到你的网站中。
