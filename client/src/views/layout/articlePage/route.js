const Page = () => import('./index.vue');
const path = '/main/article';

export const routes = [
  {
    path,
    component: Page,
    meta: {
      title: '文章管理',
      showInbreadcrumb: true,
      icon:'book',
      index:'2',
    },
  },
];
