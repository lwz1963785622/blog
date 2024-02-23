# React错误处理
在用户使用过程中，可能遇到各种异常情况，比如页面404，申请结果失败，请求的返回异常等等，这篇文档会按照报错形式的不同，分别介绍下相应的处理建议。
## 页面级报错
### 应用场景
- 路由直接引导到错误页面，比如你输入的网址没有匹配到任何页面，可以由路由引导到预设的 404 页面。
- 代码控制跳转到报错页面，比如根据请求返回的数据，将没有权限的用户引导到 403 页面。

### 实现
针对页面级的报错：
```jsx
class Exception extends React.Component{
    static defaultProps = {
        type:404
    }
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        //可自定义错误信息
        if(this.props.type >= 404 && this.props.type < 422){
            return <div>404,页面未找到</div>
        }else if(this.props.type == 403 ){
            return <div>403,没有访问权限</div>
        }else if(this.props.type <= 504 && this.props.type >= 500){
            return <div>500,服务器错误</div>
        }
    }
}


<Exception/>             //404错误
<Exception type="403"/>  //403错误
<Exception type="500"/>  //500错误
```

## 提示性报错

### 应用场景
- 表单项校验报错。
- 操作反馈。
- 网络请求错误。

### 实现
提示性错误一般情况下，我们需要定义 提示组件 给与响应提示即可。

#### Alert 警告提示
警告提示，展现需要关注的信息。非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。
```
class Alert  extends React.Component{}
```
#### Message 全局提示
可提供成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
```
class Message  extends React.Component{}
```
#### Notification 通知提醒框
全局展示通知提醒信息。在系统四个角显示通知提醒信息。经常用于以下情况：
- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

```
class Notification extends React.Component{}
```
