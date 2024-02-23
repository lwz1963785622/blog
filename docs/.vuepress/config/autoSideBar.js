const fs = require('fs'); //
const path = require('path');
const strRegex = '(.md)$';
const titleRegex = /^[\d][\d]{1,}[-]/g;

const re = new RegExp(strRegex);
function autoSideBar(pathstring, sidebarDepth = 1) {
  let children = [];
  let t_path = path.resolve(__dirname, '../../' + pathstring);
  fs.readdirSync(t_path).forEach((file) => {
    if (re.test(file)) {
      children.push({
        title: file.replace(re, '').replace(titleRegex, ''),
        path: pathstring + file.replace(re, ''),
      });
    } else {
      children.push({
        title: file.replace(re, '').replace(titleRegex, ''),
        sidebarDepth: sidebarDepth,
        children: autoSideBar(pathstring + file + '/'),
      });
    }
  });
  return children;
}
module.exports = autoSideBar;
