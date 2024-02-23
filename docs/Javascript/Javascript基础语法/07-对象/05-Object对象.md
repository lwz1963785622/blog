# JavaScript 对象的分类
1. 内置对象：ECMAScript内置的对象，直接拿来用就可以，不需要实例化
    * 内置顶层对象(global): Math;
2. 本地对象:需要实例化才能用
    * String;
    * Boolean;
    * Number;
    * Function;
    * Array;
3. 宿主对象: BOM DOM
    > 宿主：js的执行环境



## Object的属性
1. constructor：是对构造函数的引用。
2. prototype：是对函数对象的原型引用
    * 是函数对象的默认属性。
    * 可以将对象的共有属性存放到原型上，也可以实现继承。

## Object的方法
### Object.assign(obj1,obj2,obj3,......) <Badge text="ES6" type="warning"/>
> 可用于对象的拼接，将obj2，obj3......拼接到对象obj1上，并将obj1返回，obj1改变，其他对象不变。

```js
var obj1={name:'张三'};
var obj2={age:18};
var obj3={say:function(){
  console.log('说话');
}}
console.log(Object.assign(obj1,obj2,obj3));    //{name: "张三", age: 18, say: ƒ}
console.log(obj1,obj2);                   // {name: "张三", age: 18, say: ƒ}   {age: 18}
```
* 特殊用法： 对象拷贝：

```js
// 将对象obj拷贝到newObj
var obj = {name: '张三', age: 20};

var newObj = Object.assign({},obj);
```

::: warning
（1）浅拷贝
`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
（2）同名属性的替换
对于这种嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换，而不是添加。
```js
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```
:::

###  Object.is(a,b); <Badge text="ES6" type="warning"/>
>用于判断两个值是否相同,与===类似，但又不完全一样

```js
Object.is(+0,-0);               //false
Object.is(NaN,NaN);               //true
```

<!-- ES5 可以通过下面的代码，部署Object.is。 -->

```js
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```
###  obj.prototype.isPrototypeOf(b);
>确定一个对象是否存在于另一个对象的原型链中

```js
function a(){
}
var b = new a();
console.log(a.prototype.isPrototypeOf(b));      //true
```

###  Object.defineProperty()
>直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为`undefined`      

语法: `Object.defineProperty(obj, prop, descriptor)`
```js
var obj = new Object();
Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,           //该属性是否可枚举
    value: '张三'
})
console.log(obj.name)  //张三
```

###  Object.defineProperties()
>直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。       

语法: `Object.defineProperties(obj, props)`  
props数据描述：  
* value: 属性对应的值,可以使任意类型的值，默认为 **undefined**
* configurable: 是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。设置为true可以被删除或可以重新设置特性；设置为false，不能被可以被删除或不可以重新设置特性。默认为**false**。
* writable: 属性的值是否可以被重写。设置为true可以被重写。默认为**false**。
* enumerable: 属性是否可以被枚举(使用for...in或Object.keys())。设置为true可以被枚举。默认为**false**。

```js
var obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})
console.log(obj.name, obj.age) // 张三, 18
```

###  Object.freeze(obj)
> 阻止修改现有属性的特性和值，并阻止添加新属性。

```js
var obj={name:'张三',age:18};
Object.freeze(obj)
obj.name='李四';
obj.sex='男';
console.log(obj)                //{name: "张三", age: 18}
```

用途：用`const`声明的对象属性方法任然可修改，可以利用这个方法将对象彻底冻结，使其符合const变量的含义
```javascript
var obj = {
    name:"zhangsan",
    age: 20
Object.freeze(obj)
obj.name = "lisi"
console.log(obj.name)     // "zhangsan"
```
### __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()  
> JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法
#### __proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性
```js
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj; //不建议

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```
实现上，__proto__调用的是`Object.prototype.__proto__`
```js
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});

function isObject(value) {
  return Object(value) === value;
}

```
::: tip
如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
:::


#### `Object.setPrototypeOf` <Badge text="ES6" type="warning"/>
> `Object.setPrototypeOf`方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

// 等于

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果
```js
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true
// 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
```
#### `Object.getPrototypeOf() `<Badge text="ES6" type="warning"/>

> 该方法与`Object.setPrototypeOf`方法配套，用于读取一个对象的原型对象。
```js
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false

```
如果参数不是对象，会被自动转为对象。

```js
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

// 如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
```


###  Object.getOwnPropertyDescriptor() 
> 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
```js
const object1 = {
  property1: 42
};
const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable);
// expected output: true

