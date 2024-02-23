let navlist = [
  // 导航栏
  { text: 'Home', link: '/' },
  { text: 'Vue', link: '/vue/' },
  { text: 'React', link: '/React/' },
  { text: 'Javascript', link: '/Javascript/' },
  { text: '数据结构', link: '/数据结构/' },
  { text: 'web', link: '/web/' },
  { text: 'Jenkins', link: '/Jenkins/' },
  { text: 'Docker', link: '/Docker/' },
  { text: 'Linux', link: '/Linux/' },
  { text: 'Summarize', link: '/Summarize/' },
  {
    text: 'Node',
    // ariaLabel: 'Language Menu',
    items: [
      // { text: 'pm2', link: '/Node/pm2' },
      { text: 'npm', link: '/Node/npm' },
      { text: 'nvm', link: '/Node/nvm' },
      // { text: 'Egg', link: '/Node/Egg/Egg' }
    ],
  },
  // {
  //     text: 'Languages',
  //     ariaLabel: 'Language Menu',
  //     items: [
  //         { text: 'Chinese', link: '/language/chinese/' },
  //         { text: 'Japanese', link: '/language/japanese/' }
  //     ]
  // }
];
module.exports = navlist;
