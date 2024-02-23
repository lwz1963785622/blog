
# console对象
`Console` 对象是 `windows`子对象，提供了对浏览器控制台的接入，可以在任何全局对象中访问，被浏览器定义为 `Window.console`，也可被简单的 `console` 调用。


## console对象方法

 属性 | 参数 | 返回值 | 功能 | 兼容性
---|---|---|---|---
log | msg | undefined | 向 Web 控制台输出一条消息 | 全部
dir | object | undefined | 打印出对象的所有属性和属性值 | >ie8
error | msg | undefined | 向 Web 控制台输出一条错误消息 | >ie7
warn | msg | undefined | 向 Web 控制台输出一条警告信息 | >ie7
time | timerName | undefined | 启动一个计时器（timer）来跟踪某一个操作的占用时长 | >ie10
timeEnd | timerName | undefined | 停止一个通过 `console.time()` 启动的计时器 | >ie10
table | tabledata, tablecolumns | undefined | 用于在控制台输出表格信息。 | >ie12

### console.log
`console.log()` 方法用于在控制台输出信息。

该方法对于开发过程进行测试很有帮助。

提示: 在测试该方法的过程中，控制台需要可见 (浏览器按下 F12 打开控制台)。

语法
```
console.log(message)
```
参数说明

参数 | 类型	| 描述
-----|-----|------
message	|String 或 Object|	必需，控制台上要显示的信息

### consoel.time
`consoel.time()`和`console.timeEnd()`这两个方法可以用来让WEB开发人员测量一个javascript脚本程序执行消耗的时间。

`console.time`方法是开始计算时间，`console.timeEnd`是停止计时，输出脚本执行的时间:
```js
// 启动计时器
console.time('testForEach');
// (测试用代码)
// 停止计时，输出时间
console.timeEnd('testForEach');

// testForEach 4522.303ms
```

参数说明

参数 | 类型	| 描述
-----|-----|------
label|	String	|可选，用于给计算器设置标签。
tablecolumns|	Array|	可选，一个数组，表格标题栏的名称。

这两个方法中都可以传入一个参数，作为计时器的名称，它的作用是在代码并行运行时分清楚各个计时器。所以**两个方法的参数必须相同**。

对`console.timeEnd`的调用会立即输出执行总共消耗的时间，单位是毫秒

for 循环测试
```js
var i;
console.time("for 循环测试");
for (i = 0; i < 100000; i++) {
  // 代码部分
}
console.timeEnd("for 循环测试");
```

测试ajax请求所需时间：
```js
console.time("ajax请求时间")
$.ajax({
  url:"https://zhihu-daily.leanapp.cn/api/v1/last-stories",
  success(res){
    console.timeEnd("ajax请求时间")
  }
})
//  ajax请求时间: 189.089111328125ms
```

### console.table
console.table() 方法用于在控制台输出表格信息。

第一个参数是必需的，且对象类型需要是对象或数组，对应的数据会填充到表格中。

提示: 在测试该方法的过程中，控制台需要可见 (浏览器按下 F12 打开控制台)。

语法
```
console.table(tabledata, tablecolumns)
```
参数说明

参数 | 类型	| 描述
-----|-----|------
tabledata	|Array 或 Object|	必需，填充到表格中的数据。
tablecolumns	|Array	|可选，一个数组，表格标题栏的名称。

```
console.table(["king", "lilei", "susan"]);
```
