# JavaScript设计模式

## 什么是设计模式?

模式是一种可复用的解决方案，可用于解决项目中遇到的常见问题，将解决问题的方法制作成模板，并且这些模板可应用于多种不同的情况。如在编写的JavaScript应用程序的实例中，同类型问题共用一种解决方法。          
所有设计模式都有一个共同的目的，那就是让编程更加模块化，系统化，明确化。
在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。

## 为什么使用设计模式

1. 使用已经验证的解决方案，可以快速可靠解决项目开发中遇到的问题
2. 复用代码，使代码更加简洁

## 设计模式的六大原则

总原则－开闭原则

对扩展开放，对修改封闭。 在程序需要进行拓展的时候，不能去修改原有的代码，而是要扩展原有代码，实现一个热插拔的效果。所以一句话概括就是：为了使程序的扩展性好，易于维护和升级。 想要达到这样的效果，我们需要使用接口和抽象类等。

1. 单一职责原则 不要存在多于一个导致类变更的原因，也就是说每个类应该实现单一的职责，否则就应该把类拆分。

2. 里氏替换原则（Liskov Substitution Principle） 任何基类可以出现的地方，子类一定可以出现。里氏替换原则是继承复用的基石，只有当衍生类可以替换基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。 里氏代换原则是对“开-闭”原则的补充。实现“开闭”原则的关键步骤就是抽象化。而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。里氏替换原则中，子类对父类的方法尽量不要重写和重载。因为父类代表了定义好的结构，通过这个规范的接口与外界交互，子类不应该随便破坏它。

3. 依赖倒转原则（Dependence Inversion Principle） 面向接口编程，依赖于抽象而不依赖于具体。写代码时用到具体类时，不与具体类交互，而与具体类的上层接口交互。

4. 接口隔离原则（Interface Segregation Principle） 每个接口中不存在子类用不到却必须实现的方法，如果不然，就要将接口拆分。使用多个隔离的接口，比使用单个接口（多个接口方法集合到一个的接口）要好。

5. 迪米特法则（最少知道原则）（Demeter Principle） 一个类对自己依赖的类知道的越少越好。无论被依赖的类多么复杂，都应该将逻辑封装在方法的内部，通过public方法提供给外部。这样当被依赖的类变化时，才能最小的影响该类。 最少知道原则的另一个表达方式是：只与直接的朋友通信。类之间只要有耦合关系，就叫朋友关系。耦合分为依赖、关联、聚合、组合等。我们称出现为成员变量、方法参数、方法返回值中的类为直接朋友。局部变量、临时变量则不是直接的朋友。我们要求陌生的类不要作为局部变量出现在类中。

6. 合成复用原则（Composite Reuse Principle） 尽量首先使用合成/聚合的方式，而不是使用继承。

## 单体模式(单例模式)

`单体模式` 就是保证一个类仅有一个实例，例如浏览器中的window对象。实际上，在事项对象的字面量创建对象时，就是正在创建一个单体。                                         
单体模式（Singleton Pattern）就是确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例。                 

### 简单案例

> 单例模式的实现是一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

```js
var Single = (function() {
    var instance;

    function init() {
        //define private methods and properties
        //do something
        return {
            //define public methods and properties
        };
    }

    return {
        // 获取实例
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

var obj1 = Single.getInstance();
var obj2 = Single.getInstance();

console.log(obj1 === obj2); //true
```

### 适用场合

* 在 JavaScript开发中，单体模式的用途同样非常广泛。试想一下，当单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单体模式来创建。                       
* 要求生成唯一序列号的环境                    
* 整个项目需要一个共享访问点或共享数据                      
* 创建一个对象消耗资源过多

## 工厂模式

工厂模式是用来创建对象的一种最常用的设计模式。不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。          
工厂模式分为三种：简单工厂模式、工厂方法模式、抽象工厂模式

### 简单工程模式

简单工厂模式又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。对于非大型的前端应用来说，灵活使用简单工厂其实就能解决大部分问题。            

简单工厂只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用。

```js
//User类
class User {
    //构造器
    constructor(opt) {
        this.name = opt.name;
        this.viewPage = opt.viewPage;
    }

    //静态方法
    static getInstance(role) {
        switch (role) {
            case 'superAdmin':
                return new User({
                    name: '超级管理员',
                    viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理']
                });
                break;
            case 'admin':
                return new User({
                    name: '管理员',
                    viewPage: ['首页', '通讯录', '发现页', '应用数据']
                });
                break;
            case 'user':
                return new User({
                    name: '普通用户',
                    viewPage: ['首页', '通讯录', '发现页']
                });
                break;
            default:
                throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        }
    }
}
//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
console.log(superAdmin);
console.log(admin);
console.log(normalUser);
```

### 工厂方法模式

与简单工厂模式相比，主要区别就是它不是另外使用一个对象或者类来创建实例，而是使用一个子类。工厂是一个将其成员对象的实例化推迟到子类中进行的类。                  

