
# ECMAScript 介绍
:tada: :100:

> JavaScript 是世界上最流行的脚本语言，因为你在电脑、手机、平板上浏览的所有的网页，以及无数基于 HTML5 的手机 App，交互逻辑都是由 JavaScript 驱动的。我们可以通过 JavaScript 提供的 API 可以实现一些交互效果开发，使用 Ajax 可以与后台进行数据的交互。在 Web 世界里，只有 JavaScript 能跨平台、跨浏览器驱动网页，与用户交互。

JavaScript 是一门跨平台、面向对象的动态的弱类型的轻量级解释型语言，是一种基于对象和事件驱动并具有相对安全性的客户端脚本语言。

虽然它是作为开发 Web 页面的脚本语言而出名的，但是它也被用到了很多非浏览器环境中，例如 node.js。

## 应用场景
::: warning
JavaScript 通常被称为 JS，他发明的目的，就是作为浏览器的内置脚本语言，为网页开发者提供操控浏览器的能力，他可以让网页呈现出各种特殊效果，为用户提供友好的互动体验。随着 Ajax 技术的出现，前端可以在不刷新页面的情况下和后端进行数据交换，更新页面数据，jQuery 等库的盛行让 JS 编写变得异常简单，Bootstrap 框架更让前端的成本无限降低，大大提高了前端开发的效率，JS 在前端领域前景非常广阔。

随着 Node 的发布，使得 JS 不仅可以运行在前端，还可以运行在服务器上。这对 JS 来说是一次质的突破，Node.js 项目使得 JS 可以用于开发服务器端的大型项目，网站的前后端都用 JS 开发已经称为了现实。

:::

## JavaScript 组成部分

::: tip
尽管 ECMAScript 是一个重要的标准，但它并不是 JavaScript 唯一的部分，当然，也不是唯一被标准化的部分。实际上，一个完整的 JavaScript 实现是由以下 3 个不同部分组成的：
:::


| 名称               | 介绍                                                                                          |
| :----------------- | :-------------------------------------------------------------------------------------------- |
| ECMAScript         | 是 Javascript 基础规范，定义了 Javascript 基础语法。                                          |
| BOM 浏览器对象模型 | 可以对浏览器窗口进行访问和操作。                                                              |
| DOM 文档对象模型   | 通过创建树来表示文档，从而使开发者对文档的内容和结构具有控制力。用 DOM API 可以轻松操作文档。 |

## ECMAScript 版本

从 ECMAScript2016 开始，ECMAScript 将进入每年发布一次新标准的阶段。

| ES1  | ES2  | ES3  | ES4  | ES5  | ES5.1 | ES2015(ES6) | ES2016 | ES2017 | ES2018 | ES2019 | ...  |
| :--: | :--: | :--: | :--: | :--: | :---: | :---------: | :----: | :----: | :----: | :----: | :--: |
| 1997 | 1998 | 1999 | 夭折 | 2009 | 2011  |    2015     |  2016  |  2017  |  2018  |  2019  | .... |



### ECMAScript 2015（ES6）浏览器支持情况

支持 ECMAScript 2015 规范。功能包括 Promises，Modules，Classes，Template Literals，Arrow Functions，Let and Const，Default Parameters，Generators，Destructuring Assignment，Rest＆Spread，Map / Set＆WeakMap / WeakSet 等等。


## JavaScript 在你的页面上做什么？

当你在浏览器中打开一个网页，该运行环境（浏览器标签）将会执行你的代码（HTML, CSS 和 JavaScript）。这就像是一个工厂，获取原材料（代码）然后出产一个产品（网页）。

<img src="/img/javascript//execution.png" style="width:60%;" />

在 HTML 和 CSS 已经被集合和组装成一个网页后，浏览器的 JavaScript 引擎再执行 JavaScript。这保证了当 JavaScript 开始运行时，网页的结构和样式已经在该出现的地方了。

> 注意：如果 JavaScript 在 HTML 和 CSS 加载完成之前加载运行，那么会发生错误。

## 浏览器安全

每个浏览器标签本身就是一个用来运行代码的分离的容器（这些容器用专业术语称为“运行环境”）——这意味着在大多数情况中，每个标签中的代码是完全分离地运行，而且在一个标签中的代码不能直接影响在另一个标签中的代码——或者在另一个网站中的。这是一个好的安全措施

## JavaScript 特点

1. 弱类型<br>
   JavaScript 是弱类型语言。但所谓弱类型语言，只表明该语言在表达式运算中不强制效验运算元的数据类型。
