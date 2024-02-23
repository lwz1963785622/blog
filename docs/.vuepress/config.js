const autoSideBar = require('./config/sidebarConfig');
const nav = require('./config/navBar');
module.exports = {
  title: 'lwz blog',
  description: '一个基于vuepress的技术站点',
  base: '/',
  locales: {
    // 键名是该语言所属的子路径

    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'lwz blog',
      description: '一个基于vuepress的技术站点',
    },
  },
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img',
      options: {
        margin: 20,
      },
    },
    '@vuepress/back-to-top': {},
    '@vuepress/active-header-links': {},
    'vuepress-plugin-code-copy': {},
    'fulltext-search': {},
  },
  themeConfig: {
    smoothScroll: true,
    nav,
    sidebar: autoSideBar,
    sidebarDepth: 2,
  },
  head: [
    ['link', { rel: 'icon', href: '/icon.jpg' }],
    ['meta', { name: 'keywords', content: 'vuepress,blog,主题' }],
  ],
  host: '0.0.0.0',
  port: '8081',
  markdown: {
    assets: {
      absolutePathPrependBase: true,
    },
    // 每个代码块显示行号：
    //     lineNumbers:true
  },
};