```js
class User {
    constructor(name = '', viewPage = []) {
        //new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined。
        if (new.target === User) {
            throw new Error('抽象类不能实例化!');
        }
        this.name = name;
        this.viewPage = viewPage;
    }
}
class UserFactory extends User {
    constructor(name, viewPage) {
        super(name, viewPage)
    }
    create(role) {
        switch (role) {
            case 'superAdmin':
                return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
                break;
            case 'admin':
                return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
                break;
            case 'user':
                return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
                break;
            default:
                throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        }
    }
}
let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');
```

### 抽象工厂模式

抽象工厂模式并不直接生成实例，而是用于对产品类簇的创建, 不负责创建某一类产品的实例。

```js
class User {
    constructor(type) {
        if (new.target === User) {
            throw new Error('抽象类不能实例化!')
        }
        this.type = type;
    }
}

class UserOfWechat extends User {
    constructor(name) {
        super('wechat');
        this.name = name;
        this.viewPage = ['首页', '通讯录', '发现页']
    }
}

class UserOfQq extends User {
    constructor(name) {
        super('qq');
        this.name = name;
        this.viewPage = ['首页', '通讯录', '发现页']
    }
}

class UserOfWeibo extends User {
    constructor(name) {
        super('weibo');
        this.name = name;
        this.viewPage = ['首页', '通讯录', '发现页']
    }
}

function getAbstractUserFactory(type) {
    switch (type) {
        case 'weixin':
            return UserOfWechat;
            break;
        case 'qq':
            return UserOfQq;
            break;
        case 'weibo':
            return UserOfWeibo;
            break;
        default:
            throw new Error('参数错误, 可选参数:weixin  qq  weibo')
    }
}
let WechatUserClass = getAbstractUserFactory('weixin');
let QqUserClass = getAbstractUserFactory('qq');
let WeiboUserClass = getAbstractUserFactory('weibo');

let wechatUser = new WechatUserClass('微信小孙');
let qqUser = new QqUserClass('QQ老马');
let weiboUser = new WeiboUserClass('微博小李');
console.log(wechatUser)
console.log(qqUser)
console.log(weiboUser)
```

### 使用场合

* 创建一些用不同方式实现统一接口的对象，那么可以使用一个工厂方法或者简单工厂对象来简化实现过程。
* 对象要进行复杂的并且彼此相关的设置的时候，那么工厂模式可以很显著的减少每种对象的代码量。将特定的设置代码提取出来会使得代码有极大地提升。并且能优化结构便于维护。
* 许多小型对象组成一个大对象

## 迭代器模式

提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。javascript内置了迭代器==>JavaScript 的 `Array.prototype.forEach`

### 内部迭代器

已经定义好了迭代规则，它完全接手整个迭代过程，外部只需一次初始调用。

#### jQuery中的迭代器

```js
$.each([1, 2, 3], function(i, n) {
    console.log("当前下标为：" + i + " 当前元素为：" + n);
});
```

#### 原生javascript实现

```js
var each = function(ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i]);
    }
};
each([1, 2, 3], function(i, n) {
    console.log("当前下标为：" + i + " 当前元素为：" + n);
});
```

### 外部迭代器

必须显式地请求迭代下一个元素。
外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代
器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。

```js
// 外部迭代器
var Iterator = function(obj) {
    var current = 0,
        next = function() {
            current++;
        },
        isDone = function() {
            return current > obj.length;
        },
        getCurrentItem = function() {
            return obj[current];
        };
    return {
        next: next,
        isDone: isDone,
        getCurrentItem: getCurrentItem
    };
};
// 比较函数
var compareAry = function(iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) { //判断两个数组是否为最后一位
        if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            throw new Error("不相等");
        }
        iterator1.next(); //比较数组的下一个
        iterator2.next(); //比较数组的下一个
    }
    console.log("相等");
}
compareAry(new Iterator([1, 2, 3]), new Iterator([1, 2, 3]));
```

### 倒序迭代器

```js
var reverseEach = function(ary, callback) {
    for (var l = ary.length - 1; l >= 0; l--) {
        callback(l, ary[l]);
    }
};
reverseEach([0, 1, 2], function(i, n) {
    console.log(n); // 分别输出：2, 1 ,0 
});
```

### 中止迭代器

> 迭代器可以像普通 for 循环中的 break 一样，提供一种跳出循环的方法 

### 使用场合

对于集合内部结果常常变化各异，我们不想暴露其内部结构的话，但又响让客户代码透明底访问其中的元素，这种情况下我们可以使用迭代器模式。

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前的绝大部分语言都内置了迭代器。

## 命令模式

命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些
特定事情的指令。

### 适用场景

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系

### 简单案例

> 命令模式的由来，其实是回调（callback）函数的一个面向对象的替代品。

```js
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    }
};
var MenuBar = {
    refresh: function() {
        console.log('刷新菜单目录');
    }
};
var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
};
var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
};
var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};
var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function() {
    console.log('删除子菜单');
};

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);
```

