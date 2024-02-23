# Iterator
> Iterator（迭代器）模式又称Cursor（游标）模式，用于提供一种方法顺序访问一个聚合对象中各个元素, 而又不需暴露该对象的内部表示。

## 为什么需要Iterator
JavaScript原有的表示'集合'的数据结构，主要是数组(Array)和对象(Object),ES6又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制来处理所有不同的数据结构。

**遍历器(Iterator)** 就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作(即依次处理该数据结构的所有成员)。

## Iterator的作用

Iterator的作用有三个：
- 为各种数据结构，提供一个统一的、简便的访问接口；
- 使得数据结构成员能够按某种次序排列；
- ES6创造了一种新的遍历命令 `for...of`循环，Iterator接口主要供`for...of`消费。

## Iterator遍历过程
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上就是一个指针对象。
2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象`next`方法，直到它指向数据结构的结束位置。


每一次调用`next`方法，都会返回数据结构当前成员信息。
```
{value:'',done:ture}
```
`value` 属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。


模拟next方法返回值的示例：
```js
var t = makeIterator([1,2]);
t.next(); //{value:1,done:false}
t.next(); //{value:2,done:false}
t.next(); //{value:undefined,done:true}

function makeIterator(array){
    var nextIndex = 0;
    return {
        next:function(){
            return nextIndex < array.length ? {value:array[nextIndex++],done:false} : {value:undefined,done:true};
        }
    }
}
```




## 默认Iterator接口
Iterator接口的目的就是为所有的数据结构提供了一种统一的访问机制，即`for...of`循环。当使用`for...of`循环遍历某种数据结构时，该循环会自动寻找Iterator接口。

一种数据结构只要部署了Iterator接口，我们就称这种数据结构时"可遍历的"(iterable)。

ES6规定，默认的Iterator接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是"可遍历的"(iterable)。`Symbol.iterator`属性本身是一个函数，就是当数据结构默认的遍历器生成函数。执行这个函数就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的类型为Symbol的特殊值，所以要放在方括号内。

```js
const obj = {
    [Symbol.iterator]:function(){
        return {
            next: function(){
                return {
                    value:1,
                    done:false
                }
            }
        }
    }
}
```
ES6的有些数据结构原生具备Iterator接口(比如数组)，即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性，另外一些数据结构没有(比如对象)。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

原生具备Iterator接口的数据结构如下：
- Array
- Map
- Set
- String
- TypedArray
- 函数的Arguments对象
- NodeList对象


数组的`Symbol.iterator`属性:
```js
let arr = ['a','b','c'];
let iter = arr[Symbol.iterator]();

iter.next(); //{value:'a',done:false}
iter.next(); //{value:'b',done:false}
iter.next(); //{value:'c',done:false}
iter.next(); //{value:undefined,done:true}
```
变量arr是一个数组，原生就具有遍历器接口，部署在arr的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。


## 调用 Iterator 接口的场合
有一些场合会默认调用Iterator接口(即`Symbol.iterator`方法)，除了下文会介绍的`for...of`，还有几个别的场合。

### 解构赋值
对数组和Set结构进行解构赋值时，会默认调用`Symbol.iterator`方法。
```js
let set = new Set().add('a').add('b').add('c');

let [x,y] = set; //x='a'; y='b'

let [first,...rest] = set;  // first = 'a'; rest = ['b','c'];
```
### 扩展运算符
扩展运算符(...) 也会调用默认的Iterator接口。
```js
var str = 'hello';
[...str]  // ['h','e','l','l','o']

let arr = ['b','c'];

['a',...arr,'d'] // ['a','b','c','d']
```
上面代码的扩展运算符内部就调用Iterator接口。

实际上，这提供了一种简便机制，可以将任何部署了Iterator接口的数据结构，转为数组。也就是说，只要某个数据结构部署了Iterator接口，就可以对它使用扩展运算符，将其转为数组。
```
let arr = [...iterator];
```
### yield*
`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
```js
let generator = function* (){
    yield 1;
    yield* [2,3,4];
    yield 5;
}
var iter = generator();

iter.next();  //{value:1,done:false}
iter.next();  //{value:2,done:false}
iter.next();  //{value:3,done:false}
iter.next();  //{value:4,done:false}
iter.next();  //{value:5,done:false}
iter.next();  //{value:undefined,done:true}
```
### 其他场合
由于数组的遍历会调用遍历器接口，所以任何接收数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
- for...of
- Array.from()
- Map(),Set(),WeakMap(),WeakSet() (比如`new Map([['a',1],['b',2]])`)
- Promise.all()
- Promise.reace()


## 字符串的Iterator接口
字符串是一个类似数组的对象，原生具有Iterator接口。
```js
var str = "hi";
typeof str[Symbol.iterator]  //function

var iter = str[Symobal.iterator]();
iterator.next() //{value:'h',done:false}
iterator.next() //{value:'i',done:false}
iterator.next() //{value:undefined,done:true}
```
上面代码中，调用`Symbol.iterator`方法返回一个遍历器对象，在这个遍历器上可以调用next方法，实现对于字符串的遍历。


## Iterator接口与Generator函数
`Symbol.iterator`方法的最简单实现，还是使用下一章要介绍的Generator函数。
```js
let myIterable = {
    [Symbol.iterator] : function* (){
        yield 1;
        yield 2;
        yield 3;
    }
}
[...myIterable] // [1,2,3]

