# BOM
> BOM(Browser Object Model) 浏览器对象模型

> ECMAScript提供核心语言功能，例如变量分支循环等功能
> 而BOM提供与浏览器交互的方法和接口，使用BOM可以访问和操作浏览器窗口，可以控制浏览器显示的页面以外的部分

BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性，由于BOM主要用于管理窗口与窗口之间的通讯，因此其核心对象是window；


## window对象

### window对象属性

 属性| 描述| 可读写性 | 兼容性
---|---|---|---
innerWidth | 浏览器窗口宽度 | 只读 | >ie8
innerHeight | 浏览器窗口高度 | 只读 | >ie8
screen.width | 屏幕宽度(分辨率) | 只读 | 全部
screen.height | 屏幕高度(分辨率) | 只读 | 全部
top | 返回窗口体系中的最顶层窗口的引用 | 只读 | 全部

> `window.top` :返回最顶层的窗口对象，当在处理子框架时(iframes)，而想获取顶层框架时，这时可使用`window.top`


> 兼容获取滚动条距离

```js
var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;

var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
```



### window对象方法

  属性 | 参数 | 返回值 | 功能 | 兼容性
---|---|---|---|---
alert | string | undefined | 弹出带有一段消息和一个确认按钮的警告框 | 全部
confirm | string | boolean | 弹出带有一段消息以及确认按钮和取消按钮的对话框 | 全部
prompt | string | undefined | 弹出可提示用户输入的对话框 | 全部
open | url | 新窗口的window对象引用 | 通过脚本打开新的窗口 |全部
close | 无 | undefined | 关闭当前浏览器窗口 |全部
scrollBy | xpos,ypos | undefined | 在窗口中按指定的偏移量滚动文档 | 全部
scrollTo | xpos,ypos | undefined | 在窗口中将文档滚动到指定位置 | 全部

使用 `window.close()` 方法关闭使用 `window.open()` 打开的窗口
```js
//全局变量,存储将要打开的窗口的对象引用.
var openedWindow;

function openWindow()
{
  openedWindow = window.open('https://www.baidu.com');
}
function closeOpenedWindow()
{
  openedWindow.close();
}
```

  属性 | 参数 | 返回值 | 功能 | 兼容性
---|---|---|---|---
setInterval | `callback,time(ms)[,param]` | 该时间函数的id值，可用于取消执行 | 按照指定时间间隔执行回调函数 | 全部(IE9及一下版本不支持该第三个参数)
clearInterval | name | undefined | 清除指定时间函数进程 | 全部
setTimeout | `callback,time(ms)[,param]` | 该时间函数的id值，可用于取消执行 | 在指定的时间后执行回调函数 | 全部
clearTimeout | name | undefined | 清除指定的延时函数进程 | 全部

`setInterval` 与 `clearTimeout`参数分别是
1. callback： 必填。 函数，代表指定时间后执行该段代码
2. time： 必填。 时间间隔，以毫秒计，不写单位
3. param： 可选。传给执行函数的其他参数，多个参数以`,`隔开(IE9 及其更早版本不支持该参数)

callback回调函数可直接写到 `setInterval` 和 `setTimeout` 参数中，也可只写一个函数名:
```js
setInterval(run,1000)
function run(){
    console.log(1)
}

// 上下相同

setInterval(function run(){
    console.log(1)
},1000)
```

案例： 输出1-10，每秒输出一次
```js
var i = 1;
var t = setInterval(function(){
    console.log(i)
    i++
    if(i>10){
        clearInterval(t)
    }
},1000)

```

### 特殊
* ES5中，顶层对象的属性与全局变量是等价的（相当于声明全局变量、全局函数其实就是将该变量、该函数赋值给了window）。
    ```js
    window.a = 1;
    console.log(a) // 1
    a = 2;
    console.log(window.a) // 2
    ```
    上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

* ES6中，全局变量将逐步与顶层对象的属性脱钩。
    ```js
    var a = 1;
    console.log(window.a) // 1
    let b = 1;
    console.log(window.b) // undefined
    ```
    上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
