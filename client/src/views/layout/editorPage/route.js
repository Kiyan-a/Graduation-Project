const Page = () => import('./index.vue');
const path = '/main/editor';

export const routes = [
  {
    path,
    component: Page,
    meta: {
      title: '富文本编辑器扩展',
      showInbreadcrumb: true,
      icon: 'clip',
      index: '5',
    },
  },
];
