# React事件
> React通过将事件处理器绑定到组件上来处理事件。

## React事件处理
React通过将事件处理器绑定到组件上来处理事件。在事件被触发的同时，更新组件的内部状态。组件内部状态的更新会触发组件重绘。

React处理事件本质上和原生Javascript事件一样、所有的事件都进行了重新封装，事件在命名上与原生Javascript规范一致，并且会在相同的场景下触发。

## React合成事件
- React中实现的事件有如下作用：
    1. 事件委托    
    合成事件会以事件委托的方式绑定到组件最上层，并且在组件卸载的时候自动销毁绑定的事件。
    2. 原生事件    
    在 componentDidMount 方法里面通过 addEventListener 绑定的事件就是浏览器原生事件。使用原生事件的时候在 componentWillUnmount 解除绑定 removeEventListener 。
- 阻止事件流、阻止浏览器默认动作使用e.stopPropagation() 或 e.preventDefault()。

## React支持事件
### 鼠标事件
onClick onContextMenu onDoubleClick

onDrag onDragEnd onDragEnter onDragExitonDragLeave onDragOver onDragStart onDrop

onMouseEnter onMouseLeave

onMouseDown onMouseMove onMouseUp

onMouseOver onMouseOut

### 键盘事件
onKeyDown onKeyPress onKeyUp
### 表单事件
onChange onInput onSubmi
### 焦点事件
onFocus onBlur
### 触控事件
onTouchCancel onTouchEnd onTouchMove onTouchStart
### 剪贴板事件
onCopy onCut onPaste

## 事件中的this指向
在React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。而且React还对这种引用进行缓存，已达到CPU和内存的最优化。在使用ES6 class 或者纯函数时，这种自动绑定就不复存在了，我们需要手动实现this的绑定。
```js
class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }
    }
    increment(){
        //this == window  不是我们认为组件的实例
        this.setState({
            value:this.state.value+1
        })
    }
    render(){
        return (<div>
            <button onClick={this.increment}>+</button>
            <div className="text">{this.state.value}</div>
            <button onClick={this.decrement}>-</button>
        </div>)
    }
}
```
### bind方法
这个方法可以帮助我们绑定事件处理器内的this,并可以向事件处理器中传递参数，比如：

```js
class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }
    }
    increment(){
        this.setState({
            value:this.state.value+1
        })
    }
    decrement(){
        this.setState({
            value:this.state.value-1
        })
    }
    render(){
        return (<div>
            <button onClick={this.increment.bind(this)}>+</button>
            <div className="text">{this.state.value}</div>
            <button onClick={this.decrement.bind(this)}>-</button>
        </div>)
    }
}
```
</script>

### 构造函数内声明
在组件的构造函数内完成了this的绑定，这种绑定方式的好处在于仅需要进行一次绑定，而不需要每次调用事件监听函数时区执行绑定操作：

```js
class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    increment(){
        this.setState({
            value:this.state.value+1
        })
    }
    decrement(){
        this.setState({
            value:this.state.value-1
        })
    }
    render(){
        return (<div>
            <button onClick={this.increment}>+</button>
            <div className="text">{this.state.value}</div>
            <button onClick={this.decrement}>-</button>
        </div>)
    }
}
```
</script>

### 箭头函数
箭头函数不仅是函数的语法糖，它还自动绑定了定义此函数作用域的this,因此我们不需要再对它使用bind方法。

```js
class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }
    }
    increment=()=>{
        this.setState({
            value:this.state.value+1
        })
    }
    decrement=()=>{
        this.setState({
            value:this.state.value-1
        })
    }
    render(){
        return (<div>
            <button onClick={this.increment}>+</button>
            <div className="text">{this.state.value}</div>
            <button onClick={this.decrement}>-</button>
        </div>)
    }
}
```
</script>

## 在React中使用原生事件
React提供了很好的合成事件系统，但是这并不意味着在React架构下无法使用原生事件。React提供了完备的生命周期方法，其中componentDidMount会在组件已经完成安装并且在浏览器中存在真实的DOM后调用，此时我们就可以完成原生事件的绑定。

```js
class Button extends React.Component{
    componentDidMount(){
        this.refs.btn.addEventListener('click',this.handleClick);
    }
    componentWillUnmount(){
        this.refs.btn.removeEventListener('click',this.handleClick);
    }
    handleClick(){
        alert('点击了按钮！');
    }
    render(){
        return (<button ref="btn">Button</button>)
    }

}
```
</script>


## 对比React合成事件与Javascript原生事件
| 类型 | JavaScript原生事件 | React合成事件 |
|-----|-------------------|--------------|
|阻止事件传播| `e.preventDefault()` | `e.prevent-Default()` |
|事件类型| JavaScript原生事件 | React合成事件的事件类型是JavaScript原生事件类型子集。|
|事件绑定|1. 直接在DOM元素绑定`<button onclick="alert(1)">Test</button>` <br>  2. 直接复制绑定`elm.onclick=e=>{alert(1)}`<br> 3. 通过监听函数绑定`elm.addEventListener('click',fn)` |`<button onClick={this.handleClick}>Test</button>` |
|事件对象| 原生事件对象(存在兼容问题)  | 合成事件对象(不存在兼容) |

## 示例：事件对象
```js
class Color extends React.Component{
  	constructor(){
      super();
      this.state ={
        r : 144,
        g : 144,
        b : 144
      }
    }
  	handleChange(ev){
      console.log(ev.clientX)
      this.setState({
        r : Math.floor(ev.clientX/1.5),
        g : Math.floor(ev.clientY/1.5),
        b : Math.abs(ev.clientX-ev.clientY)
      })
    }
  	render(){
      return <div id="box" onMouseMove={this.handleChange.bind(this)} style={{backgroundColor:`rgb(${this.state.r},${this.state.g},${this.state.b})`}}>
        R{this.state.r},G{this.state.g},B{this.state.b}
      </div>
    }
}
ReactDOM.render(<Color/>,document.querySelector('#app'))
```
</script>
