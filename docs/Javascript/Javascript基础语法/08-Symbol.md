# Symbol <Badge text="ES6" type="warning"/>
>ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。Symbol值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

## Symbol函数的参数
>Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s3 = Symbol('fun');
var s4 = Symbol('fun');
s3 === s4                // false
```


## 作为属性名的Symbol
>每一个Symbol值都是不相等的，所以Symbol值可以作为标识符。      
当用于对象的属性名时，可以保证不会出现同名的属性，防止某一个键被不小心改写或覆盖。    
对象属性名是Symbol值时，不能用点运算符。

```js
var mySymbol1 = Symbol()
var mySymbol2 = Symbol()
var mySymbol3 = Symbol()
var a = {}
a[mySymbol1] = 'hello!';
var b = {
   [mySymbol2]:'hello!'
}
var c = {};
Object.defineProperty(c, mySymbol3, { value: 'hello!'});
console.log(a[mySymbol1]);                 //hello！
console.log(b[mySymbol2]);                 //hello！
console.log(c[mySymbol3]);                 //hello！


var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol]                              // undefined
a['mySymbol']                            // "Hello!"
```

### Symbol最为属性名遍历
1. 使用Symbol作为属性名时，该属性将不会被 for...in 遍历,不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
2. 使用 Symbol 作为属性名时，该属性可以通过 Object.getOwnPropertySymbols() 方法获取。
3. 使用 Symbol 作为属性名时，该属性不是私有属性。

## Symbol的方法
### Symbol.for()
>有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。               
Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

```js
var foo = Symbol('foo');
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

console.log(foo);                      //Symbol(foo)
console.log(typeof foo);               //symbol
console.log(s1);                        //Symbol(foo)
console.log(typeof s1);              //symbol
console.log(s2);                     //Symbol(foo)
console.log(typeof s2);             //symbol
console.log(foo === s1);            // false
console.log(s1 === s2);             //true
```



### Symbol.keyFor()
>Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

```js
var s1 = Symbol.for("foo");
Symbol.keyFor(s1)     // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2)     // undefined
```

## Symbol的应用场景
1. 在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用Symbol进行保护。
2. 解决属性名的冲突,因为传入对象属性时,同样的Symbol不相等;    
解释:什么是冲突呢？当多人合作编码的时候，经常会出现你往对象上加了一个某某属性（比如 $ ），他人正好也想到了这个名称，当你们同时用了这个名称作为属性，代码之间就会发生冲突，互相覆盖。而用 symbol，即使都用了相同的描述，也不是同一个 symbol。
3. Symbol值不能与其他类型的值进行运算，会报错。    
