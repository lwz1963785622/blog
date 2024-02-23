# async函数
## 什么是async函数
>async函数就是 Generator 函数的语法糖，对比Generator函数和async来看




```js
//Generator函数依次读取两个文件
var fs = require('fs');
var readFile = function (fileName){
 return new Promise(function (resolve, reject){
  fs.readFile(fileName, function(error, data){
   if (error) reject(error);
   resolve(data);
  });
 });
};
var gen = function* (){
 var f1 = yield readFile('/etc/fstab');
 var f2 = yield readFile('/etc/shells');
 console.log(f1.toString());
 console.log(f2.toString());
};

//把它改写成async函数
var asyncReadFile = async function (){
 var f1 = await readFile('/etc/fstab');
 var f2 = await readFile('/etc/shells');
 console.log(f1.toString());
 console.log(f2.toString());
};
```
async 函数就是将 Generator 函数的星号（`*`）替换成 async，将 yield 替换成 await，仅此而已。

## async函数对比generator的优点
1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
2. 更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. 更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
4. 返回值是 Promise。async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。用then方法指定下一步的操作。

## async 函数的用法
>async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

```js
function timeout(ms) {
 return new Promise((resolve) => {
  setTimeout(resolve, ms);
 });
}
async function asyncPrint(value, ms) {
  await console.log(1111111);
  await timeout(ms);
  await console.log(2222222);
  console.log(value)
}
asyncPrint('hello world', 50);
```

### async函数的多种使用方法
```js
// 函数声明
async function foo() {}
// 函数表达式
const foo = async function () {};
// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)
// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage();
storage.getAvatar('jake').then(…);
// 箭头函数
const foo = async () => {};
```

## async函数使用注意
1. await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
```js
async function myFunction() {
 try {
  await somethingThatReturnsAPromise();
 } catch (err) {
  console.log(err);
 }
}
// 另一种写法
async function myFunction() {
 await somethingThatReturnsAPromise().catch(function (err){
  console.log(err);
 });
}
```
2. await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
3. 两个相互不依赖的异步操作同时触发

```js
let foo = await getFoo();
let bar = await getBar();

//让getFoo和getBar同时触发
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## async函数实现的原理
async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。
```js
async function fn(args){
 // ...
}
// 等同于
function fn(args){
 return spawn(function*() {
  // ...
 });
}
```
所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。<br/>
下面给出 spawn 函数的实现，基本就是前文自动执行器的翻版。
```js
function spawn(genF) {
 return new Promise(function(resolve, reject) {
  var gen = genF();
  function step(nextF) {
   try {
    var next = nextF();
   } catch(e) {
    return reject(e);
   }
   if(next.done) {
    return resolve(next.value);
   }
   Promise.resolve(next.value).then(function(v) {
    step(function() { return gen.next(v); });   
   }, function(e) {
    step(function() { return gen.throw(e); });
   });
  }
  step(function() { return gen.next(undefined); });
 });
}
```
async 函数是非常新的语法功能，新到都不属于 ES6，而是属于 ES7。目前，它仍处于提案阶段，但是转码器 Babel 和 regenerator 都已经支持，转码后就能使用。

