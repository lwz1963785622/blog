# js性能优化
1. 重复使用的调用结果，事先保存到局部变量
```js
//避免多次取值的调用开销
var h1 = element1.clientHeight + num1;
var h4 = element1.clientHeight + num2;
//可以替换为：
var eleHeight = element1.clientHeight;
var h1 = eleHeight + num1;
var h4 = eleHeight + num2;
```

1. 避免全局查找   
在一个函数中会用到全局对象存储为局部变量来减少全局查找，因为访问局部变量的速度要比访问全局变量的速度更快些
```js
function search() {
    //当我要使用当前页面地址和主机域名
    alert(window.location.href + window.location.host);
}
//最好的方式是如下这样  先用一个简单变量保存起来
function search() {
    var location = window.location;
    alert(location.href + location.host);
}    
```

3. 浮点数转换成整型    
parseInt()是用于将字符串转换成数字，而不是浮点数和整型之间的转换，应该使用Math.floor()或者Math.round()

4. 各种类型转换
```js
var myVar = "3.14159",
str = "" + myVar, //  to string  
i_int = ~ ~myVar,  //  to integer  
f_float = 1 * myVar,  //  to float  
b_bool = !!myVar,  /*  to boolean - any string with length
                        and any number except 0 are true */
array = [myVar];  //  to array  
```
如果定义了toString()方法来进行类型转换的话，推荐显式调用toString()，因为内部的操作在尝试所有可能性之后，会尝试对象的toString()方法尝试能否转化为String，所以直接调用这个方法效率会更高

4. 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。
```js
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var el = document.createElement('p');
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
//可以替换为：
var html = [];
for (var i = 0; i < 1000; i++) {
    html.push('<p>' + i + '</p>');
}
document.body.innerHTML = html.join('');
```

5. 删除dom节点之前,一定要删除注册在该节点上的事件
否则将会产生无法回收的内存。另外，在removeChild和innerHTML=’’二者之间,尽量选择后者. 因为在sIEve(内存泄露监测工具)中监测的结果是用removeChild无法有效地释放dom节点

6. 使用事件代理    
任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理，使用这个知识就可以将事件处理程序附加到更高的地方负责多个目标的事件处理，同样，对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册提到父节点上，这样就不需要为每个子节点注册事件监听了。另外，现有的js库都采用observe方式来创建事件监听,其实现上隔离了dom对象和事件处理函数之间的循环引用,所以应该尽量采用这种方式来创建事件监听

6. 避免双重解释
    * 尽量少使用eval函数
    * 不要使用Function构造器
7. 通过javascript创建的dom对象，必须append到页面中
>IE下，脚本创建的dom对象，如果没有append到页面中，刷新页面，这部分内存是不会回收的！

8. 尽量使用原生方法  
8. 条件分支
    * 将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数
    * 在同一条件子的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半。
    * 使用三目运算符替代条件分支
10. 优化循环
    * 减值迭代
    * 简化终止条件
    * 简化循环体
    * 使用后测试循环
>在JavaScript中，我们可以使用for(;;),while(),for(in)三种循环，事实上，这三种循环中for(in)的效率极差，因为他需要查询散列键，只要可以，就应该尽量少用。for(;;)和while循环，while循环的效率要优于for(;;)，可能是因为for(;;)结构的问题，需要经常跳转回去。
