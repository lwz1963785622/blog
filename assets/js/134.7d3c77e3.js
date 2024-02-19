(window.webpackJsonp=window.webpackJsonp||[]).push([[134],{519:function(e,s,t){"use strict";t.r(s);var a=t(17),r=Object(a.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"vue源码的简单分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue源码的简单分析"}},[e._v("#")]),e._v(" VUE源码的简单分析")]),e._v(" "),t("h2",{attrs:{id:"调试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#调试"}},[e._v("#")]),e._v(" 调试")]),e._v(" "),t("h3",{attrs:{id:"source-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#source-map"}},[e._v("#")]),e._v(" source map")]),e._v(" "),t("blockquote",[t("p",[e._v("在 package.json -> scripts 中的 dev 命令中添加 --sourcemap，这样就可以在浏览器中调试源码时查看当前代码在源码中的位置。")])]),e._v(" "),t("div",{staticClass:"language-json extra-class"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[e._v('"scripts"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[e._v('"dev"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"')]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),t("h3",{attrs:{id:"启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动"}},[e._v("#")]),e._v(" 启动")]),e._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[e._v("npm run dev\n")])])]),t("h3",{attrs:{id:"目录结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目录结构"}},[e._v("#")]),e._v(" 目录结构")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("├── benchmarks                  性能、基准测试\n├── dist                        构建打包的输出目录\n├── examples                    案例目录\n├── flow                        flow 语法的类型声明\n├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的\n│   ├── vue-server-renderer\n│   ├── vue-template-compiler\n│   ├── weex-template-compiler\n│   └── weex-vue-framework\n├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件\n├── src                         vue 源码目录\n│   ├── compiler                编译器\n│   ├── core                    运行时的核心包\n│   │   ├── components          全局组件，比如 keep-alive\n│   │   ├── config.js           一些默认配置项\n│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等\n│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下\n│   │   ├── observer            响应式原理\n│   │   ├── util                工具方法\n│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿\n│   ├── platforms               平台相关的编译器代码\n│   │   ├── web\n│   │   └── weex\n│   ├── server                  服务端渲染相关\n├── test                        测试目录\n├── types                       TS 类型声明\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);