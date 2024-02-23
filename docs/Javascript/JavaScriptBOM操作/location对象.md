
## location 对象
>  location 对象是 windows子对象，其中包含当前窗口中加载的文档有关的信息。 location对象的用处不只表现在它保存着当前文档的信息，还表现在它将url解析为独立的片段，可以通过不同的属性访问这些片段:


### location 对象属性
>一个完整的url 包括9个部分 协议://用户名：密码@域名：端口/路径；参数？查询#片段 不过几乎没有哪个url包含这些所有组件，最重要的三部分是协议，域名和路径:


以该url为例：

```
http://www.baidu.com:80/javascript/?file=001/BOM/README.md/#location对象
```

属性|描述| 可读写性	 | 结果
---|---|---|---
href | 包含整个URL的一个字符串 | 读写 | `http://www.baidu.com:80/javascript/001/BOM/?file=README.md#locationå¯¹è±¡`
origin | 包含页面来源的域名的标准形式字符串	 | 只读 | `http://www.baidu.com:80`
protocol | 包含URL对应协议的字符串，最后有一个":"	| 只读 | `http:`
host |包含了域名和端口号的字符串，如没有端口号则只有域名	| 只读 | `www.baidu.com:80`
hostname |包含URL域名的字符串 | 只读 | `www.baidu.com`
port |包含端口号的字符串| 只读 | `80`
pathname |包含URL中路径部分的字符串，开头有一个"/" | 只读 | `/javascript/001/BOM/`
search | 包含URL参数（查询字符串）的字符串，开头有一个“?” | 只读 | `?file=README.md`
hash | 包含块标识符的字符串，开头有一个"#"	 | 只读 | `#locationå¯¹è±¡`


### location  对象方法

 属性 | 参数 | 返回值	 | 功能 | 兼容性
---|---|---|---|---
assign | url | undefined | 加载给定URL的内容资源 | 全部
reload | Boolean | undefined | 重新加载来自当前 URL的资源(刷新本页) | 全部
replace | url | undefined | 用给定的URL替换掉当前的资源	| 全部
toString | 无 | 包含整个URL的字符串	 | 获取本窗口的url(只能获取，无法修改，读取效果与location.href相同)	) | 全部

> `location.assign`与 `location.replace`区别: `replace()`替换的新页面不会被保存在会话的历史 History中，这意味着用户将不能用后退按钮转到该页面

`location.reload` 的参数：
* false或未写参数：检测服务器上的文档是否已改变。如果文档已改变，reload() 会再次下载该文档。如果文档未改变，则该方法将从缓存中装载文档。这与用户单击浏览器的刷新按钮的效果是完全一样的。
* true：那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 健的效果是完全一样。
