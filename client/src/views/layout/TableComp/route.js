const Page = () => import('./index.vue');
const path = '/main/tab';

export const routes = [
  {
    path,
    component: Page,
    meta: {
      title: '表格组件测试',
      showInbreadcrumb: true,
      icon: 'language',
      index: '7',
    },
  },
];
