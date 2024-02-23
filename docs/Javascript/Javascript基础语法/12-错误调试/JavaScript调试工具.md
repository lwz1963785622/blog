# JavaScript 调试工具
> 在编写 JavaScript 时，如果没有调试工具将是一件很痛苦的事情。

在程序代码中寻找错误叫做代码调试。

调试很难，但幸运的是，很多浏览器都内置了调试工具。



### debugger 关键字
`debugger` 关键字用于停止执行 JavaScript，并调用调试函数。

这个关键字与在调试工具中设置断点的效果是一样的。



开启 debugger ，代码在第三行前停止执行。
```
var title = "hello world!";
debugger;
document.querySelector("#box").innerHTML = title;
```
> 注意：如果没有调试可用，`debugger` 语句将无法工作。