> 使用闭包也能实现

```js
var setCommand = function(button, func) {
    button.onclick = function() {
        func();
    }
};
var MenuBar = {
    refresh: function() {
        console.log('刷新菜单界面');
    }
};
var RefreshMenuBarCommand = function(receiver) {
    return function() {
        receiver.refresh();
    }
};
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);
```

## 组合模式

将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。                         
组合模式主要有三个角色：
1. 抽象组件（Component）：抽象类，主要定义了参与组合的对象的公共接口
2. 子对象（Leaf）：组成组合对象的最基本对象
3. 组合对象（Composite）：由子对象组合起来的复杂对象

### 经典案例

假设我们开发一个旅游产品网站，其中包含机票和酒店两种子产品，我们定义了子对象如下：

```js
function FlightOrder() {}
FlightOrder.prototype.create = function() {
    console.log("flight order created");
}

function HotelOrder() {}
HotelOrder.prototype.create = function() {
    console.log("hotel order created");
}
```

上面的代码定义了两个类：机票订单类和酒店订单类，每个类都有各自的订单创建方法。               
接下来我们创建一个总订单类：

```js
function TotalOrders() {
    this.orderList = [];
}
TotalOrders.prototype.addOrder = function(order) {
    this.orderList.push(order);
}
TotalOrders.prototype.create = function(order) {
    for (var i = 0, length = this.orderList.length; i < length; i++) {
        this.orderList[i].create();
    }
}
```

这个对象主要有3个成员：订单列表，添加订单的方法，创建订单的方法。                 
在客户端使用的时候如下：    

```js
var flight = new FlightOrder();
flight.create();

var orders = new TotalOrders();
orders.addOrder(new FlightOrder());
orders.addOrder(new HotelOrder());
orders.create();
```

客户端调用展示了两种方式，一种是单一的创建机票订单，一种是创建多张订单，但最终都是通过create方法进行创建，这就是一个很典型的组合模式的应用场景。    

### 使用场景

1. 想表示对象的部分-整体层次结构时.组合模式可以方便地构造一棵树来表示对象的部分整
                    体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最
                    终完成之后，只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模
                    式中增加和删除树的节点非常方便，并且符合开放封闭原则。

2. 希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象（方法）
3. 对象具有明显的层次结构并且想要统一地使用它们，这就非常适合使用组合模式。

### 缺点

> 组合模式并不是完美的，它可能会产生一个这样的系统：系统中的每个对象看起来都

  与其他对象差不多。它们的区别只有在运行的时候会才会显现出来，这会使代码难以理解。此外，
  如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起。

## 模板方法模式

> 模板方法模式是一种只需使用继承就可以实现的非常简单的模式。

### 组成部分

* 抽象父类
* 具体的实现子类

> 在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺

  序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

### 使用场景例子

> 比如我们在构建一系列的 UI 组件，这些组件的构建过程一般如下所示：

* (1) 初始化一个 div 容器；
* (2) 通过 ajax 请求拉取相应的数据；
* (3) 把数据渲染到 div 容器里面，完成组件的构造；
* (4) 通知用户组件渲染完毕。

我们看到，任何组件的构建都遵循上面的 4 步，其中第(1)步和第(4)步是相同的。第(2)步不
同的地方只是请求 ajax 的远程地址，第(3)步不同的地方是渲染数据的方式。

于是我们可以把这 4 个步骤都抽象到父类的模板方法里面，父类中还可以顺便提供第(1)步和
第(4)步的具体实现。当子类继承这个父类之后，会重写模板方法里面的第(2)步和第(3)步

### 好莱坞原则

> 好莱坞无疑是演员的天堂，但好莱坞也有很多找不到工作的新人演员，许多新人演员在好莱

坞把简历递给演艺公司之后就只有回家等待电话。有时候该演员等得不耐烦了，给演艺公司打电
话询问情况，演艺公司往往这样回答：“不要来找我，我会给你打电话。”

### 除此之外，好莱坞原则还常常应用于其他模式和场景，例如发布订阅模式和回调函数。

#### 发布—订阅模式

> 在发布—订阅模式中，发布者会把消息推送给订阅者，这取代了原先不断去 fetch 消息的形式。

#### 回调函数

> 在 ajax 异步请求中，由于不知道请求返回的具体时间，而通过轮询去判断是否返回数据，这

显然是不理智的行为。所以我们通常会把接下来的操作放在回调函数中，传入发起 ajax 异步请求
的函数。当数据返回之后，这个回调函数才被执行，这也是好莱坞原则的一种体现。把需要执行
的操作封装在回调函数里，然后把主动权交给另外一个函数。至于回调函数什么时候被执行，则
是另外一个函数控制的。

### 总结

模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语
言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把
这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这
部分变化的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并不需要改
动抽象父类以及其他子类，这也是符合开放封闭原则的。
::: tip
高阶函数是更好的选择
:::