console.log(descriptor1.value);
// expected output: 42
```

###   Object.getOwnPropertyDescriptors() <Badge text="es2017" type="warning"/>
> 方法用来获取一个对象的所有自身属性的描述符。
- 参数 obj 任意对象
- 返回值  所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

## ES6对象的遍历
### 1. for in 循环
> 循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).

```javascript
var obj={
  name:'小米',
  age:18,
  say:function(){
    console.log('你好');
  }
}
for (var i in obj) {
  console.log(obj[i]);
}
```

### 2. Object.keys(obj)
> 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的`键名`。

```js
var obj = {'a':'123','b':'345'};
console.log(Object.keys(obj));  //['a','b']

// 如果键名是数字，则按从小到大排列
var obj1 = { 100: "a", 2: "b", 7: "c"};
console.log(Object.keys(obj1)); // console: ["2", "7", "100"]

var obj2 = Object.create({}, { getFoo : { value : function () { return this.foo } } });
obj2.foo = 1;
console.log(Object.keys(obj2)); // ["foo"]
```

> 由于 `for...in`会遍历出继承的属性，使问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用`for...in`循环，而用`Object.keys()`代替。


### 3. Object.getOwnPropertyNames(obj);
> 返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).

### 4. Object.getOwnPropertySymbols(obj);
>返回一个数组，包含对象自身的所有Symbol属性。

### 5. Reflect.ownKeys(obj);
>返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.  

### 6. Object.values(obj) <Badge text="es2017" type="warning"/>
> 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用`for...in`循环的顺序相同( 区别在于 for-in 循环枚举原型链中的属性 )。过滤属性名为 Symbol 值的属性
```js
var obj = { name: 'zhangsan', age: 20 };
console.log(Object.values(obj)); // ['zhangsan', 20]
```
如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
```js
Object.values(42) // []
Object.values(true) // []
```

### 7 Object.create();
> 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```js
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person);
me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
```
### 8 Object.entries() <Badge text="es2017" type="warning"/>
> 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。过滤属性名为 Symbol 值的属性
```js
const object1 = {
  a: 'somestring',
  b: 42
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
// expected output:
// "a: somestring"
// "b: 42"
// order is not guaranteed
```

Object.entries方法的另一个用处是，将对象转为真正的Map结构。
```js
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

### 9 Object.fromEntries()  <Badge text="es6" type="warning"/>
> 方法把键值对列表转换为一个对象
```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
const obj = Object.fromEntries(entries);
console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

## 对象的扩展
### 属性的简洁表示法 <Badge text="es6" type="warning"/>
> ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};


function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```
### 方法的简写  <Badge text="es6" type="warning"/>
::: warning
注意，简写的对象方法不能用作构造函数，会报错。
:::
```javascript
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};

let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```

### 属性名表达式 <Badge text="es6" type="warning"/>
> JavaScript 定义对象的属性，有两种方法。
  ```javascript
const obj = {};
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;


let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

```
> 表达式还可以用于定义方法名。
```javascript
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```
::: warning
注意，属性名表达式与简洁表示法，不能同时使用，会报错。
:::
```javascript
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```
::: warning
属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
:::
```javascript
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

// 上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
```

### 方法的 name 属性 <Badge text="es6" type="warning"/>
> 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
```javascript
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"
```
> 如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
```javascript
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```
::: warning
有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
:::
```javascript
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```
> 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
```javascript
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

### 属性的可枚举性和遍历 <Badge text="es6" type="warning"/>

ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

首先遍历所有数值键，按照数值升序排列。
其次遍历所有字符串键，按照加入时间升序排列。
最后遍历所有 Symbol 键，按照加入时间升序排列。
```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```
上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

### super 关键字  <Badge text="es6" type="warning"/>
> this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
```javascript
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
::: warning
注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
:::
```javascript
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```
>  上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法

::: tip
JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
:::
```javascript
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```
> 上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。

### 对象的扩展运算符 <Badge text="es2018" type="warning"/>
> 与数组的结构扩展运算符类似
###  解构赋值
> 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

// 变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。
```
> 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
```js
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误
```
> 解构赋值必须是最后一个参数，否则会报错。
```js
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```  
::: warning
注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
:::
```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
// 上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。
```
```js
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3

// 变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值。ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。


let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts
```
> 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
  
```js
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}
```

### 扩展运算符

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```
由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
```js
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```
如果扩展运算符后面是一个空对象，则没有任何效果。
```js
{...{}, a: 1}
// { a: 1 }
```
如果扩展运算符后面不是对象，则会自动将其转为对象。
```js
// 由于该对象没有自身属性，所以返回一个空对象。
// 等同于 {...Object(1)}
{...1} // {}

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
```
但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```js
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```
对象的扩展运算符等同于使用Object.assign()方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
```js
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```
扩展运算符可以用于合并两个对象。
```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
```js
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```
与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
```js
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```
