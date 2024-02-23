# React简介

> React是Facebook开发的一款用于构建用户界面的JavaScript库。

| 名称 | 地址     |
| :------------- | :------------- |
| React官网      | <a href="https://reactjs.org/" target="_blank">https://reactjs.org/</a>       |
| React官网中文   | <a href="https://zh-hans.reactjs.org/" target="_blank">https://zh-hans.reactjs.org/</a> |
| React中文文档   | <a href="https://zh-hans.reactjs.org/docs/getting-started.html" target="_blank">https://zh-hans.reactjs.org/docs/getting-started.html</a> |
| React版本更新历史  | <a href="https://github.com/facebook/react/blob/master/CHANGELOG.md" target="_blank">https://github.com/facebook/react/blob/master/CHANGELOG.md</a> |

## React是什么

React是Facebook开发的一款用于构建用户界面的JavaScript库。所有的React应用的核心是 **组件(Component)**。
## 由谁开发

- 起初由Facebook 的软件工程师 Jordan Walke 创建。

- 于2011年部署于Facebook 的 newsfeed

- 随后在2012年部署于Instargram

- 2013年5月开源。
...


### 组件化思想

React 的一个重要贡献——将基于组件的架构带到前端世界，React 并不是“组件”的发明者，但它的确在这领域深凿了一步。

### 以 JavaScript 为中心

React 将 "HTML" 嵌入 JS。用Javascript语法去操作"HTML"。

## 为什么需要React

Facebook认为MVC无法满足他们的扩展需求，由于他们非常巨大的代码库和庞大的组织，使得MVC很快变得非常复复杂，每当需要添加一项新的功能或特性时，系统的复杂度就成级数增长，致使代码变得脆弱和不可预测，结果导致他们的MVC正在土崩瓦解。便认为MVC不适合大规模应用，当系统中有很多的模型和相应的视图时，其复杂度就会迅速扩大，非常难以理解和调试，特别是模型和视图间可能存在的双向数据流动。

解决这个问题需要“以某种方式组织代码，使其更加可预测”，Flux和React做到了这一点。Flux是一种促进应用内数据单向流动的系统架构。据Occhino介绍，React是一种用来构建“可控”和“声明式”的web用户接口的JavaScript框架，使得Facebook可以更快的开发web应用。

原生JavaScript 操作Dom频繁，效率低。（DOM-API操作UI）

使用JavaScript 直接操作DOM ，浏览器会大量的重绘重排。

原生JavaScript 没有组件化编码方案，代码复用低。


## React解决问题

前端开发变得越来越复杂，其本质问题可归结于如何将来自于服务器端或者用户输入的动态数据高效的反映到复杂的用户界面上。

``` 

                         现阶段问题          React解决方案
                        ┌──────────┐      ┌──────────┐
                        │          │      │          │
                     ┌──┤频繁DOM操作├──────┤自动DOM操作│
   ┌──────────┐      │  │          │      │          │
   │          │      │  └──────────┘      └──────────┘
   │DataChange├──────┤   
   │          │      │  ┌──────────┐      ┌──────────┐
   └──────────┘      │  │          │      │          │
                     └──┤逻辑极复杂 ├──────┤ 状态&属性 │
                        │          │      │          │
                        └──────────┘      └──────────┘

```

采用组件化模式，声明式编码，提高开发效率及组件复用率。

React Native 编写原生应用 移动端开发。

高效（优秀的Diffing算法 使用虚拟DOM）避免于真实Dom 接触。

## React设计哲学

从设计哲学来讲，React 的整个设计思想其实非常简单：

``` 
                  data  -> view
const Component = props => ReactElement
```

再概括一下就是：

``` 
data => view
```

> 简而言之就是：数据到视图的映射。

## React特点

1. 声明式设计<a href="#[1]什么是声明式编程">[1]</a>：自动DOM操作(React自动完成)
* 高效：通过虚拟DOM(Virtual DOM)，最大限度的减少与DOM的交互提高效率
* 灵活：可以与已知的框架或库很好的配合
* JSX：JavaScript语法的扩展，可以不使用，但建议使用
* 组件：构建组件，使代码更容易得到复用，能够很好地应用在大项目的开发中
* 单向数据流：React实现了单向响应的数据流，从而减少了重复代码，使得比传统数据绑定更简单

