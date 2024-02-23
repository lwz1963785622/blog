# ReactJSX
> JSX允许我们在JavaScript代码中写HTML，而不是用HTML包含JavaScript。

## JSX介绍
### JSX由来
React是通过JavaScript生成用户界面。如果通过JavaScript语法写HTML代码，那将是一个灾难。JSX出现就是为了让我们可以在JavaScript代码中书写HTML语法来提高我们的开发效率。

### JSX是什么
> JSX = JavaScript XML是一种在React组件内部构建标签的类XML语法。

在不使用JSX，情况下我们需要通过`React.createElement`方法来创建React元素。
```js
React.createElement('h3',{className:'title'},'你好，!')
```
如果使用了JSX,上述的函数调用就变为了非常熟悉的声明式的HTML标签方式：
```html
<h3 className='title'>你好，！</h3>
```
React中JSX基本原理就是把JSX中出现的html标签自动转换成`React.createElement()`，这样就转换成了js代码。我们也可以通过`React.createElement()`去创建组件，这样可以不必使用JSX，但是这样相对复杂。

JSX赋予了React强大的表现力，使得我们在开发中利用JSX可大大的提高开发效率。
### 为什么使用JSX
使用JSX有着非常多的好处，而这些好处会随着项目的日益增大、组件的愈加复杂而别的越来越明显。

- 提高开发效率
- 更加熟悉
- 更加语义化
- 结构清晰直观,可以提高组件的可读性
- 抽象化: 抽象了将html标签转换为javascript的过程

## 开始使用JSX
### 开始前准备

```js
在浏览器中使用JSX，需下载babel.js库
<script src="babel.min.js"></script>

              JSX type="text/babel"
              ----------------
<script type="text/babel">
          组件名 自定义组件名首字母必须大写
          -----
    class Hello extends React.Component{       子节点
        render(){                       ----------------------
            return <div className="box">hello,{this.props.name}</div>
        }
    }
                       节点属性
                       -------------
ReactDOM.render(<Hello name="allcky"/>,document.body); </script>
```
### 基本语法
使用XML语法的好处是标签可以嵌套。我们可以像HTML一样清晰的看到DOM的结构以及属性。比如我们有如下组件：
```js
class List extends React.Compoent{
    render(){
        return (<ul>
                <li>list1</li>
                <li>list2</li>
                <li>list3</li>
            </ul>)
    }
}
```
使用了JSX之后就如同在写HTML一样，大大提高了开发效率。但是需要注意如下几点：
1. 元素名(组件)首字母大写 (区分自定义元素名<大写>与html标签<小写>)
2. 符合HTML嵌套规则
3. 可以写入求值表达式 {this.props.name}
4. 可以采用驼峰命名
5. 不能使用javascript原生函数的一些关键词，如for和class 需要替换成htmlFor和className
6. 返回标签必须包含在一个标签中。例如：`<span>名称：</span><div></div>`返回这样结果会报错。
7. 标签必须要闭合。所有的标签无论是单标签、双标签都必须要闭合，不闭合会报错。例如：`<img src="" /> <span></span>`

### 元素属性
> 元素除了标签外，另一个组成部分就是属性。

在JSX中，无论DOM元素还是组件元素，他们都有属性。不同的是DOM元素的属性是标准规范的属性。但是有两个属性例外————class和for，这是因为在JavaScript中这两个单词都是关键字。
因此我们在使用的时候需要进行转换：

- class属性改为className
- for属性改为 htmlFor

组件的属性都是自定义属性，主要的作用是给组件内部传递数据以及参数，在后面参数章节会详细介绍。
## 注释
JSX本质上就是Javascript，因此你可以在标签内添加原生注释。注释可以用以下两种形式添加：
- 当做一个元素的子节点
- 内联在元素的属性中

### 作为子节点
子节点形式的注释只需要简单的包裹在花括号内即可，并且可以跨越多行。
```js
<div>
    {/* 这是一个 input 元素，
    主要是用来收集用户的邮箱信息*/}
    <input name="email" placeholder="Email Address" />
</div>
```
### 作为内联属性
可以使用单行注释：
```js
<div>
    <input
        name="email" // 关于 email input
        placeholder="Email Address" />
</div>
```

## JSX 表达式
> 在 JSX 当中的表达式要包含在大括号里。

JSX将两个大括号之间的内容{...}渲染为动态值，大括号里面可以是一个变量，也可以是函数。

### 使用变量或属性
```js
class Hello extends React.Component{
    render(){
        var name = "allcky";
        return <div>{name}</div>;
    }
}
```
### 数组
JSX 允许在模板中插入数组，数组会自动展开所有成员
```js
# 示例1：自动展开数组成员
var arr = [
  <h1>前端培训</h1>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);

# 示例2：访问数组某个值
class Test extends React.Component{
    render(){
        var data = ['张三','李四','王武'];
        return <ul>
            <li>{data[0]}</li>
            <li>{data[1]}</li>
            <li>{data[2]}</li>
        </ul>
    }
}
```
### 调用函数/方法
```js
# 示例1：
class MyDate extends React.Component{
    render(){
        function restDate(d){
            return [
                d.getFullYear(),
                d.getMonth()+1,
                d.getDate()
                ].join("-");
        }
        return <div>{restDate(new Date())}</div>
    }
}

# 示例2：调用对象方法
class ReverseText extends React.Component{
    render(){
        var str = "hello";
        return <div>{str.split('').reverse().join('')}</div>
    }
}
```

### 使用条件判断
#### 三元运算符
```js

class Hello extends React.Component{
    render(){
        return <div>Hello,{this.props.name?this.props.name:"houningzhou"}</div>
    }
}
ReactDOM.render(<Hello name='allcky'/>,document.body);
</script>
```

#### if else
``` js

class Hello extends React.Component{
    render(){
        var getName =  () =>{
            if(this.props.name){
                return this.props.name;
            }else{
                return "houningzhou";
            }
        }
        return <div>Hello,{getName()}</div>
    }
}

ReactDOM.render(<Hello name='allcky'/>,document.querySelector("#app"));
</script>
```

#### 逻辑运算符 ||
```js

<script async src="//jsrun.pro/YAhKp/embed/js,html,result/light/">
class Hello extends React.Component{
    render(){
        return <div>Hello,{this.props.name||"houningzhou"}</div>
    }
}
ReactDOM.render(<Hello name='allcky'/>,document.querySelector("#app"));
</script>
```
