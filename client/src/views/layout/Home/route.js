const Page = () => import('./index.vue');
const path = '/main/index';

export const routes = [
  {
    path,
    component: Page,
    meta: {
      title: '首页',
      showInbreadcrumb: true,
      icon: 'home-alt2',
      index: '1',
    },
  },
];