2. 解释型(解释型或即时编译型)
3. 基于对象<br>
   js 种所有数据根源上都是对象
4. 事件驱动
5. 单线程/异步(callback)

### 解释代码 vs 编译代码

在编程环境中，你或许听说过这两个术语 解释 [interpreted] 和 编译 [compiled]。JavaScript 是一个解释语言——代码从上到下运行，而运行的结果会马上被返回。在浏览器运行代码前，你不必先把它转化为其他形式。

另一方面来说，编译语言则需要在运行前转化为另一种形式。比如说 C/C++ 则要先被编译成汇编语言，然后再由电脑运行。

解释型语言的程序不需要在运行前编译，在运行程序的时候才翻译。省去编译过程，但是每执行一次就要翻译一次，效率比较低

### 异步编程

JavaScript 由于某种原因是被设计为单线程的，同时由于 JavaScript 在设计之初是用于浏览器的 GUI 编程，这也就需要线程不能进行阻塞。

所以在后续的发展过程中基本都采用异步非阻塞的编程模式。

简单来说，异步编程就是在执行一个指令之后不是马上得到结果，而是继续执行后面的指令，等到特定的事件触发后，才得到结果。

也正是因为这样，我们常常会说: **JavaScript 是由事件驱动的** 。

## 怎样向你的页面添加 JavaScript？

JavaScript 以一种近似于 CSS 的方式应用到你的 HTML 页面中。尽管 CSS 使用 `<link>` 元素去应用外部的样式表 [stylesheet] 和 `<style>` 元素去应用内部的样式表到 HTML，JavaScript 只需要在 HTML 世界里的一个元素—— `<script>` 元素。

### 嵌入 HTML 的 JavaScript

```html
<script>
  // JavaScript goes here
</script>
```

### 外部引入的 JavaScript

外部的 JavaScript 命名为 script.js ——保证它以 .js 为文件扩展名，因为这是它被认作是 JavaScript 的方式。

```html
<script src="script.js"></script>
```
### script 元素
| 参数               | 描述                   | 示例                              |
| :----------------- | :--------------------- | :-------------------------------- |
| `async`     | 可选   |表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。     |
| `charset`   | 可选   |使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值 |
| `crossorigin` | 可选 |  配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。 |
| `defer`    | 可选 |  可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。 |
| `integrity`| 可选 |  允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。 |
| `language`  | 废弃 | 最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略这个属性，不应该再使用它。 |
| `src`    | 可选 | 表示包含要执行的代码的外部文件。 |
| `type`   | 可选 | `代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）`<br> `按照惯例，这个值始终都是"text/javascript"，尽管"text javascript"和"text/ecmascript"都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给type 属性这个值有可能导脚本被忽略。在非 IE 的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。` |

## 注释

> 可以添加注释来对 JavaScript 进行解释，提高代码的可读性，还可以用于停靠代码。

一个单行注释书写在一个双正斜杠后 (`//`)，比如：

```js
// I am a comment
```

一个多行注释书写在字符串`/*`和 `*/` 之间， 比如：

```js
/*
  I am also
  a comment
*/
```

## 输入输出工具

| 方法               | 描述                   | 示例                              |
| :----------------- | :--------------------- | :-------------------------------- |
| `document.write()` | 输出内容到 body 页面   | `documetn.write("hello, world")`  |
| `prompt()`         | 输入框                 | `prompt("请输入信息")`            |
| `alert()`          | 弹出框                 | `alert("用户名错误")`             |
| `console.log()`    | 输出内容到浏览器控制台 | `console.log("js是一门编程语言")` |

## 名词解释

### 标识符

标识符可以分为两类：

- 用于命名语法(以及类型)，被称为"语法关键字"
- 用于命名值(的存储位置)，被称为"变量"和"常量"

由此引入了一个概念：绑定。
从标识符的角度来说，就分为：

- 语法关键字与语法(语义)逻辑的绑定，语法关键字与语法(语义)逻辑绑定的结果是作用域的限定；
- 变量与它所存储值得位置的绑定，变量对位置的绑定的结果，则是变量生存周期的限定；

### 声明

程序语言中"声明"的意义：所谓声明，即是约定变量的生存周期和逻辑的作用域。

- 纯粹陈述"值"的过程，被称为变量和类型声明；
- 纯粹陈述"逻辑"的过程，被称为语句(含流程控制子句)；
- 陈述"值与(算法的)逻辑"的关系的过程，被称为表达式；

### 错误类型

