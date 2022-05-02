const Page = () => import('./index.vue');
const path = '/main/log';

export const routes = [
    {
        path,
        component: Page,
        meta: {
            title: '日志管理',
            icon: 'tool',
            index: '8',
        },
    },
];
