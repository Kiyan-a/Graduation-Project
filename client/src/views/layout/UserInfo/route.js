const Page = () => import('./index.vue');
const path = '/main/userInfor';

export const routes = [
    {
        path,
        component: Page,
        meta: {
            title: '用户管理',
            showInbreadcrumb: true,
            icon: 'accessibility-human',
            index: '4',
        },
    },
];
