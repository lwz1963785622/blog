# Fetch

> 在开发过程中, 我们向服务端发送请求, 一般会使用三种方式, `XMLHttpRequest(XHR)` 、 `Fetch` 、 `jQuery实现的AJAX` 。

1. `XMLHttpRequest` 不符合关注分离, 配置和调用方式比较混乱，还需要兼容于多层回调
2. `jQuery实现的AJAX` 兼容性和易用性方面都做了很大的提高，并支持jsonp，但仍存在回调地狱
3. `fetch` 是现代浏览器新增的的一种发送请求方式，用以替代ajax

Fetch API是基于Promise设计，部分老浏览器不支持fetch，旧浏览器不支持 Promise，需要使用如下兼容可兼容到ie8:

1. 引入 es6 的 polyfill: `babel-polyfill`
2. 引入 promise 的 polyfill: `es6-promise` (参考Promise章节)
3. 引入 fetch 探测库： `fetch-detector`
4. 引入 fetch 的 polyfill: `fetch-ie8`
5. 可选：如果你还使用了 jsonp，引入 `fetch-jsonp`

### npm 命令行安装：

``` shell
npm install babel-polyfill es6-promise fetch-detector fetch-ie8 --save
```

js导入：

``` js
import 'babel-polyfill';
require('es6-promise').polyfill();
import 'fetch-detector';
import 'fetch-ie8';
```

**注意**： fetch-detector 一定要在 fetch-ie8 之前引入

### ie重新封装fetch

## 使用方式

fetch() 接收两个参数 —— 请求资源的路径和配置信息。无论请求成功与否，它都返回一个 `promise` 对象

``` js
fetch(url, options)
    .then(res => {
        // handle HTTP response
    }, error => {
        // handle network error
    })
```

### 参数说明：

1. `url` ：请求资源的路径 (必填)
2. `options` ： 请求配置信息

| 配置项 | 数据类型 | 功能说明 |
| --- | --- | --- |
| method | String | HTTP请求方法，默认为 `GET` |
| body | String | HTTP的请求参数 |
| headers  | Object  | HTTP的请求头，默认为{} |
| credentials | String  | 默认为 `omit` , 忽略的意思，也就是不带cookie; 还有两个参数， `same-origin` ，意思就是同源请求带cookie； `include` , 表示无论跨域还是同源请求都会带cookie |

### 返回值：

第一个 `then` 函数里面处理的是 `response` 的格式，这里的 `response` 具体如下：    

![fetch返回值](/img/javascript/02-1544519237000.png)

1. status(number): HTTP返回的状态码，范围在100-599之间
2. statusText(String): 服务器返回的状态文字描述，例如 `OK`
3. ok(Boolean): 如果状态码是以2开头的，则为true
4. headers:  HTTP请求返回头
5. body:  返回体，这里有处理返回体的一些方法

#### 返回体的处理 (获取返回的数据)

* text(): 将返回体处理成字符串类型
* json()： 返回结果和 JSON.parse(responseText)一样
* blob()： 返回一个Blob，Blob对象是一个不可更改的类文件的二进制数据
* arrayBuffer()
* formData()

> 返回体处理的返回值均为Promise对象，所以后面可继续使用 `then()` 或 `catch()` 进行调用

``` js
// 以处理json数据为例：
fetch(url, options)
    .then(res => {
            return res.json()
        }
        .then(data => {
            console.log(data)
        })
```

### 设置请求头信息

> 在POST提交的过程中，一般是表单提交，可是，经过查询，发现默认的提交方式是： `Content-Type:text/plain;charset=UTF-8` ，这个显然是不合理的。

``` js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255', { // 在URL中写上传递的参数
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 指定提交方式为表单提交
            'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
        },
    })
    .then((res) => {
        return res.json() // 返回一个Promise，可以解析成JSON
    })
    .then((res) => {
        console.log(res) // 获取JSON数据
    })
```

### 携带cookie

> 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头)

``` js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
        method: 'GET',
        credentials: 'include' // 强制加入凭据头
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log(res)
    })
```

### 错误处理

> fetch在服务器返回 `4xx` 、 `5xx` 时是不会抛出错误的，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。这里需要手动通过，通过 `response` 中的ok字段和 `status` 字段来判断

``` js
fetch('url')
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            // 抛出异常
            throw new Error('something went wrong!')

            // 或者rejectPromise来调用catch
            return Promise.reject({
                status: res.status,
                statusText: res.statusText
            })
        }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

### 文件上传：

``` js
const input = document.querySelector('input[type=file]');

// This will upload the file after having read it
const upload = (file) => {
    fetch('http://www.example.net', { // Your POST endpoint
        method: 'POST',
        headers: {
            "Content-Type": "You will perhaps need to define a content-type here"
        },
        body: file // This is your file object
    }).then(
        response => response.json() // if the response is a JSON object
    ).then(
        success => console.log(success) // Handle the success response object
    ).catch(
        error => console.log(error) // Handle the error response object
    );
};

// Event handler executed when a file is selected
const onSelectFile = () => upload(input.files[0]);

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);
```

### fetch 封装

> 参考资料： [使用Fetch](https://www.cnblogs.com/libin-1/p/6853677.html)
> 参考资料： [fetch，终于认识你](https://segmentfault.com/a/1190000011433064)
