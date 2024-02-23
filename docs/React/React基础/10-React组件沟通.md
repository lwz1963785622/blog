# React组件沟通

React 是以组合组件的形式组织的，组件因为彼此是相互独立的，从传递信息的内容上看，几乎所有类型的信息都可以实现传递，例如字符串、数组、对象、方法或自定义组件等。所以，在嵌套关系上，就会有两种不同的可能性：父组件向子组件通信、子组件向父组件通信、兄弟组件通信。

## 父子组件沟通

这种方式是最常见的，也是最简单的。

### 父组件更新组件状态

父组件更新子组件状态，通过传递props，就可以了。

``` js
class ColorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#009494'
        }
    }
    render() {
        var colorStyle = {
            height: 200,
            width: 150,
            padding: 0,
            backgroundColor: "#FFF",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        }
        return ( < div style = {
                colorStyle
            } >
            <
            Color color = {
                this.state.color
            }
            /> <
            Label color = {
                this.state.color
            }
            /> < /
            div > );
    }
    componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.setState({
                color: '#ff0033'
            })
        }, 10000)
    }
}

class Color extends React.Component {
    render() {
        var colorStyle = {
            height: '150px',
            width: '150px',
            backgroundColor: this.props.color
        }
        return <div style = {
            colorStyle
        } > < /div>
    }
}
class Label extends React.Component {
    render() {
        var labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 13,
            margin: 0
        };
        return <div style = {
            labelStyle
        } > {
            this.props.color
        } < /div>
    }
}
ReactDOM.render( < ColorCard / > , document.querySelector('#box'));
```

### 子组件更新父组件状态

这种情况需要父组件传递回调函数给子组件，子组件调用触发即可。

``` js
class Child extends React.Component {
    handleClick() {
        this.props.handleChangeName(this.refs.text.value);
    }
    render() {

        return ( < div >
            <
            input type = 'text'
            ref = "text" / >
            <
            button onClick = {
                this.handleClick.bind(this)
            } > 提交 < /button> < /
            div > );
    }
}
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'everyone'
        }
    }
    handleChangeName(name) {
        this.setState({
            text: name
        })
    }
    render() {
        return ( < div >
            <
            p > hello, {
                this.state.text
            } < /p> <
            Child handleChangeName = {
                this.handleChangeName.bind(this)
            }
            /> < /
            div > )
    }
}
ReactDOM.render( < Parent / > , document.querySelector('#box'));
```

## 兄弟组件沟通

当两个组件有相同的父组件时，就称为兄弟组件。按照React单向数据流方式，我们需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的props。

``` js
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    changeText() {
        this.setState({
            text: '兄弟组件修改成功'
        })
    }
    render() {
        return ( < div >
            <
            Brother1 changeText = {
                this.changeText.bind(this)
            }
            /> <
            Brother2 text = {
                this.state.text
            }
            /> < /
            div > )
    }
}

class Brother1 extends React.Component {
    render() {
        return <button onClick = {
            this.props.changeText
        } > 修改兄弟节点 < /button>
    }
}

class Brother2 extends React.Component {
    render() {
        return <button > {
            this.props.text || '未修改'
        } < /button>
    }
}

ReactDOM.render( < Parent / > , document.querySelector('#box'))
```

### 组件间的关系：

* 父子组件
* 兄弟组件（非嵌套组件）
* 祖孙组件（跨级组件）

### 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

### 比较好的搭配方式：

		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

## 消息订阅-发布 （类似于vue $emit）

``` js
    // npm 安装pubsub-js
    // npm install 'pubsub-js'--save

    import PubSub from 'pubsub-js' //引入
    class Parent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                text: ''
            }
        }
        changeText() {
            this.setState({
                text: '兄弟组件修改成功'
            })
        }
        render() {
            return 
            ( 
            <div>
                < Brother1 /> 
                <Brother2 /> 
            </div> 
            )
               
        }
    }

    class Brother1 extends React.Component {
        changeText=()=>{
            let data={}
          PubSub.publish('update', data) //发布消息
        }
        render() {
            return <button onClick = {
                this.changeText
            } > 修改兄弟节点 < /button>
        }
    }

    class Brother2 extends React.Component {
        state={

        }
        componentDidMount(){
            this.token=PubSub.subscribe('update', function(data){  //订阅消息
                console.log(data)
            }); //订阅
         }
        componentWillUnmount(){
            PushSub.unsubscribe(this.token)
        }
            render() {
                return <button > {
                    this.props.text || '未修改'
                } < /button>
            }
        }

    ReactDOM.render( < Parent / > , document.querySelector('#box'))
```
