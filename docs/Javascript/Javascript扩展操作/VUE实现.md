# VUE实现
Vue是一个典型的MVVM框架

## 数据处理(数据双向绑定)
双向数据绑定就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view。                   
vue实现对数据的双向绑定，通过对数据劫持结合发布者-订阅者模式实现的。                                 
angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图。            

vue通过Object.defineProperty来实现数据劫持，会对数据对象每个属性添加对应的get和set方法，对数据进行读取和赋值操作就分别调用get和set方法。                           

defineProperty方法是这里的重点，需要了解请移步Object对象。


```html
<body>
    <input type="text" id="input">
    <span id="span"></span>
</body>
<script>
    var input=document.querySelector('#input');
    var span=document.querySelector('#span');
    var obj={};
    console.log(Array.from(input.attributes));
    Object.defineProperty(obj,'hello',{
        set(newValue){
            input.value=newValue;
            span.innerHTML=newValue;
        }
    })
    document.addEventListener('keyup',function(e){
        obj.hello=e.target.value;
    })
</script>
```

## 实现mvvm
实现mvvm需要实现数据监听器+指令解析器+Watcher

### 数据监听器
数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者               
我们利用Obeject.defineProperty()来监听属性变动，需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化。         
```js
var data = {name: 'kindeng'};
observe(data);
data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {         
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {        //给对象上的值添加get和set
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}
```
可以监听到每个数据的变化，我们再把这些变化通知给订阅者，需要实现一个消息订阅器，很简单，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法。
```js
function defineReactive(data, key, val) {
    var dep = new Dep();           //给上面的代码添加Dep实例
    observe(val); // 监听子属性

    Object.defineProperty(data, key, {
        // ... 省略
        set: function(newVal) {
            if (val === newVal) return;
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
            dep.notify(); // 通知所有订阅者
        }
    });
}
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```

接着往往订阅器添加订阅者，订阅者应该是Watcher, 而且var dep = new Dep();是在 defineReactive方法内部定义的，所以想通过dep添加订阅者，就需要在闭包内操作，所以我们可以在 getter里面操作
```js
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
});

// Watcher.js
Watcher.prototype = {
    get: function(key) {
        Dep.target = this;
        this.value = data[key];    // 这里会触发属性的getter，从而添加订阅者
        Dep.target = null;
    }
}
```

Observer(数据监听器)就已经具备了监听数据和数据变化通知订阅者的功能。

### 指令解析器
对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。简单来说就是把我们写的指令解析出来，然后进行相应的操作。                           

遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将跟节点el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中
```js
function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();          
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    init: function() { this.compileElement(this.$fragment); },     
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    //compileElement方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定
    compileElement: function(el) {          
        var childNodes = el.childNodes, me = this;
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;    // 表达式文本
            // 按元素节点方式编译
            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }
            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },
    compile: function(node) {
        var nodeAttrs = node.attributes, me = this;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 规定：指令以 v-xxx 命名
            // 如 <span v-text="content"></span> 中指令为 v-text
            var attrName = attr.name;    // v-text
            if (me.isDirective(attrName)) {
                var exp = attr.value; // content
                var dir = attrName.substring(2);    // text
                if (me.isEventDirective(dir)) {
                    // 事件指令, 如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        });
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // ...省略
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
};
```
通过递归遍历保证了每个节点及子节点都会解析编译到，监听数据、绑定更新函数的处理是在compileUtil.bind()这个方法中，通过new Watcher()添加回调来接收数据变化的通知

### Watcher
Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是:
1. 在自身实例化时往属性订阅器(dep)里面添加自己
2. 自身必须有一个update()方法
3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调。

```js
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get();
}
Watcher.prototype = {
    update: function() {
        this.run();    // 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};
```

实例化Watcher的时候，调用get()方法，通过Dep.target = watcherInstance标记订阅者是当前watcher实例，强行触发属性定义的getter方法，getter方法执行的时候，就会在属性的订阅器dep添加当前watcher实例，从而在属性值有变化的时候，watcherInstance就能收到更新通知。

### 整合
使用Vue作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。
```js
function Vue(options) {
    this.$options = options;
    var data = this._data = this.$options.data, me = this;
    // 属性代理，实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}

Vue.prototype = {
    _proxy: function(key) {
        var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};
```
主要还是利用了`Object.defineProperty()`这个方法来劫持了vm实例对象的属性的读写权，使读写vm实例的属性转成读写了`vm._data`的属性值
