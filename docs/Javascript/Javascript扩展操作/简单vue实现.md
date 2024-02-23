```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>简单vue的实现</title>
</head>

<body>
  <div id="app">
    {{name}}
    {{text.name}}
    <p v-if="isShow">
      <span>{{name}}</span>
    </p>
    <input type="text" id="a" v-model="name">

  </div>

  <script>

    function compile(node, vm) {

      var reg = /\{\{(.*)\}\}/;                 //正则验证双大括号
      if (node.nodeType === 1) {               //元素节点
        var attr = Array.from(node.attributes);       
        //解析属性
        for (var i = 0; i < attr.length; i++) {      //遍历元素上的属性，查找特殊的属性，比如v-model和v-if
          if (attr[i].nodeName == 'v-model') {
            var name = attr[i].nodeValue;
            node.addEventListener('input', function (e) {

              vm[name] = e.target.value;
              //eval(`vm.data.${name}=e.target.value`)
              console.log(vm)
            })
            node.value = eval(`vm.${name}`);
            node.removeAttribute('v-model');
          }
          if (attr[i].nodeName == 'v-if') {
            var name = attr[i].nodeValue;
            var isInsert = eval(`vm.${name}`);
            if (!isInsert) {
              node = '';
              return node;
            } else {
              node.removeAttribute('v-if');
            }

          }
        }

      }
      if (node.nodeType === 3) {              //文本节点        
        if (reg.test(node.nodeValue)) {        //正则验证节点内容是否符合双大括号包裹
          var name = RegExp.$1;          //name是双大括号包裹内容
          //RegExp.$n是非标准的，尽量不要在生产环境中使用。    
          //RegExp.$n（n为1-9之间的数值）指的是与正则表达式匹配的第n个 子匹配(以括号为标志)字符串。
          //RegExp.$_与正则表达式匹配的完整字符串。
          name = name.trim();
          //node.nodeValue = eval(`vm.data.${name}`);
          new Watcher(vm, node, name)//这里给每个属性文本节点生成一个Watcher对象，嗯，大致跟vue的原理相似
        }
      }
      return node;
    }

    function nodeToFragment(node, vm) {
      var flag = document.createDocumentFragment();     
      var child;

      while (child = node.firstChild) {
        child = compile(child, vm)
        if (child !== "") {
          if (child.childNodes.length != 0) {
            child.append(nodeToFragment(child, vm));
          }
        } else {
          node.removeChild(node.firstChild)
        }

        flag.append(child);
      }
      return flag;
    }

    function defineReactive(obj, key, val) {
      var dep = new Dep();//这里给每个属性生成一个数据订阅中心，它可以存储订阅它的所有watcher,
      Object.defineProperty(obj, key, {                //实现双向数据绑定
        get: function () {                             //get获取数据
          if (Dep.target) dep.addSub(Dep.target);//这里的Dep.target是对应的Watcher对象，这里是dep对象调用addSub
          return val;
        },
        set: function (newVal) {                    //set设置数据
          if (newVal === val) return;
          console.log('修改了', key)

          val = newVal;
          dep.notify();//数据更新了，就通知所有的观察者实例
        }
      })
    }

    function observer(obj, vm) {                         //遍历obj对象的属性
      Object.keys(obj).forEach(function (key) {
        defineReactive(vm, key, obj[key]);
      })
    }

    function Watcher(vm, node, name) {
      Dep.target = this;//在实例化新的watcher对象时把Dep.target赋值为this，也就是每个指令对应的那个watcher对象，这样在下面调用this.update,从而调用this.get时触发数据的get方法，从而触发dep.addSub（Dep.target）,这样这个watcher就被添加进去
      this.name = name;
      this.node = node;
      this.vm = vm;
      this.update();
      Dep.target = null;  //为了保证全局只有一个，在最后需要清空，为下一个指令做准备
    }
    Watcher.prototype = {
      update: function () {
        this.get();//更新时调用get()
        this.node.nodeValue = this.value;

      },
      get: function () {
        this.value = this.vm[this.name]; //会触发vm.data中属性的get方法，进而可以添加watcher到Dep中
      }
    }

    function Dep() {
      this.subs = [];
    }
    Dep.prototype = {
      addSub: function (sub) {
        this.subs.push(sub);
      },
      notify: function () {
        this.subs.forEach(function (sub) {
          sub.update();
        })
      }
    }

    function Vue(options) {
      this.data = options.data;
      var id = options.el;
      var data = this.data;
      observer(data, this)             //遍历data对象的属性
      var dom = nodeToFragment(document.getElementById(id), this);
      document.getElementById(id).appendChild(dom);     
    }




   //简单操作
    var vm = new Vue({
      el: 'app',
      data: {
        text: {
          name: 'byk'
        },
        'name': 'vue',
        isShow: true
      }
    })

  </script>
</body>

</html>
```
