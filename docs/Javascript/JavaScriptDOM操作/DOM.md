# DOM 文档对象模型
>DOM 是 Document Object Model（文档对象模型）的缩写。
>是用来呈现以及与任意 HTML 或 XML 交互的API文档。DOM 是载入到浏览器中的文档模型，它用节点树的形式来表现文档，每个节点代表文档的构成部分


## DOM属性和方法

### 属性
| 属性 | 描述 | 读写 |
| ---- | ---- | ---- |
| URL | 网站的url| 只读 |
| charset | 查看字符集| 只读 |
| title | 文档的标题 | 读写 |
| forms | 文档中所有的form表单元素  | 只读 |
| imgages | 文档中所有的img元素 |只读 |
| body | 获取body标签 |只读 |
| head | 获取head标签 |只读 |
| documentElement | 获取html标签 |只读 |
| cookie | 当前页面Cookie值的情况，它的值是一个字符串。 |读写 |


### 方法
| 方法  | 描述     | 返回值  | 兼容性 |
| :------------- | :------------- |:------------- |:------------- |
| document.write("string")       | 动态向页面写入内容      | undefined | >=IE6,Chrome,Firefox |
| document.getElementsByTagName("tagName") | 通过标签名获取DOM元素  |   类数组 | >=IE6,Chrome,Firefox |
| document.getElementsByClassName("class") | 通过类名获取DOM元素 |   类数组 | >=IE8,Chrome,Firefox |
| document.getElementById("id")       |  通过id获取DOM元素 |   DOM对象 |  >=IE6,Chrome,Firefox |
| document.getElementsByName("name")    | 通过name属性获取DOM元素 | 类数组 | >=IE6,Chrome,Firefox |
| document.querySelector("css选择器") | 通过css选择器获取DOM元素 |  DOM对象 | >=IE8,Chrome,Firefox |
| document.querySelectorAll("css选择器")     | 通过name属性获取DOM元素 | 类数组 | >=IE8,Chrome,Firefox |
### 获取元素
通过标签名获取元素，返回值为 **类数组**      
```js
document.getElementsByTagName()
```

通过类名获取元素，返回值为**类数组**，IE6-8不支持
```js
document.getElementsByClassName()
```

通过id获取元素 返回值为**DOM对象**，只能获取第一个拥有该id的元素
在IE6、7中会把表单元素的name当做ID值获取到。
```js
document.getElementById()        
```

通过name属性获取元素，返回值为**类数组**  
在IE浏览器中只能获取到表单元素，一般也只用它获取表单元素，从ie10开始可以不只是表单元素。
```js
document.getElementsByName()              
```

通过css选择器获取元素，不兼容IE7以及以下版本
1. 获取单个元素，返回值为**DOM对象**
```js
document.querySelector("css选择器")
```
2. 获取多个元素，返回值为**类数组**
```js
document.querySelectorAll("css选择器")
```

>注意：获取元素的时候，document可以写成其他的DOM对象，这样表示从这个DOM对象内部来进行再次筛选。




## 操作内容
| 属性 | 描述    |
| :------------- | :------------- |
| 对象.innerHTML      | 可访问，可修改，可以识别标签，用来给元素内添加子标签很方便      |
| 对象.innerText     | 可访问，可修改，输出纯文本，无法识别标签 |
| 对象.textContent   | 可访问，可修改，输出纯文本，保留文本格式 |

### 对象.innerHTML

> 可访问，可修改
> 可以识别标签，用来给元素内添加子标签很方便

```js
对象.innerHTML = "内容"
```

### 对象.innerText

> 可访问，可修改
> 输出纯文本，无法识别标签

```js
对象.innerText = "内容"
```

### 对象.textContent

> 可访问，可修改
> 输出纯文本，保留文本格式

```js
对象.textContent = "内容"
```

## 操作样式
### 修改类名、id
className 访问、修改DOM对象的类名
```
对象.className = "类名"
```

classList 操作DOM对象类名

| 方法 | 描述     |
| :------------- | :------------- |
| lassList.add(类名1,类名2)    | 不修改原类名，添加新类名，可同时添加多个|
| classList.remove(类名1,类名2) |  删除某一类名|
| classList.contains(类名)      | 判断一个类名是否存在|
| classList.toggle(类名1,类名2)    |  如果类名已存在，则删除；如果类名没有，则添加|
> 注意： IE11及以下都不支持add、remove、toggle的多个参数

```js
对象.classList.add("类名")
对象.classList.remove("类名")
```
> 注意： IE9及以下不支持



### 修改行内样式
当样式名作为对象的属性名时，样式名需要使用**驼峰命名法**，因为对象的属性名不能包含`-` 例如：`fontSize`

```js
对象.style.样式属性 = "样式值"       // 不会覆盖原样式

// 所有行内样式组成的字符串
// 等价于重写行内样式 (不需要驼峰命名法)
// 原本行内样式会被覆盖
对象.style.cssText = ""      

// 原本行内样式 不会 覆盖
对象.style.cssText += ""      
```

获取行内样式及外部引入样式
```
window.getComputedStyle(对象).样式属性
```

## 操作属性
### 原生属性
> html标签自带的属性

```js
对象.属性名 = "属性值"
对象.className = "类名"
```

例如：
```js
div.id = "box"
input.name = "age"
```

### 自定义属性

| 方法 | 描述     |
| :------------- | :------------- |
| 对象.setAttribute(属性名,属性值)       | 设置属性       |
| 对象.getAttribute(属性名) | 获取属性 |
| 对象.removeAttribute(属性名) | 删除属性 |
| 对象.hasAttribute(属性名)  | 检测属性  |

```js
对象.setAttribute(属性名,属性值)
对象.getAttribute(属性名)
对象.hasAttribute(属性名)
对象.removeAttribute(属性名)
```

>往HTML标签上添加自定义属性来存储和操作数据,例如我们把图片的地址存放到自定义属性上，需要加载时再把属性值赋给img的src属性，等等操作