一般来说，当你的代码出错的时候，你会遇到两种主要的错误类型：

#### 语法错误

这是你的代码的拼写错误，实际上导致程序不能运行在所有或停止通过工作的一部分，这样你通常会用一些提供的错误消息找到修复的方法，只要你熟悉正确的工具，知道错误消息的意思！

一般来说，JavaScript 引擎会在代码装入时先进行语法分析，如果语法分析通不过，整个脚本代码块都不会执行；(如一个人在演讲时，先检查演讲稿语句是否通顺，不通顺则不讲)

当语法分析通过时，才会执行这段脚本代码。若在执行过程中出错，那么在同一代码上下文中、出错点之后的代码将不再执行。

#### 逻辑错误

这些错误，其中语法实际上是正确的，但代码是不是你想要的，这意味着项目成功运行，但会产生不正确的结果。这些通常比语法错误更难以修复，因为通常没有错误指向错误源。

### 语句结尾分号

js 语句的一个分号代表了一段代码的结束，但问题是 javascript 允许不写分号，这样就出现了一个问题，代码的结束与否不是你来决定的而是由程序来决定的，而程序也不是万能的，往往它只是走的某个规则，而如果你写的这段代码和它的规则不符，最终的结果就有些不如人意了。

```js
var n1 = 10,
  n2 = 100(n1 + n2) * 10; // 报错： 100 is not a function
```

会导致上下行解析出问题的符号有 5 个：`()`，`[]`，`\`，`+`，`-`。

总结：**一行开头是`括号`或者`方括号`的时候上一行必须分号结束，其他时候都可以不需要。**

## 参考

- <a target="_blank" rel="noopener noreferrer" href='http://www.cnblogs.com/niulina/p/5715430.html'>参考1</a>
- <a href='https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E9%87%8F(String_literals)'>参考2</a>

## 注意事项
### script 元素使用 
> 包含在`<script>`内的代码会被从上到下解释。在上面的例子中，被解释的是一个函数定义，并且
该函数会被保存在解释器环境中。在`<script>`元素中的代码被计算完成之前，页面的其余内容不会被
加载，也不会被显示。

在使用行内 JavaScript 代码时，要注意代码中不能出现字符串</script>。比如，下面的代码会导致浏览器报错：
``` js
<script> 
 function sayScript() { 
 console.log("</script>"); 
 } 
</script>
```
浏览器解析行内脚本的方式决定了它在看到字符串</script>时，会将其当成结束的</script>
标签。想避免这个问题，只需要转义字符“\”①即可：
``` js
<script> 
 function sayScript() { 
 console.log("<\/script>"); 
 } 
</script>
// 这样修改之后，代码就可以被浏览器完全解释，不会导致任何错误。
```
::: tip
按照惯例，外部 JavaScript 文件的扩展名是.js。这不是必需的，因为浏览器不会检
查所包含 JavaScript 文件的扩展名。这就为使用服务器端脚本语言动态生成 JavaScript 代
码，或者在浏览器中将 JavaScript扩展语言（如TypeScript，或React的 JSX）转译为JavaScript
提供了可能性。不过要注意，服务器经常会根据文件扩展来确定响应的正确 MIME 类型。
如果不打算使用.js 扩展名，一定要确保服务器能返回正确的 MIME 类型。
:::

使用了 src 属性的`<script>`元素不应该再在`<script>`和`</script>`标签中再包含其他
JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码.
``` js
<script src="example.js">
// 以下不执行
console.log(1)
</script>
```
`<script>`元素的一个最为强大、同时也备受争议的特性是，它可以包含来自外部域的 JavaScript
文件。跟`<img>`元素很像，`<script>`元素的 src 属性可以是一个完整的 URL，而且这个 URL 指向的
资源可以跟包含它的 HTML 页面不在同一个域中，比如这个例子：

`<script src="http://www.somewhere.com/afile.js"></script> `

浏览器在解析这个资源时，会向 src 属性指定的路径发送一个 GET 请求，以取得相应资源，假定
是一个 JavaScript 文件。这个初始的请求不受浏览器同源策略限制，但返回并被执行的 JavaScript 则受限
制。当然，这个请求仍然受父页面 HTTP/HTTPS 协议的限制。

来自外部域的代码会被当成加载它的页面的一部分来加载和解释。这个能力可以让我们通过不同的
域分发 JavaScript。

不过，引用了放在别人服务器上的 JavaScript 文件时要格外小心，因为恶意的程序员
随时可能替换这个文件。在包含外部域的 JavaScript 文件时，要确保该域是自己所有的，或者该域是一
个可信的来源。

`<script>`标签的 integrity 属性是防范这种问题的一个武器，但这个属性也不是所有
浏览器都支持。

不管包含的是什么代码，浏览器都会按照`<script>`在页面中出现的顺序依次解释它们，前提是它
们没有使用 defer 和 async 属性。第二个`<script>`元素的代码必须在第一个`<script>`元素的代码解
释完毕才能开始解释，第三个则必须等第二个解释完，以此类推。`

