# Proxy <Badge text="ES6" type="warning"/>

## 概述

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### 例子

```js
var proxy = new Proxy({}, {
    get: function(target, propKey) {
        return 35;
    }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

`Proxy` 接受两个参数。
* `target` 参数是所要代理的目标对象（上例是一个空对象），即如果没有Proxy的介入，操作原来要访问的就是这个对象；
* `handler` 参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。
::: warning
注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

如果handler没有设置任何拦截，那就等同于直接通向原对象。
:::

## Proxy 实例的方法

### `get()`

> 用于拦截某个属性的读取操作，可接受三个参数。

* 目标对象
* 属性名
* `proxy` 实例本身(可选)

```js
var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function(target, propKey) {
        if (propKey in target) {
            return target[propKey];
        } else {
            throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
    }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

const proxy = new Proxy({}, {
    get: function(target, key, receiver) {
        return receiver;
    }
});

const d = Object.create(proxy);
d.a === d // true
```

### `set()`

> set方法用来拦截某个属性的赋值操作，可以接受四个参数，

* 目标对象
* 属性名
* 属性值
* `proxy` 实例本身(可选)

#### 例子

> 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。

```js
let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }

        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
        return true;
    }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

> set方法的第四个参数receiver 一般情况下是proxy实例本身

```js
const handler = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
        return true;
    }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
// myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。
```

::: warning
如果目标对象自身的某个属性不可写，那么set方法将不起作用。

```js
const obj = {};
Object.defineProperty(obj, 'foo', {
    value: 'bar',
    writable: false
});

const handler = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = 'baz';
        return true;
    }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。

```js
'use strict';
const handler = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
        // 无论有没有下面这一行，都会报错
        return false;
    }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

:::

### `apply()`

> apply方法拦截函数的调用、call和apply操作。

`apply` 方法可以接受三个参数
* 目标对象
* 目标对象的上下文对象（this）
* 目标对象的参数数组

```js
var handler = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments);
    }
};

// ---
var target = function() {
    return 'I am the target';
};
var handler = {
    apply: function() {
        return 'I am the proxy';
    }
};

var p = new Proxy(target, handler);
// 变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
p()
// "I am the proxy"

// ---
var twice = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
    }
};

function sum(left, right) {
    return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// ---
Reflect.apply(proxy, null, [9, 10]) // 38
```

### `has()`

> `has()` 方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符

`has()` 方法可以接受两个参数
* 目标对象
* 需查询的属性名

```js
var handler = {
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = {
    _prop: 'foo',
    prop: 'foo'
};
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

::: warning
值得注意的是，has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has()方法不判断一个属性是对象自身的属性，还是继承的属性。

另外，虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。

```js
let stu1 = {
    name: '张三',
    score: 59
};
let stu2 = {
    name: '李四',
    score: 99
};

let handler = {
    has(target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} 不及格`);
            return false;
        }
        return prop in target;
    }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
    // 张三 不及格
    // false

    'score' in oproxy2
// true

for (let a in oproxy1) {
    console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
    console.log(oproxy2[b]);
}
// 李四
// 99
```

:::

### `construct()`

> construct()方法用于拦截new命令，下面是拦截对象的写法。

`construct()` 方法可以接受三个参数。
* target：目标对象。
* args：构造函数的参数数组。
* newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）。

```js
const p = new Proxy(function() {}, {
    construct: function(target, args) {
        console.log('called: ' + args.join(', '));
        return {
            value: args[0] * 10
        };
    }
});

(new p(1)).value
// "called: 1"
// 10
```

::: warning
`construct()` 方法返回的必须是一个对象，否则会报错。

```js
const p = new Proxy(function() {}, {
    construct: function(target, argumentsList) {
        return 1;
    }
});

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
```

由于 `construct()` 拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。

```js
const p = new Proxy({}, {
    construct: function(target, argumentsList) {
        return {};
    }
});

new p() // 报错
// Uncaught TypeError: p is not a constructor
```

`construct()` 方法中的this指向的是handler，而不是实例对象。

```js
const handler = {
    construct: function(target, args) {
        console.log(this === handler);
        return new target(...args);
    }
}

let p = new Proxy(function() {}, handler);
new p() // true
```

:::

### `deleteProperty()`

> `deleteProperty` 方法用于拦截 `delete` 操作，如果这个方法抛出错误或者返回 `false` ，当前属性就无法被 `delete` 命令删除。

```js
var handler = {
    deleteProperty(target, key) {
        invariant(key, 'delete');
        delete target[key];
        return true;
    }
};

function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}

var target = {
    _prop: 'foo'
};
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property

// deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
```

::: warning
目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
:::

### `deleteProperty()`

> `defineProperty()` 方法拦截了Object.defineProperty()操作。

```js
var handler = {
    defineProperty(target, key, descriptor) {
        return false;
    }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 

// 上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。
// 注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
```

::: warning

如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
:::

### `getOwnPropertyDescriptor()`

> `getOwnPropertyDescriptor()` 方法拦截 `Object.getOwnPropertyDescriptor()` ，返回一个属性描述对象或者 `undefined` 。

```js
var handler = {
    getOwnPropertyDescriptor(target, key) {
        if (key[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
    }
};
var target = {
    _foo: 'bar',
    baz: 'tar'
};
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }

// handler.getOwnPropertyDescriptor()方法对于第一个字符为下划线的属性名会返回undefined。
```

### `getPrototypeOf()`

> `getPrototypeOf()` 方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

* `Object.prototype.__proto__`

*  `Object.prototype.isPrototypeOf()`

*  `Object.getPrototypeOf()`

*  `Reflect.getPrototypeOf()`

*  `instanceof`

例子

```js
var proto = {};
var p = new Proxy({}, {
    getPrototypeOf(target) {
        return proto;
    }
});
Object.getPrototypeOf(p) === proto // true

// getPrototypeOf()方法拦截Object.getPrototypeOf()，返回proto对象。
```

::: warning 
`getPrototypeOf()` 方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， ` getPrototypeOf()` 方法必须返回目标对象的原型对象。
:::

### `isExtensible()`

> `isExtensible()` 方法拦截 `Object.isExtensible()` 操作。

```js
var p = new Proxy({}, {
    isExtensible: function(target) {
        console.log("called");
        return true;
    }
});

Object.isExtensible(p)
// "called"
// true
```

::: warning
该方法只能返回布尔值，否则返回值会被自动转为布尔值。
:::

这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。

```js
Object.isExtensible(proxy) === Object.isExtensible(target)

var p = new Proxy({}, {
    isExtensible: function(target) {
        return false;
    }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

### `ownKeys()`

> `ownKeys()` 方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

* Object.getOwnPropertyNames()
* Object.getOwnPropertySymbols()
* Object.keys()
* for...in循环

```js
let target = {
    a: 1,
    b: 2,
    c: 3
};

let handler = {
    ownKeys(target) {
        return ['a'];
    }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
```

::: warning
使用 `Object.keys()` 方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。

* 目标对象上不存在的属性
* 属性名为 Symbol 值
* 不可遍历（enumerable）的属性
:::

```js
let target = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
});

