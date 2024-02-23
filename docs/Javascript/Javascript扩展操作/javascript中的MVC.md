# javascript中的MVC
MVC 是一种使用 MVC（Model View Controller 模型-视图-控制器）设计创建 Web 应用程序的模式：        
* Model（模型）是应用程序中用于处理应用程序数据逻辑的部分，通常模型对象负责在数据库中存取数据。
* View（视图）是应用程序中处理数据显示的部分，通常视图是依据模型数据创建的。
* Controller（控制器）是应用程序中处理用户交互的部分，通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。


### MVC的基础是观察者模式，这是实现model和view同步的关键
借助观察者模式，实现在调用model的set方法改变其值的时候，模板也同步更新，但这样的实现却很别扭，因为需要手动监听model值的改变（通过watch方法）并传入一个回调函数，在使用binding方法，绑定model和view
```html
<div id="div1"></div>
<div id="div2"></div>
<script>
	function Model(value) {
	    this._value = typeof value === 'undefined' ? '' : value;
	    this._listeners = [];
	}
	Model.prototype.set = function (value) {
	    var self = this;
	    self._value = value;
	    // model中的值改变时，应通知注册过的回调函数
	    // 按照Javascript事件处理的一般机制，我们异步地调用回调函数
	    // 如果觉得setTimeout影响性能，也可以采用requestAnimationFrame
	    setTimeout(function () {
	        self._listeners.forEach(function (listener) {
	            listener.call(self, value);
	        });
		});
	};
	Model.prototype.watch = function (listener) {
	    // 注册监听的回调函数
	    this._listeners.push(listener);
	};
	Model.prototype.binding = function (node) {
	    // 将watch的逻辑和通用的回调函数放到这里
	    this.watch(function (value) {
	        node.innerHTML = value;
	    });
	};


  var model = new Model();
  model.binding(document.getElementById('div1'));
  model.binding(document.getElementById('div2'));
  model.set('this is a div');
</script>
```

### 实现controller，将绑定从逻辑代码中解耦
```html
<div id="div1" bind="model1"></div>
<div id="div2" bind="model1"></div>
<script type="text/javascript">
  function Controller(callback) {
    var models = {};
    // 找到所有有bind属性的元素
    var views = document.querySelectorAll('[bind]');
    // 将views处理为普通数组
    views = Array.prototype.slice.call(views, 0);
    views.forEach(function (view) {
        var modelName = view.getAttribute('bind');
        // 取出或新建该元素所绑定的model
        models[modelName] = models[modelName] || new Model();
        // 完成该元素和指定model的绑定
        models[modelName].binding(view);
    });
    // 调用controller的具体逻辑，将models传入，方便业务处理
    callback.call(this, models);
  }
  new Controller(function (models) {
      var model1 = models.model1;
      model1.set('this is a div');
  });
</script>
```

### 整合代码
```js
function Model(value) {
    this._value = typeof value === 'undefined' ? '' : value;
    this._listeners = [];
}
Model.prototype.set = function (value) {
    var self = this;
    self._value = value;
    setTimeout(function () {
        self._listeners.forEach(function (listener) {
            listener.call(self, value);
        });
    });
};
Model.prototype.watch = function (listener) {
    this._listeners.push(listener);
};
Model.prototype.binding = function (node) {
    this.watch(function (value) {
        node.innerHTML = value;
    });
};
function Controller(callback) {
    var models = {};
    var views = Array.prototype.slice.call(document.querySelectorAll('[bind]'), 0);
    views.forEach(function (view) {
        var modelName = view.getAttribute('bind');
        (models[modelName] = models[modelName] || new Model()).binding(view);
    });
    callback.call(this, models);
}
```

#### 简单使用
```HTML
<span bind="hour"></span> : <span bind="minute"></span> : <span bind="second"></span>
<script type="text/javascript">
// controller:
new Controller(function (models) {
    function setTime() {
        var date = new Date();
        models.hour.set(date.getHours());
        models.minute.set(date.getMinutes());
        models.second.set(date.getSeconds());
    }
    setTime();
    setInterval(setTime, 1000);
});
</script>
```
controller中只负责更新model的逻辑，和view完全解耦；而view和model的绑定是通过view中的属性和框架中controller的初始化代码完成的，也没有出现在业务逻辑中；至于view的更新，也是通过框架中的观察者模式实现的。                 

在简单的系统中应用MVC模式，会增加结构的复杂性，并且降低效率