### 标签位置
> 过去，所有`<script>`元素都被放在页面的`<head>`标签内，如下面的例子所示：
``` html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script src="example1.js"></script> 
 <script src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 </body> 
</html>
```
::: tip
这种做法的主要目的是把外部的 CSS 和 JavaScript 文件都集中放到一起。不过，把所有 JavaScript
文件都放在`<head>`里，也就意味着必须把所有 JavaScript 代码都下载、解析和解释完成后，才能开始渲
染页面（页面在浏览器解析到`<body>`的起始标签时开始渲染）。

对于需要很多 JavaScript 的页面，这会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白。为解决这个问题，现代 Web 应用程序通常
将所有 JavaScript 引用放在`<body>`元素中的页面内容后面，如下面的例子所示：
:::
``` html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 <script src="example1.js"></script> 
 <script src="example2.js"></script> 
 </body> 
</html>
<!-- 这样一来，页面会在处理 JavaScript 代码之前完全渲染页面。用户会感觉页面加载更快了，因为浏
览器显示空白页面的时间短了。 -->
``` 
### 推迟执行脚本
> HTML 4.01 为`<script>`元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改
变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在`<script>`元素上
设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。
``` html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script defer src="example1.js"></script> 
 <script defer src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 </body> 
</html> 
```
虽然这个例子中的`<script>`元素包含在页面的`<head>`中，但它们会在浏览器解析到结束的
`</html>`标签后才会执行。

对 defer 属性的支持是从 IE4、Firefox 3.5、Safari 5 和 Chrome 7 开始的。其他所有浏览器则会忽略这
个属性，按照通常的做法来处理脚本。考虑到这一点，还是把要推迟执行的脚本放在页面底部比较好。

### 异步执行脚本
> HTML5 为`<script>`元素定义了 async 属性。从改变脚本处理方式上看，async 属性与 defer 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行，比如：
``` html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script async src="example1.js"></script> 
 <script async src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 </body> 
</html>
<!-- 在这个例子中，第二个脚本可能先于第一个脚本执行。因此，重点在于它们之间没有依赖关系。给
脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到
该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。 -->
```

### 动态加载脚本

除了`<script>`标签，还有其他方式可以加载脚本。因为 JavaScript 可以使用 DOM API，所以通过
向 DOM 中动态添加 script 元素同样可以加载指定的脚本。只要创建一个 script 元素并将其添加到
DOM 即可。
``` js
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
document.head.appendChild(script);
```
当然，在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。默认情况下，
以这种方式创建的`<script>`元素是以异步方式加载的，相当于添加了 async 属性。不过这样做可能会
有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。因此，
如果要统一动态脚本的加载行为，可以明确将其设置为同步加载：
``` js
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
script.async = false; 
document.head.appendChild(script);
```
以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先
级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些
动态请求文件的存在，可以在文档头部显式声明它们：
`<link rel="preload" href="gibberish.js">`
### `<noscript>`元素
> 针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案。最终，`<noscript>`
元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容。虽然如今的浏览器已经 100%支持
JavaScript，但对于禁用 JavaScript 的浏览器来说，这个元素仍然有它的用处。
`<noscript>`元素可以包含任何可以出现在`<body>`中的 HTML 元素，`<script>`除外。在下列两种
情况下，浏览器将显示包含在`<noscript>`中的内容：
- 浏览器不支持脚本；
- 浏览器对脚本的支持被关闭。
任何一个条件被满足，包含在`<noscript>`中的内容就会被渲染。否则，浏览器不会渲染`<noscript>`
中的内容。
``` html
下面是一个例子：
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script defer="defer" src="example1.js"></script> 
 <script defer="defer" src="example2.js"></script> 
 </head> 
 <body> 
 <noscript> 
 <p>This page requires a JavaScript-enabled browser.</p> 
 </noscript> 
 </body> 
</html> 
这个例子是在脚本不可用时让浏览器显示一段话。如果浏览器支持脚本，则用户永远不会看到它。
```