## 享元模式

> 享元（flyweight）模式是一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量

级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

### 内部状态与外部状态

> 享元模式要求将对象的属性划分为内部状态与外部

状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量.
* 内部状态存储于对象内部。
* 内部状态可以被一些对象共享。
* 内部状态独立于具体的场景，通常不会改变。
* 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
这样一来，我们便可以把所有内部状态相同的对象都指定为同一个共享的对象。而外部状态
可以从对象身上剥离出来，并储存在外部。
:::tip
剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组装成一个完整
的对象。虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系
统中的对象数量，相比之下，这点时间或许是微不足道的。因此，享元模式是一种用时间换空间
的优化模式。
:::

### 区分内部状态与外部状态

> 可以被对象共享的属性通常被划分为内部状态
> 而外部状态取决于具体的场景，并根据场景而变化，它们不能被一些对象共享，因此只能被划分为外部状态。

### 例子（享元模式文件上传）

需求：封装多种类型上传文件。多种类型的方法不同。

分析：不同类型的上传根据 `uploadType` 值得不同，分别来自两个不同的对象。

     一旦明确了 `uploadType` ，无论我们使用什么方式上传，这个上传对象都是可以被任何文件共

用的。而 `fileName` 和 `fileSize` 是根据场景而变化的，每个文件的 `fileName` 和 `fileSize` 都不一样，
`fileName` 和 `fileSize` 没有办法被共享，它们只能被划分为外部状态。

实现：

```js
// Upload 构造函数中只保留 uploadType 参数：
var Upload = function(uploadType) {
    this.uploadType = uploadType;
};
Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this); // (1) 
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};
// 工厂进行对象实例化
var UploadFactory = (function() {
    var createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();

// 管理器封装外部状态

// 它负责向 UploadFactory 提交创建对象的请求，
// 并用一个 uploadDatabase 对象保存所有 upload 对象的外部状态，以便在程序运行过程中给
// upload 共享对象设置外部状态，代码如下：
var uploadManager = (function() {
    var uploadDatabase = {};
    return {
        add: function(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement('div');
            dom.innerHTML =
                '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' +
                '<button class="delFile">删除</button>';
            dom.querySelector('.delFile').onclick = function() {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return flyWeightObj;
        },
        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();
```

### 享元模式的适用性

> 享元模式带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时

便可以使用享元模式。
* 一个程序中使用了大量的相似对象。
* 由于使用了大量对象，造成很大的内存开销。
* 对象的大多数状态都可以变为外部状态。
* 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。
可以看到，文件上传的例子完全符合这四点。

### 对象池

> 对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。如

果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入
池子等待被下次获取。

### 小结

享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因都不一样。在一个存在
大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题。

## 职责链模式

> 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

### 现实中的职责链模式

> 如果早高峰能顺利挤上公交车的话，那么估计这一天都会过得很开心。因为公交车上人

  实在太多了，经常上车后却找不到售票员在哪，所以只好把两块钱硬币往前面递。除非
  你运气够好，站在你前面的第一个人就是售票员，否则，你的硬币通常要在 N 个人手上
  传递，才能最终到达售票员的手里。

> 中学时代的期末考试，如果你平时不太老实，考试时就会被安排在第一个位置。遇到不

  会答的题目，就把题目编号写在小纸条上往后传递，坐在后面的同学如果也不会答，他
  就会把这张小纸条继续递给他后面的人。

>

![image-20200606203315597](/img/javascript/Snipaste_2022-02-23_10-13-09.png)

### 开发中的职责链模式

#### 开发需求

* 一个售卖手机的电商网站，经过分别交纳 500 元定金和 200 元定金的两轮预定后（订单已在此时生成），现在已经到了正式购买的阶段
* 支付过 500 元 100优惠价 下单后库存不判断
* 支付过 200 元 50优惠价  下单后库存不判断
* 支付   0元    没有优惠价 库存为0不可购买

#### 完成逻辑

* orderType：表示订单类型（定金用户或者普通购买用户），code 的值为 1 的时候是 500 元
定金用户，为 2 的时候是 200 元定金用户，为 3 的时候是普通购买用户。
* pay：表示用户是否已经支付定金，值为 true 或者 false, 虽然用户已经下过 500 元定金的
订单，但如果他一直没有支付定金，现在只能降级进入普通购买模式。
* stock：表示当前用于普通购买的手机库存数量，已经支付过 500 元或者 200 元定金的用
户不受此限制。

缺点：不易读 不易修改

```js
var order = function(orderType, pay, stock) {
    if (orderType === 1) { // 500 元定金购买模式
        if (pay === true) { // 已支付定金
            console.log('500 元定金预购, 得到 100 优惠券');
        } else { // 未支付定金，降级到普通购买模式
            if (stock > 0) { // 用于普通购买的手机还有库存
                console.log('普通购买, 无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 2) { // 200 元定金购买模式
        if (pay === true) {
            console.log('200 元定金预购, 得到 50 优惠券');
        } else {
            if (stock > 0) {
                console.log('普通购买, 无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通购买, 无优惠券');
        } else {
            console.log('手机库存不足');
        }
    }
};
order(1, true, 500); // 输出： 500 元定金预购, 得到 100 优惠券
```

