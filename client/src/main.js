import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import 'virtual:svg-icons-register';
import svgIcon from '@/components/svgIcon.vue';
import '@/utils/Element.js'
import '@/styles/element-reset.scss';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import TablePage from 'tab-u';
import 'tab-u/styles/TablePage-ui.css';
Vue.use(TablePage);
// 全局注册 svg 图标组件
Vue.component('svg-icon', svgIcon);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
