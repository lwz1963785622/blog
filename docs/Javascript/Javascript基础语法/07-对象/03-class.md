# class（类）
>ES6引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。类在大部分功能其实可以通过ES6之前的语法实现。




## 类的定义       
ES6 的类，完全可以看作构造函数的另一种写法。
```js
class People {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
  //属性放在constructor方法中
  toString() {
    return this.name+'今年'+this.age;
  }
}
typeof People   //function
```

* constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

  ```javascript
  class Foo {
    constructor() {
      return Object.create(null);
    }
  }

  console.log(new Foo() instanceof Foo)  // false
  ```

* 类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

  ```javascript
  class Foo {
    constructor() {
      return Object.create(null);
    }
  }

  Foo()  //报错： Class constructor Foo cannot be invoked without 'new'
  ```

* 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

  ```javascript
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }

  var point = new Point(2, 3);
  point.toString()                 // (2, 3)
  point.hasOwnProperty('x')        // true
  point.hasOwnProperty('y')        // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```

* 不存在变量提升：ES6不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

  ```javascript
  new Foo(); // ReferenceError
  class Foo {}
  ```

* Class表达式
  * 与函数一样，类也可以使用表达式的形式定义。

    ```javascript
    const MyClass = class Me {
      getClassName() {
        return Me.name;
      }
    };
    //这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类
    ```

  * 采用Class表达式，可以写出立即执行的Class。

    ```javascript
    let person = new class {
      constructor(name) {
        this.name = name;
      }
      sayName() {
        console.log(this.name);
      }
    }('张三');

    console.log(person.sayName()); // "张三"  undefined
    ```

* 静态方法
     * 静态方法只有类本身和他的子类可以调用，实例化的对象不可以调用
```js
class P{
	static pF(){
		console.log('父类静态方法');
	}
}
class C extends P{
}
var p1=new P();
P.pF();              //父类静态方法
C.pF();               //父类静态方法
p1.pF();             //p1.pF is not a function
```
静态方法可以直接通过类调用，不要要生成实例，它的主要作用方便我们使用(Math对象上的方法)

* 私有方法     
      * 私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。<br/>使用symbol设置
```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
 // ...
};
```
 bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。<br/>





## Class的继承

### 基本用法

* Class之间可以通过extends关键字实现继承

  ```javascript
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
    }
    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }
  ```

* 类的 prototype 属性和 \__proto__ 属性
>每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。<br/>
 * 子类的__proto__属性，表示构造函数的继承，总是指向父类。<br/>
 * 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

  ```javascript
  class A {
  }
  class B extends A {
  }
  B.__proto__ === A // true
  B.prototype.__proto__ === A.prototype // true
  ```

* Extends 的继承目标
>extends关键字后面可以跟多种类型的值。

  ```javascript
  class B extends A {

  }
  ```
  >上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

  下面我们叙述三种特殊情况：
  * 第一种特殊情况，子类继承Object类。

   ```javascript
    class A extends Object {

    }
    A.__proto__ === Object // true
    A.prototype.__proto__ === Object.prototype // true
    ```
    这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

  * 第二种特殊情况，不存在任何继承。

    ```javascript
    class A {

    }
    A.__proto__ === Function.prototype // true
    A.prototype.__proto__ === Object.prototype // true
    ```
    这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回一个空对象（即Object实例），所以A.prototype.\__proto__指向构造函数（Object）的prototype属性。

  * 第三种特殊情况，子类继承null。

    ```javascript
    class A extends null {

    }
    A.\__proto__ === Function.prototype // true
    A.prototype.\__proto__ === undefined // true
    ```
    这种情况与第二种情况非常像。A也是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype，即实质上执行了下面的代码。

    ```javascript
    class C extends null {
        constructor() { return Object.create(null); }
    }
    ```