职责链模式重构代码

```js
// 定义三种购买的模式
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购，得到 100 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200 元定金预购，得到 50 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
};
// 把函数包装进职责链节点，我们定义一个构造函数 Chain，在 new Chain 的时候传
// 递的参数即为需要被包装的函数，同时它还拥有一个实例属性 this.successor，表示在链中的下
// 一个节点

// Chain 的 prototype 中还有两个函数
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
};

// 现在我们把 3 个订单函数分别包装成职责链的节点：
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
// 然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
// 最后把请求传递给第一个节点：
chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足
```

### 异步的职责链

> 每个节点函数同步返回一个特定的值"nextSuccessor"，来表示是否把请求传递给下一个节点。而在现实开发中，我们经常会遇到一些异步的问题，比如我们要在节点函数中发起一个 ajax异步请求，异步请求返回的结果才能决定是否继续在职责链中 passRequest。

```js
// 给 Chain 类再增加一个原型方法 Chain.prototype.next， 表示手动传递请求给职责链中的下一个节点：

Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});
var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {
        self.next();
    }, 1000);
});
var fn3 = new Chain(function() {
    console.log(3);
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
```

### 用 AOP 实现职责链

```js
Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var ret = self.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
};
var order = order500yuan.after(order200yuan).after(orderNormal);
order(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
order(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
order(1, false, 500); // 输出：普通购买，无优惠券
// 用 AOP 来实现职责链既简单又巧妙， 但这种把函数叠在一起的方式， 同时也叠加了函数的
// 作用域， 如果链条太长的话， 也会对性能有较大的影响。
```

## 中介者模式

对象之间相互不直接“沟通”，通过一个中介者对这些对象进行通信，从而形成松散耦合。                                      
中介者模式可以让多个对象之间松耦合，并降低维护成本       

中介者模式理解起来十分简单，就像我们生活中去中介租房子，我们租客不关心这是谁的房子，房东不关心他的房子出租给了谁，中介人在租房者和房东出租者之间形成一个中介。这就是中介模式，很简单的理解。       

MVC三层模型实体模型（Model）、视图表现层（View）还有控制层（Control/Mediator）。控制层便是位于表现层与模型层之间的中介者。笼统地说MVC也算是中介者模式在框架设计中的一个应用。

![image-20200606203315597](/img/javascript/Snipaste_2022-02-24_14-40-13.png)

### 适用场景

一组定义良好的对象，现在要进行复杂的通信。

定制一个分布在多个类中的行为，而又不想生成太多的子类。

可以看出，中介对象主要是用来封装行为的，行为的参与者就是那些对象，但是通过中介者，这些对象不用相互知道。               

### 中介模式的优缺点

#### 优点

* 降低了系统对象之间的耦合性，使得对象易于独立的被复用。
* 提高系统的灵活性，使得系统易于扩展和维护。

#### 缺点

过度集中化，如果同事对象的交互非常多，而且比较复杂，当这些复杂性全部集中到中介者的时候，会导致中介者对象变得十分复杂，而且难于管理和维护。

### 简单案例

飞机场飞机与飞机之间彼此的交流，以调度中心为中介。

```js
//飞机对象的构造函数
var feiji = function(name) {
    this.name = name;
}
feiji.prototype.send = function(msg, to) {
    console.log(this.name + "发送了信息");
    diaodu.send(msg, to);
}
feiji.prototype.jieshou = function(msg) {
    console.log(this.name + "接受到" + msg);
}
//调度中心对象
var diaodu = {
    //将飞机对象通过zhuce函数添加到all对象里
    all: {},
    zhuce: function(feiji) {
        this.all[feiji.name] = feiji;
    },
    send: function(msg, to) {
        this.all[to.name].jieshou(msg);
    }
}
var feiji1 = new feiji('feiji1');
var feiji2 = new feiji('feiji2');
diaodu.zhuce(feiji1);
diaodu.zhuce(feiji2);
feiji1.send("我马上降落，还有200米", feiji2);
```

## 装饰者模式

给对象动态添加职责的方式就是装饰者模式，能够在不改变原对象的情况下，在运行的时候给对象添加新的职责。                   

天气冷了，就添加衣服来保暖；天气热了，就将外套脱下；这个例子很形象地含盖了装饰器的神韵，随着天气的冷暖变化，衣服可以动态的穿上脱下。     

给对象添加功能常常使用继承的方式，但是继承的方式并不灵活，还会带来许多问题：一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之
改变    

### 使用

开发一个射击游戏，随着时间进行，会吃到道具，火力就越来越强，吃一颗星，不仅可以发普通子弹，还会发射散弹，再吃一颗，不仅可以发射普通子弹和散弹，还有跟踪导弹

