const Page = () => import('./index.vue');
const path = '/main/other';

export const routes = [
    {
        path,
        component: Page,
        meta: {
            title: '表格UI功能展示',
            showInbreadcrumb: true,
            icon: 'cards',
            index: '6',
        },
    },
];
