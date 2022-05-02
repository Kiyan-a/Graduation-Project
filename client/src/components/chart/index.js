/* 实现自动化导入options里的图表option配置 */
const modulesFiles = import.meta.globEager('./options/**/index.js');
let modules = {};
Object.keys(modulesFiles).forEach(item => {
    modules=Object.assign({},modules,modulesFiles[item].default);//导出默认模块 default
});

export default modules