```js
var plane = {
    fire: function() {
        console.log('发射子弹');
    }
}
plane.fire();
//发射子弹
var fire1 = plane.fire;
var shot = function() {
    console.log('发射散弹');
}
plane.fire = function() {
    fire1();
    shot();
}
plane.fire();
//发射子弹 发射散弹
var fire2 = plane.fire;
var track = function() {
    console.log('发射跟踪导弹');
}
plane.fire = function() {
    fire2();
    track();
}
plane.fire();
//发射子弹 发射散弹 发射跟踪导弹
```

给对象动态的增加职责的方式就没有改变对象自身, 一个对象放入另一个对象, 形成了一条装饰链（一个聚合对象），而上面的shot和track也就是是装饰者、装饰函数，当函数执行时，会把请求转给链中的下一个对象

![image-20200606203315597](/img/javascript/Snipaste_2022-02-25_15-09-45.png)

### AOP(面向切面编程)装饰函数

把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式参入业务逻辑模块中。                     
AOP好处
* 保证业务逻辑模块的纯净和高内聚性
* 方便复用日志统计等功能模块

#### JS实现AOP思路：把一个函数“动态织入”到另一个函数之中。我们使用Function.prototype来实现

```js
Function.prototype.before = function(beforefn) {
    var _self = this; //保存原函数引用
    return function() {
        beforefn.apply(this, arguments); //执行新函数，修正this
        return _self.apply(this, arguments); //执行原函数
    }
};

Function.prototype.after = function(afterfn) {
    var _self = this;
    return function() {
        var ret = _self.apply(this, arguments); //不要直接写在return中
        afterfn.apply(this, arguments);
        return ret;
    }
}

// 把当前的 this 保存起来，这个 this 指向原函数，然后返回一个“代理”函数，这个
// “代理”函数只是结构上像代理而已，并不承担代理的职责（比如控制对象的访问等）。它的工作
// 是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原
// 函数之前执行（前置装饰），这样就实现了动态装饰的效果
var func = function() {
    console.log("2")
}

func = func.before(function() {
    console.log("1");
}).after(function() {
    console.log("3");
});

func(); //1 2 3
```

把负责打印1和打印3的两个函数通过AOP方式动态插入func函数。通过执行上述函数，控制台一次输出1 2 3。

### 缺点

* 装饰链叠加了函数作用域，如果过长也会产生性能问题
* 如果原函数上保存了属性，返回新函数后属性会丢失

### 使用场景

* 扩展一个类的功能
* 动态增加功能，动态撤销。

## 策略模式(算法簇模式)        

定义了不同的算法，并且之间可以互相替换，此模式让算法的变化独立于使用算法的客户。             

策略模式的重心不是如何实现算法，而是如何组织、调用这些算法，从而让程序结构更灵活，具有更好的维护性和扩展性。     

> 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

### 简单案例

```js
/*
示例：公司计算奖金，分A、B、C 三种绩效，计算方式如下
 * 绩效为A，奖金乘以5
 * 绩效为B，奖金乘以4
 * 绩效为C，奖金乘以3
*/
var Strategies = {
    "A": function(salary) {
        return salary * 5;
    },
    "B": function(salary) {
        return salary * 4;
    },
    "C": function(salary) {
        return salary * 3;
    }
};
var caculateBonus = function(level, salary) {
    return Strategies[level](salary);
};
console.log(caculateBonus("A", 2000));
```

### 策略模式优缺点

#### 优点

* 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句           
* 策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的对象中，使得它们易于切换，易于理解，易于扩展
* 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作

#### 缺点

* 会在程序中增加许多策略类或者策略对象
* 使用策略模式，必须了解所有的策略，才能更好的选择一个合适的策略

## 代理模式

一个对象充当另一个对象(本体对象)的接口，所有对本体对象的操作都依靠这个接口对象执行。             
举个例子来描述，你想要给你一个女孩子送花，你又不好意思，于是便委托你朋友帮你送，这时就使用了代理模式

### 虚拟代理

把一些开销很大的对象，延迟到真正需要用到这个对象的时候才去创建                   

#### 虚拟代理图片预加载

```js
var addImg = (function() {
    var img = document.createElement('img');
    document.body.appendChild(img);
    return {
        setSrc: function(src) {
            img.src = src;
        }
    }
})();
var proxyAddImg = (function() {
    var img = new Image();
    img.onload = function() {
        addImg.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            addImg.setSrc('loading.gif');
            img.src = src;
        }
    }
})();
proxyAddImg.setSrc('demo.png');
```

#### 虚拟代理同步数据

当前台向服务器提交数据时，如果每次前台提交都向服务器发送请求，前台在很短的时间内多次提交数据的话，就会造成很大的服务器性能浪费，网络开销费非常大。---------------   这时我们使用虚拟代理，防止客户端短时间内频繁操作，我们把客户端的请求合并到一起发送给服务器

