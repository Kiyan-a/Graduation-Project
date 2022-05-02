// 自动收集复杂的路由详情文件 route.js 复制到 layout 子路由嵌套
let r = import.meta.globEager('../views/layout/**/route.js');
let R = Object.values(r)
  .map(item => {
    return item.routes;
  })
  .reduce((total, item) => {
    return [...total, ...item];
  });
// 对路由进行排序
function compare(property) {
  return function (a, b) {
    let value1 = a.meta[property];
    let value2 = b.meta[property];
    return value1 - value2;
  };
}
R.sort(compare('index'))

export default R;
