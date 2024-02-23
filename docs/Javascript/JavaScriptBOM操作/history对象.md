
## history 对象
>  `history` 对象是 `windows`子对象。`history` 接口允许操作浏览器的曾经在标签页或者框架里访问的历史记录,这些方法和事件能够帮助我们优雅的实现单页面应用，同时又不会影响搜索引擎对我们网站的搜录。现在所有的现代浏览器都已经支持这些新的特性，并且涌现出大量的路由框架，都内置集成了这些新的特性。比方说著名的`vue`框架里面的 `vue-route`等路由框架。

### history 对象属性
属性|描述| 可读写性 | 兼容性
---|---|---|---
length | 包含当前页面在内的历史记录个数 | 只读 | 全部

### history 对象方法

 属性 | 参数 | 返回值 | 功能 | 兼容性
---|---|---|---|---
back | 无 | undefined | 加载 history 列表中的前一个 URL(等价于history.go(-1)) | 全部
forward | 无 | undefined | 加载 history 列表中的下一个 URL(等价于history.go(1)) | 全部
go | number | undefined | 通过当前页面的相对位置从浏览器历史记录加载页面 | 全部
pushState | state, title, url | undefined | 无刷新的向浏览器 历史最前方 加入一条记录  | >ie9
replaceState | state, title, url | undefined | 无刷新的使用一条记录替换当前的历史记录  | >ie9

* history.go方法
    * history.go(-1)： 加载上一个历史记录
    * history.go(1)： 加载下一个历史记录
    * history.go(0) 或不传参： 刷新本页
    类似地，你可以传递参数值2并向前移动2个页面，等等。    
    如果已经没有页面，该方法不会报错，页面不会发生任何变化； 如果参数不是整数，页面也不会发生任何变化。

* `history.pushState` 和 `history.replaceState`  方法有3个参数
     * **状态对象state** —— 需要保存的数据，这个数据在触发`popstate`事件时保存在`event.state`上
     * **标题title** —— 浏览器目前不识别该参数，传入一个空字符串
     * **地址URL** —— 需要更改的url地址

> `window.onpopstate`事件： 浏览器点击前进后退(或者在js中调用`history.back()`、`history.forward()`、`history.go()`方法)时触发的事件。`event.state`可以获取当前`url`下设置的`state`。

*注：`pushState` 和 `replaceState`方法只能加载同源下的资url源（存在跨域问题）*

```js
window.onpopstate = function (event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数.
history.pushState({ page: 1 }, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({ page: 2 }, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({ page: 3 }, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 输出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 输出 "location: http://example.com/example.html, state: null
history.go(2);  // 输出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

### 总结
* js刷新本页面方法汇总：
    1. history.go(0)
    2. location.reload()
* js跳转页面方法汇总：
    1. window.open(url)
    2. location.href = ""
    3. location.assign(url)