```html
<body>
    <input type="checkbox" id="A">内容一<br>
    <input type="checkbox" id="B">内容二<br>
    <input type="checkbox" id="C">内容三<br>
    <input type="checkbox" id="D">内容四<br>
    <input type="checkbox" id="E">内容五<br>
    <input type="checkbox" id="F">内容六<br>
    <input type="checkbox" id="G">内容七<br>
    <input type="checkbox" id="H">内容八<br>
    <script>
        var synData = function(ID) {
            console.log(ID + '正在同步到服务器...');
        }
        var proxySynData = (function() {
            var cache = {}, //用对象作为缓存载体
                timer;
            return function(ID) {
                if (!timer) {
                    timer = setTimeout(function() {
                        synData(Object.keys(cache).join());
                        cache = {};
                        clearTimeout(timer);
                        timer = null;
                    }, 2000);
                }
                cache[ID] = 1;
            }
        })();
        var list = document.getElementsByTagName('input');
        for (var i = 0, item; item = list[i]; i++) {
            item.onclick = function() {
                if (this.checked) {
                    proxySynData(this.id);
                }
            };
        }
    </script>
</body>
```

### 缓存代理

缓存一些开销很大的运算结果，将需要重复使用的函数运算结果保存在一个变量里，下次使用时直接使用这个变量就OK了。(这个很好理解)

```js
var proxyMult = (function() {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();
proxyMult(1, 2, 3, 4); // 输出：24 
proxyMult(1, 2, 3, 4); // 输出：24
```

### 其他代理模式

*  防火墙代理：控制网络资源的访问，保护主题不让“坏人”接近。
*  远程代理：为一个对象在不同的地址空间提供局部代表，在 Java 中，远程代理可以是另一个虚拟机中的对象
*  保护代理：用于对象应该有不同访问权限的情况。 
*  智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个
对象被引用的次数。
*  写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，
当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，DLL
（操作系统中的动态链接库）是其典型运用场景。

### 使用场景

假如初始化本体对象的开销很大，而且在客户端初始化该本体对象以后程序却很少使用它，这时可以使用代理通过代理替换本体对象的接口从而避免高昂的操作开销。                                              

在 JavaScript 开发中最常用的是虚拟代理和缓存代理，当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。

> 不能滥用代理，有时候仅仅是给代码增加复杂度

## 观察者模式(订阅/发布模式)(Vue的双向绑定原理就是基于此模式)

观察者模式在 javascript 中使用非常广泛。它定义了一种一对多的依赖关系，即当一个对象的状态发生改变的时候，所有依赖于它的对象都会得到通知并自动更新，解决了主体对象与观察者之间功能的耦合。      
松耦合的代码、一对多的关系、主体状态变化时，所有依赖被通知、主体和观察者互不知晓。

### 适用于以下场景

当一个抽象模型有两个方面，其中一个方面依赖于另一方面。讲这两者封装在独立的对象中可以让它们可以各自独立的改变和复用         
对一个对象状态的更新，需要其他对象同步更新，而且其他对象的数量动态可变。                      
对象仅需要将自己的更新通知给其他对象而不需要知道其他对象的细节。

### 观察者模式的优缺点

#### 优点

观察者模式支持广播通讯。被观察者会向所有的登记过的观察者发出通知

#### 缺点

* 如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
* 如果在被观察者之间有循环依赖的话，被观察者会触发它们之间进行循环调用，导致系统崩溃。在使用观察者模式是要特别注意这一点。
* 如果对观察者的通知是通过另外的线程进行异步投递的话，系统必须保证投递是以自恰的方式进行的。
* 虽然观察者模式可以随时使观察者知道所观察的对象发生了变化，但是观察者模式没有相应的机制使观察者知道所观察的对象是怎么发生变化的。

### 观察者模式与中介者模式的区别

观察者模式和中介者模式看起来非常的相似，核心原理都是一样的，这里有一个细微的差别，中介者模式注重状态告知，观察者模式侧重组件数据通信，其实我们这里完全使用观察者模式也可以实现状态告知，不过 但观察者是分发性的，所有的观察者都会受到信息，而且中介者则是单一的，对象的通信由中介者处理。         

当组件之间依赖关系简单时，可以直接使用 观察者模式                     
当组件之间依赖关系复杂是，需要借助 中介者模式 梳理关系