let handler = {
    ownKeys(target) {
        return ['a', 'd', Symbol.for('secret'), 'key'];
    }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']
// ownKeys()方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。
```

> ownKeys()方法还可以拦截Object.getOwnPropertyNames()。

```js
var p = new Proxy({}, {
    ownKeys: function(target) {
        return ['a', 'b', 'c'];
    }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]
```

> for...in循环也受到ownKeys()方法的拦截。

```js
const obj = {
    hello: 'world'
};
const proxy = new Proxy(obj, {
    ownKeys: function() {
        return ['a', 'b'];
    }
});

for (let key in proxy) {
    console.log(key); // 没有任何输出
}
```

::: warning
`ownKeys()` 方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

```js
var obj = {};

var p = new Proxy(obj, {
    ownKeys: function(target) {
        return [123, true, undefined, null, {},
            []
        ];
    }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name
```

:::
如果目标对象自身包含不可配置的属性，则该属性必须被 `ownKeys()` 方法返回，否则报错。

```js
var obj = {};
Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 10
});

var p = new Proxy(obj, {
    ownKeys: function(target) {
        return ['b'];
    }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'

// obj对象是不可扩展的，这时ownKeys()方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。
```

### `preventExtensions()`

> `preventExtensions()` 方法拦截 `Object.preventExtensions()` 。该方法必须返回一个布尔值，否则会被自动转为布尔值。

这个方法有一个限制，只有目标对象不可扩展时（即 `Object.isExtensible(proxy)` 为false）， `proxy.preventExtensions` 才能返回true，否则会报错。

```js
var proxy = new Proxy({}, {
    preventExtensions: function(target) {
        return true;
    }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
```

### `setPrototypeOf()`

> setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。

```js
var handler = {
    setPrototypeOf(target, proto) {
        throw new Error('Changing the prototype is forbidden');
    }
};
var proto = {};
var target = function() {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

## `Proxy.revocable()`

> `Proxy.revocable()` 方法返回一个可取消的 Proxy 实例。

```js
let target = {};
let handler = {};

let {
    proxy,
    revoke
} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

`Proxy.revocable()` 方法返回一个对象，该对象的 `proxy` 属性是 `Proxy` 实例， `revoke` 属性是一个函数，可以取消 `Proxy` 实例。上面代码中，当执行 `revoke` 函数之后，再访问 `Proxy` 实例，就会抛出一个错误。

`Proxy.revocable()` 的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## `this` 问题 

> 虽然 `Proxy` 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 `Proxy` 代理的情况下，目标对象内部的 `this` 关键字会指向 `Proxy` 代理。

```js
const target = {
    m: function() {
        console.log(this === proxy);
    }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m() // true

const target = new Date('2015-01-01');
const handler = {
    get(target, prop) {
        if (prop === 'getDate') {
            return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
    }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```
