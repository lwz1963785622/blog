# DOM 节点
>在 HTML DOM 中，所有事物都是节点。DOM 是被视为节点树的 HTML。

HTML 文档中的所有节点组成了一个文档树模型，HTML 文档中的每个元素、属性、文本等都代表着树中的一个节点。这些节点相互联系，相互影响，构成一个完整的页面，我们称之为模型。

<img src="/img/javascript/document-tree.png" style="max-width:500px"/>

## 节点的种类
1. 元素节点 (每个 HTML 元素是元素节点)       
2. 属性节点    (每个 HTML 属性是属性节点)
3. 文本节点   (文字、空格、换行)
4. 注释节点   (文档中的注释)
5. 文档节点   (整个文档是一个文档节点)

### 节点详细信息
通过节点属性我们能获得每个节点的详细信息(包括节点类型、节点名字、节点值)

|节点分类|节点类型(nodeType)|节点名称(nodeName)|节点内容(nodeValue)|
|----   |----   |----    |----   |
|元素节点| 1     |标签名    |null  |
|属性节点| 2     |属性名   | 属性值|
|文本节点| 3     | #text  |  文本  |
|注释节点| 8     |#comment |注释文本  |
|文档节点| 9     |  #document| null  |

## 节点的属性
通过节点的属性，能够获取到每个节点之间的关系，并且可以通过这种关系，准确快速的获取到相应节点的对象。

| 属性 | 描述    |
| :------------- | :------------- |
| node.parentNode    | 获取父节点 |
| node.childNodes    | 获取子节点|
| node.firstChild    | 第一个子节点|
| node.lastChild     | 最后一个子节点|
| node.nextSibling     | 下一个兄弟节点|
| node.previousSibling | 上一个兄弟节点|

> 上面的6个属性在使用的时候有些情况下我们输出的时候会显示undefined，因为在浏览器解析的时候会把换行和空格一起解析，获取的并没有错误，只是获取的这些节点是一个换行或者是一个空格。所以推荐使用下面的属性来获取，它们会只获取元素节点

| 属性 | 可读 |描述    |  示例 |
| :------------- | :------------- |:------------- |:------------- |:------------- |
| element.parentElement           | 只读 | 获取父元素    | `var parent = node.parentElement` |
| ParentNode.children             | 只读 | 获取所有子元素  | `var elements = node.children;` |
| ParentNode.childElementCount    | 只读 | 获取子元素数量 | `var count = node.childElementCount;` |
| ParentNode.firstElementChild    | 只读 | 第一个子元素 | `var element = node.firstElementChild;`  |
| ParentNode.lastElementChild     | 只读 | 最后一个子元素 | `var element = node.lastElementChild;`  |
| ParentNode.nextElementSibling   | 只读 | 下一个元素 |  `var element = node.nextElementSibling;`  |
| ParentNode.previousElementSibling  | 只读 | 上一个元素 | `var element = node.previousElementSibling;`  |


### 节点练习
编写函数：
* 获取一个元素的所有子元素节点         
* 获取第一个子元素节点         
* 获取最后一个子元素节点   




## 节点的方法

| 方法 | 描述     |
| :------------- | :------------- |
| document.createElement() | 创建一个元素节点 |
| document.createTextNode() | 创建一个文本节点 |
| parent.appendChild(子节点) | 插入一个子节点 |
| parent.insertBefore(要插入的节点, 插入到某个元素之前) | 插入到某个节点之前 |
| parent.removeChild(子节点)              | 删除子节点 |
| parent.replaceChild(新节点,被修改的节点)  | 替换节点 |
| node.cloneNode(boolean)                | 克隆节点 |

### 创建并插入节点流程
1. document.createElement("标签名")    (创建标签)
2. 添加属性： (给创建的标签添加属性，参考DOM属性和方法)
3. 添加内容： (给创建的标签添加内容，参考DOM属性和方法)
4. 添加样式： (给创建的标签添加样式，参考DOM属性和方法)
5. 父元素.appendChild(子节点)
> 被插入的节点，可以是新创建的，也可是页面中已经存在的  

6. 父元素.insertBefore(要插入的节点, 插入到某个元素之前)
1. 父元素.removeChild(子节点)      删除子节点
2. 父元素.replaceChild(新节点,被修改的节点)            替换节点
3. node.cloneNode(boolean)          克隆节点
```html
<div class="box">
  <span>克隆节点</span>
</div>
<script type="text/javascript">
  var box=document.querySelector(".box");
  // 参数为boolean，设置为true则意味着同时克隆该节点的所有子节点
  var newBox=div.cloneNode(true);
</script>
```
