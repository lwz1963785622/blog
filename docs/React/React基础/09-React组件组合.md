# React组件组合
> 组合本质上是对组件的一种组织、管理方式，实现代码的封装.

在传统HTML当中，html元素是构成页面的基本单元。但在React中，在React中构建页面的基本单元是React组件。整个React应用都是用组件组合来构建的。

本质上，一个组件就是一个Javascript函数，它接受属性(props)和状态（state）作为参数，并输出渲染好的HTML。组件一般被用来呈现和表达应用的某部分数据，因此你可以把React组件理解为HTML元素的扩展。

React推崇通过组合的方式来组织大规模的应用。

## 组件嵌套
在父组件中嵌套子组件和引用HTML标签一样：
```js
	<子组件名> ... </子组件名> //双标签
	<子组件名 /> //单标签
```
所谓父子组件，就和DOM中的父子元素一样，他们是有从属关系

注意：render中return的HTML标签都必须有个最外层的标签包裹。
```js
function Test (Props){
	return (<div> 代码….. <div>);          # 正确
	return (<div>1</div><div>2</div>);     # 错误
}
```
### 组件嵌套写法
#### 正确写法
```js
class Children extends React.Component{
	render(){
		return ( //有最外层的标签包裹
            <div>i am from Children</div>
            )
	}
}
class Parent extends React.Component{
	render(){
		return ( //子组件必须包裹在一个HTML标签内
            <div>
                <Children fromParent={} />
            </div>
            )
	}
}
```
#### 错误写法
```js
//错误1： 两个div没有包含在一个HTML标签内
class Children extends React.Component{
	render(){
        return (
            <div>Others </div>
            <div>i am from Children</div>
            )
    }
}
//错误2：子组件没有包含在一个HTML标签内
class Parent extends React.Component{
	render(){
        return(
            <Children fromParent={} />
            )
    }
})
```
## 组件组合
接下来我们先通过一个留言板的示例为大家展示组件的组合使用。
留言板分为以下几个组件：

1. CommentFrom 提交留言表单组件
2. CommentList 留言展示列表组件
3. CommentItem 一条留言组件
4. CommentBox  留言组件

### 提交留言表单组件
留言板我们会有提交留言的表单组件，该组件我们叫做CommentFrom，我们在此处结合React部分约束表单来写该示例：
```js
class CommentFrom extends React.Component{
    constuctor(props){
        super(props);
        this.state = {
            name:'',
            val:''
        }
    }
    render(){
        return (<div>
                <div>
                    <span>姓名：</span>
                    <input type="text" value={this.state.value} onChange={this.handleInputChange.bind(this)} />
                </div>
                <div>
                    <span>留言：</span>
                    <textarea value={this.state.val} onChange={this.handleTextareaChange.bind(this)}/>
                </div>
                <div>
                    <button onClick={this.handleSubmit.bind(this)}>提交</button>
                </div>
            </div>)
    }
    handleTextareaChange(e){
        //在此处我们处理一下该数据，清除开始于结束的所有空格
        var val = e.target.value.repalce(/^\s+|\s+$/,'');
        this.setState({
            val:val
        })
    }
    handleInputChange(e){
        this.setState({
            name:e.target.value
        })
    }
    handleSubmit(){
        return {name:this.state.name,val:this.state.val};
    }
}

```



### 留言展示列表组件
留言展示列表组件，在该组件中我们主要有2个组件，一个是单条留言组件，一个是留言列表组件。留言展示组件是由多个单条留言组成，在此处我们会初步进行一次组合使用。
```js
//一条留言组件
class CommentItem extends React.Component{
    render(){
        return <div>
            {/*姓名*/}
            <span>{this.props.data.name}</span>

            {/*留言内容*/}
            <span>{this.props.data.val}</span>
        </div>
    }
}

//留言列表组件
class CommentList extends React.Component{
    render(){
        return (<div>
        {/*在此处我们将一条留言组件在该组件中进行了组合，类似html的标签嵌套*/}
                {this.props.list.map((item,index)=>{
                        <CommentItem data={item} key={index}/>
                })}
            </div>)
    }
}
```
### 留言组件
留言组件就是一个容器组件，用来组合 提交留言表单组件 与 留言展示列表组件。
```js
class CommentBox extends React.Component{
    render(){
        return (<div>
                <CommentList/>
                <CommentFrom/>
            </div>)
    }
}

//将该留言渲染到指定标签中
ReactDOM.render(<CommentBox/>,document.querySelector('#box'))
```
通过以上的例子，我们不难发现React组件组合其实与HTML标签的嵌套类似。在做开发的过程中，最重要的是拆分组件，往往拆分组件对于初次接触React的初学者而言是比较困难的，根据组件的目的来明确为什么要写该组件，组件的目的是为了复用，因此我们可以根据该思想来确定哪些组件需要拆分组合使用。



## 组件包含
通过上面留言板的例子，大家已经掌握了React的基本开发思想，为了更好的应用组件的组合，接下来，我们再介绍一个中更为巧妙的组合方式。

在我们开发组件过程中，往往我们不知道组件中的具体的内容是什么，只有在使用的时候才能明确其中的内容。例如：
在需求中，我们经常会用到Button按钮组件，但是有一些需求是组件中只需要出现文字，而有些需要出现图标与文字。
```js
//注册按钮 只要文字
<Button>注册</Button>

//添加按钮需要添加图标结合文字
<Button><Icon type="add" />添加</Button>

//删除按钮只需要删除图标
<Button><Icon type="del"/></Button>
```
这种类型的组合类似我们有一个html标签，标签中的内容是在我们使用标签的时候去决定。这种类型的组件我们需要借助this.props.children属性来实现。
```js
class Button extends React.Component{
    render(){
        return <button>{this.props.children}</button>
    }
}

<Button>注册</Button> //当我们在Button组件中写入注册，那么对应的组件中this.props.children就是“注册”
<Button><Icon type="add" />添加</Button> //这种情况下 this.props.children 就是 <Icon type="add" />添加
```
我们完成一个面板组件(Panel)，面板有标题，还有内容。但是内容我们不知道用户要放置什么，因此我们可以采用组件包含来完成该组件的设计。
```js
class Panel extends React.Component{
    render(){
        return (<div className="panel">
            <h3 className="panel-title">{this.props.title}</h3>
            <div className="panel-body">
            {this.props.children}
            </div>
        </div>);
    }
}

//当前Panel中放置的内容为一个列表
<Panel title="用户列表">
    <ul>
        <li>张三</li>
        <li>李四</li>
        <li>王武</li>
    </ul>
</Panel>

//当前panel中放置的内容为一段文本
<Panel title="激励的句子">
    <p>不是因为看到希望而去做，是做了才有希望</p>
</Panel>
```