//或者采用下面的简洁写法
let obj = {
    * [Symbol.iterator](){
        yield 'hello';
        yield 'world';
    }
}
for(let x of obj){
    console.log(x);
}
//"hello"
//"world"
```


## for...of 循环
ES6借鉴  C++、Java、C# 和Python 语法，引入了`for...of`循环，作为遍历所有数据结构的统一方法。

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有Iterator接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

`for...of`循环可以使用的范围包括
- 数组
- Set
- Map
- 类数组对象 arguments/DOM NodeList对象
- Generator对象
- String


### 数组
数组原生具备`iterator`接口(即默认部署了`Symbol.iterator`属性),`for...of`循环本质上就是调用这个接口产生遍历器，可以用下面的代码证明.
```js
const arr = ['red','green','blue'];
for(let v of arr){
    console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj){
    console.log(v); // red green blue
}
```
上面的代码中，空对象obj部署了数组arr的Symbol.iterator属性，结果obj的`for...of`循环，产生了与`arr`完全一样的结果。

Javascript原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6提供`for...of`循环，允许遍历获得键值。
```js
var arr = ['a','b','c','d'];
for(let a in arr){
    console.log(a); //0 1 2 3 4
}

for(let a of arr){
    console.log(a); //'a' 'b' 'c' 'd'
}
```

`for...of`循环调用遍历器接口，数组的遍历器接口只发挥具有数字索引的属性，这点跟`for...in`循环也不一样。
```js
let arr = [3,5,7];
arr.foo = 'hello';

for(let i in arr){
    console.log(i); // '0' '1' '2' 'foo'
}

for(let i of arr){
    console.log(i); // 3 5 7
}
```

### Set和Map结构
Set和Map结构 原生具有Itrator接口，可以直接使用`for...of`循环。
```js
var engines = new Set(['Gecko','Trident','Webkit','Webkit'])
for(var v of engines){
    console.log(v);
}
//Gecko  Trident  Webkit

var mp = new Map();
mp.set("edition",6);
mp.set("committee","TC39");
mp.set("standard","ECMA-262");

for(var [name,value] of mp){
    console.log(name + ":" + vlaue);
}
//edition:6
//committee:TC39
//standard:ECMA-262
```
上面代码演示了如何遍历Set结构和Map结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值。

```js
let map = new Map().set('a',1).set('b',2);
for(let v of map){
    console.log(v)
}
//['a',1]
//['b',2]

for(let [k,v] of map){
    console.log(k + ':'+v);
}
//a:1
//b:2
```
### 计算生成的数据结构
有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6的数组、Set、Map都部署了以下三个方法，调用后都返回遍历器对象。
- `entries()` 返回一个遍历器对象，用来遍历`[键名，键值]`组成的数组。对于数组，键名就是索引值；对于Set，键名与键值相同。Map结构的Iterator接口，默认就是调用`entries`方法.
- `keys()` 返回一个遍历器对象，用来遍历所有的键名。
- `values()` 返回一个遍历器对象，用来遍历所有的键值。

这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。

### 类似数组的对象
类似数组的对象包括好几类。
- 字符串
- DOM NodeList对象
- `arguments`对象

```js
//字符串
let str = "hello";
for(let s of str){
    console.log(s); // h e l l o
}

// DOM NodeList
let ps = document.querySelectorAll('p');

for (let p of ps){
    p.classList.add("active");
}

//Arguments对象
function Test (){
    for(var a of arguments){
        console.log(a);
    }
}
Test("a","b");
// "a"   "b"
```
对字符串来说，`for...of`循环还有一个特点，就是会正确识别32位UTF-16字符串。
```js
for (let x of 'a\uD83D\uDC0A'){
    console.log(x)
}
// 'a'
// '\uD83D\uDC0A'

```

并不是所有类数组的对象都具有Iterator接口，一个简便的解决办法，就是使用 `Array.from()`方法将其转为数组。
```js
var likeArray = {0:'a',1:'b',length:2};

//报错
for(let x of likeArray){
    console.log(x)
}

//正确
for (let x of Array.from(likeArray)){
    console.log(x)
}
```

### 对象
对于普通的对象，`for...of`循环不能直接使用，会报错，必须部署了Itrator接口后才能使用。但是，这样情况下，`for...in` 循环依然可以用来遍历键名。
```js
let user = {name:"zhangsan",age:12,sex:"男"};

for(let k in user){
    console.log(k)
}
// name
// age
// sex

for(let v of user){
    console.log(k)
}
//Uncaught TypeError: user is not iterable
```
上面代码表示，对于普通的对象，`for...in`循环可以遍历键名，`for...of`循环会报错。

### 与其他遍历语法的比较
以数组为例，JavaScript提供多种遍历语法。最原始的写法就是`for`循环。
```js
for(var i = 0; i < arr.length;i++){
    console.log(arr[i]);
}
```
这种写法比较麻烦，因此数组提供内置的`forEach`方法。
```js
arr.forEach(v=>{
    console.log(v);
})
```
这种写法的问题在于，无法中途跳出`forEach`循环，`break`命令或`return`命令都不能。

`for...in`循环可以遍历数组的键名。
```js
for(var i in arr){
    console.log(arr[i])
}
```

`for...in`循环有几个缺点：
- 数组的键名是数字，但是`for...in`循环是以字符串作为键名'0'、'1'、'2'等等。
- `for...in`循环不仅遍历数字的键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名。

总之,`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

`for...of`循环相比上面几种做法，有一些显著的优点：
```js
for(let v of arr){
    console.log(v)
}
```
- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。

使用break语句跳出`for...of`循环的例子：
```js
for(let v of arr){
    if(v>100){
        break;
    }
    console.log(n);
}
```