## Virtual DOM

> React 使用 Virtual DOM 来更新真正的 DOM，从而提高效率和速度。

在Web开发中，我们总需要将变化的数据实时展示到视图上，这时就需要对DOM进行操作，而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。因为 DOM 操作是真的很慢，所以我们永远不会直接用 React 修改 DOM，而是修改内存中的虚拟 DOM。

<img src="/img/React/VirtualDOM.png" style="max-width:600px; "/>

### 直接操作DOM

真实页面对应一个 DOM 树。在传统页面的开发模式中，每次需要更新页面时，都要手动操作 DOM 来进行更新

<img src="/img/React/dom-change.png" style="max-width:347px; "/>

DOM 操作非常昂贵。我们都知道在前端开发中，性能消耗最大的就是 DOM 操作，而且这 部分代码会让整体项目的代码变得难以维护。React 把真实 DOM 树转换成 JavaScript 对象树，也 就是 Virtual DOM

### Virtual DOM

<img src="/img/React/vdom-change.png" style="max-width:631px; "/>

操作虚拟 DOM 非常快，当时机合适时，React 负责更新真实 DOM。它通过比较虚拟 DOM 和真实 DOM 之间的差别，查明哪个改变很重要，然后在一个称为 Reconciliation 的过程中作出最少量的 DOM 改变，以确保一切保持最新。

> 简单说， 每次数据更新后，重新计算 Virtual DOM，并和上一次生成的 Virtual DOM 做对比，对发生 变化的部分做批量更新。

## React组件化

> 创建好拥有各自状态的组件，再由组件构成更加复杂的界面。

**Component**，中文成为 **组件** 即将实现页面某一部分功能的结构、样式和逻辑封装成为一个整体，使其高内聚，低耦合，达到分治与复用的目的。组件化设计的目的是提高代码的复用，降低测试难度，代码复杂度。

**组件** 是React中构建用户界面的基本单位。组件化的工作方式信奉独立、完整、自由组合。目标就是尽可能把设计与开发中的元素独立化，使它具备完整的局部功能，通过自由组合来构成整个产品。

React 鼓励我们将视觉元素分为更小的组件，而不是一整大块：

<img src="/img/React/abstract/component.png" width="70%" />

React认为一个组件应该具有如下特征：

* **可组合（Composeable）**：一个组件易于和其它组件一起使用，或者嵌套在另一个组件内部，一个复杂的UI可以拆分成多个简单的UI组件；
* **可重用（Reusable）**：每个组件都是具有独立功能的，它可以被使用在多个UI场景；
* **可维护（Maintainable）**：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护；

## 浏览器支持

React 支持所有的现代浏览器，包括 IE9 及以上版本，但是需要为旧版浏览器比如 IE9 和 IE10 引入相关的 <a href="https://zh-hans.reactjs.org/docs/javascript-environment-requirements.html" target="\_blank">polyfills 赖依</a>。

React 16 依赖集合类型 Map 和 Set 。如果你要支持无法原生提供这些能力（例如 IE < 11）或实现不规范（例如 IE 11）的旧浏览器与设备，考虑在你的应用库中包含一个全局的 polyfill ，例如 core-js 或 babel-polyfill 。

## 附录

### [1]什么是声明式编程
声明式编程是一种编程范式，它关注的是你要做什么，而不是如何做。它表达逻辑而不显式地定义步骤。这意味着我们需要根据逻辑的计算来声明要显示的组件。它没有描述控制流步骤。声明式编程的例子有HTML、SQL等

HTML file

``` 
// HTML
<div>
  <p>Declarative Programming</p>
</div>
```

SQL file

``` 
select * from studens where firstName = 'declarative';
```

### 声明式编程 vs 命令式编程

声明式编程的编写方式描述了应该做什么，而命令式编程描述了如何做。在声明式编程中，让编译器决定如何做事情。声明性程序很容易推理，因为代码本身描述了它在做什么。

## 参考

* https://juejin.im/post/5cf0733de51d4510803ce34e#heading-9
* https://www.optbbs.com/thread-2050391-1-1.html