### 简单案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div>
        <label>用户名称：<input type="text" id="pba" placeholder="请输入用户名称" /></label><br /><br />
        <label>生成邮箱：<input type="text" id="oba" readonly /></label>
        <label>生成ID：<input type="text" id="obb" readonly /></label>
    </div>

    <script type="text/javascript">
        //发布者
        function Publisher(obj) {
            this.observers = [];
            var state = obj.value; //让该内容不能直接访问

            //新增两个对于state的操作 获取/更新
            this.getState = function() {
                return state;
            }
            this.setState = function(value) {
                state = value;
                this.notice();
            }
            this.obj = obj;

        }
        Publisher.prototype.addOb = function(observer) {
            var flag = false;
            for (var i = this.observers.length - 1; i >= 0; i--) {
                if (this.observers[i] === observer) {
                    flag = true;
                }
            };
            if (!flag) {
                this.observers.push(observer);
            }
            return this;
        }
        Publisher.prototype.removeOb = function(observer) {
            var observers = this.observers;
            for (var i = 0; i < observers.length; i++) {
                if (observers[i] === observer) {
                    observers.splice(i, 1);
                }
            };
            return this;
        }
        Publisher.prototype.notice = function() {
            var observers = this.observers;
            for (var i = 0; i < observers.length; i++) {
                observers[i].update(this.getState());
            };
        }
        //订阅者
        function Subscribe(obj) {
            this.obj = obj;
            this.update = function(data) {
                this.obj.value = data;
            };
        }

        //实际应用
        var oba = new Subscribe(document.querySelector("#oba")),
            obb = new Subscribe(document.querySelector("#obb"));

        var pba = new Publisher(document.querySelector("#pba"));

        pba.addOb(oba);
        pba.addOb(obb);

        oba.update = function(state) {
            this.obj.value = state + "@w3c.com";
        }
        obb.update = function(state) {
            this.obj.value = "ID-" + state;
        }

        pba.obj.addEventListener('keyup', function() {
            pba.setState(this.value);
        });
    </script>
</body>

</html>
```

## 状态模式

> 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

通常我们谈到封装，一般都会优先封装对象的行为，而不是对象的状态。但在状态模式中刚好相反，状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部

### 简单的案例

> 开关重复按下后的逻辑为  弱光-->强光-->关灯-->弱光

```js
// OffLightState：
var OffLightState = function(light) {
    this.light = light;
};
OffLightState.prototype.buttonWasPressed = function() {
    console.log('弱光'); // offLightState 对应的行为
    this.light.setState(this.light.weakLightState); // 切换状态到 weakLightState 
};
// WeakLightState：
var WeakLightState = function(light) {
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光'); // weakLightState 对应的行为
    this.light.setState(this.light.strongLightState); // 切换状态到 strongLightState 
};
// StrongLightState：
var StrongLightState = function(light) {
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function() {
    console.log('关灯'); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState 
};

var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};
//  button 按钮被按下的事件里，Context 也不再直接进行任何实质性的操作，而是通过self.currState.buttonWasPressed()将请求委托给当前持有的状态对象去执行，代码如下：
Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function() {
        self.currState.buttonWasPressed();
    }
};
// Light.prototype.setState 方法，状态对象可以通过这个方法来切换 light对象的状态
Light.prototype.setState = function(newState) {
    this.currState = newState;
};
var light = new Light();
light.init();
```

### 状态模式的定义

> 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

* 我们以逗号分割，把这句话分为两部分来看。第一部分的意思是将状态封装成独立的类，并
将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。电灯的例子
足以说明这一点，在 off 和 on 这两种不同的状态下，我们点击同一个按钮，得到的行为反馈是截
然不同的。
* 第二部分是从客户的角度来看，我们使用的对象，在不同的状态下具有截然不同的行为，这
个对象看起来是从不同的类中实例化而来的，实际上这是使用了委托的效果。

### 状态模式的通用结构

* 一个上下文的类（Context）（类似于上述代码的 Light 类）
* Light 的构造函数中，我们要创建每一个状态类的实例对象，Context 将持有这些状态对象的引用，以便把请求委托给状态对象。

### 状态模式的优缺点

#### 优点

* 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态
类，很容易增加新的状态和转换。
* 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过
多的条件分支
* 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
* Context 中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

#### 缺点

* 中定义许多状态类
* 逻辑分散在状态类中 无法在一个地方就看出整个状态机的逻辑。

### 状态模式和策略模式的关系

* 状态模式和策略模式像一对双胞胎，它们都封装了一系列的算法或者行为，它们的类图看起来几乎一模一样，但在意图上有很大不同，因此它们是两种迥然不同的式。
* 策略模式和状态模式的相同点是，它们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行。

## 适配器模式

> 适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。

当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。
这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，或者我们拿
到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。第二种办法是创建
一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道。

如果现有的接口已经能够正常工作，那我们就永远不会用上适配器模式。适配器模式是一种
“亡羊补牢”的模式，没有人会在程序的设计之初就使用它。因为没有人可以完全预料到未来的
事情，也许现在好好工作的接口，未来的某天却不再适用于新系统，那么我们可以用适配器模式
把旧接口包装成一个新的接口，使它继续保持生命力。

### 总结

* 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实
现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够
使它们协同作用。

* 装饰者模式和代理模式也不会改变原有对象的接口，但装饰者模式的作用是为了给对象
增加功能。装饰者模式常常形成一条长的装饰链，而适配器模式通常只包装一次。代理
模式是为了控制对对象的访问，通常也只包装一次。
