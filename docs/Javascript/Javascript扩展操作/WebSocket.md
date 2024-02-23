# WebSocket
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。        

Websocket 其实是一个新协议，跟 HTTP 协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是 HTTP 协议上的一种补充。          



## 解决的问题
HTTP 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。

这种通信模型有一个弊端：HTTP 协议无法实现服务器主动向客户端发起消息。

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。大多数 Web 应用程序将通过频繁的异步JavaScript和XML（AJAX）请求实现长轮询。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。        

WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

## WebSocket 如何工作
Web浏览器和服务器都必须实现 WebSockets 协议来建立和维护连接。由于 WebSockets 连接长期存在，与典型的HTTP连接不同，对服务器有重要的影响。

基于多线程或多进程的服务器无法适用于 WebSockets，因为它旨在打开连接，尽可能快地处理请求，然后关闭连接。任何实际的 WebSockets 服务器端实现都需要一个异步服务器。

## WebSocket在客户端实现
在客户端，没有必要为 WebSockets 使用 JavaScript 库。实现 WebSockets 的 Web 浏览器将通过 WebSockets 对象公开所有必需的客户端功能（主要指支持 Html5 的浏览器）。         

### 客户端
创建 WebSocket 对象
```js
var Socket = new WebSocket(url, [protocol] );
```        
第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。
#### WebSocket 属性
| 属性 | 描述 |
| ---- | ---- |
| readyState | 只读属性 readyState 表示连接状态，可以是以下值：0 - 表示连接尚未建立。1 - 表示连接已建立，可以进行通信。2 - 表示连接正在进行关闭。3 - 表示连接已经关闭或者连接不能打开。  |
|  bufferedAmount  |  只读属性 bufferedAmount 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。 |

#### WebSocket 方法
| 方法名 | 描述 |
| ---- | ---- |
| send | 使用连接发送数据 |
|  close |  关闭连接  |

#### WebSocket 事件
| 事件名称 | 描述 |
|---- | ---- |
|  open  | 连接建立时触发  |  
| message  |  客户端接收服务端数据时触发 |
|  error | 通信发生错误时触发  |
|  close | 连接关闭时触发  |

```js
// 初始化一个 WebSocket 对象
var ws = new WebSocket("ws://localhost:9998/echo");

// 建立 web socket 连接成功触发事件
ws.onopen = function () {
  // 使用 send() 方法发送数据
  ws.send("发送数据");
  alert("数据发送中...");
};

// 接收服务端数据时触发事件
ws.onmessage = function (evt) {
  var received_msg = evt.data;
  alert("数据已接收...");
};

// 断开 web socket 连接成功触发事件
ws.onclose = function () {
  alert("连接已关闭...");
};
```

## WebSocket在服务器端实现
WebSocket服务端的实现不受平台和开发语言的限制，只需要遵从WebSocket规范即可                   

### Nodejs
1. 安装ws模块   ws是nodejs的一个WebSocket库，可以用来创建服务。                    
`npm install ws`
2. 在项目里面新建一个server.js，创建服务，指定8181端口，将收到的消息log出来。
```js
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
    console.log('index connected');
    ws.on('message', function (message) {
        console.log(message);
    });
});
```
3. 建立一个index.html在页面上建立一个WebSocket的连接。用send方法发送消息。
```js
var ws = new WebSocket("ws://localhost:8181");
    ws.onopen = function (e) {
        console.log('Connection to server opened');
    }
    function sendMessage() {
        ws.send($('#message').val());
    }
```


## 案例
实现一个即时通讯，多人聊天室
