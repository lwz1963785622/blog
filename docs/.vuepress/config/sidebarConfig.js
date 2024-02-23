const autoSideBar = require('./autoSideBar');
const sidebar = {
  // 侧边栏
  '/vue/': [
    {
      title: '首页', // 必要的
      path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
    {
      title: '组件化思想', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/vue/组件化思想/'),
    },
    {
      title: 'Vue源码分析', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/vue/Vue源码分析/'),
    },
    {
      title: 'Vue3', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/vue/Vue3/'),
    },
  ],
  '/数据结构/': [
    {
      title: '首页', // 必要的
      path: '/数据结构/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
    {
      title: 'C语言程序设计', // 必要的
      // path: '/数据结构/C语言程序设计/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/数据结构/C语言程序设计/', 2),
    },
    {
      title: '排序', // 必要的
      // path: '/数据结构/C语言程序设计/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/数据结构/排序/', 2),
    },
  ],
  '/Javascript/': [
    {
      title: '首页', // 必要的
      path: '/Javascript/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
    {
      title: 'Javascript基础语法', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/Javascript基础语法/', 2),
    },
    {
      title: 'JavaScriptBOM操作', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/JavaScriptBOM操作/'),
    },
    {
      title: 'JavaScriptDOM操作', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/JavaScriptDOM操作/'),
    },
    {
      title: 'Javascript数据处理', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/Javascript数据处理/'),
    },
    {
      title: 'Javascript扩展操作', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/Javascript扩展操作/'),
    },
    {
      title: 'TypeScript入门', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/Javascript/TypeScript入门/'),
    },
  ],
  '/web/': [
    {
      title: 'web', // 必要的
      path: '/web/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
    {
      title: 'web介绍', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/web/web介绍/', 2),
    },
    {
      title: 'HtmlCss', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/web/HtmlCss/', 2),
    },
  ],
  '/Jenkins/': [
    {
      title: 'Jenkins', // 必要的
      path: '/Jenkins/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
  ],
  '/Docker/': [
    {
      title: 'Docker', // 必要的
      path: '/Docker/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
  ],
  '/Linux/': [
    {
      title: 'Linux', // 必要的
      path: '/Linux/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
  ],
  '/Node/': [
    {
      title: 'Node', // 必要的
      path: '/Node/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1,
      children: [
        { title: 'npm', path: '/Node/npm' },
        // { title: 'pm2', path: '/Node/pm2' },
        { title: 'nvm', path: '/Node/nvm' },
      ],
    },
    {
      title: 'Egg', // 必要的
      // path: '/Node/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1,
      children: autoSideBar('/Node/Egg/'),
    },
  ],
  '/React/': [
    {
      title: '首页', // 必要的
      path: '/React/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
    },
    {
      title: 'React介绍', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/React介绍/'),
    },
    {
      title: 'React基础', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/React基础/'),
    },
    {
      title: 'React路由', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/React路由/'),
    },
    {
      title: 'React项目', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/React项目/'),
    },
    {
      title: 'Redux', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/Redux/'),
    },
    {
      title: 'React扩展', // 必要的
      // path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: autoSideBar('/React/React扩展/'),
    },
  ],
  '/Summarize/': [
    {
      title: 'Summarize', // 必要的
      path: '/Summarize/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
    },
  ],
};
module.exports = sidebar;
