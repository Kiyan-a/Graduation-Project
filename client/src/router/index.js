import Vue from 'vue';
import VueRouter from 'vue-router';
import R from './routes.js';
Vue.use(VueRouter);
import { getToken } from '@/utils';
import reG from '@/views/login/infoForm/register.vue';

/* 此处只做基本路由页面处理,详情的路由页面利用 layout 下的 route.js 进行收集 */
const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/main/index',
    children: R,
  },
  {
    path: '/verify',
    component: () => import('@/views/login/index.vue'),
    redirect: '/verify/login',
    children: [
      {
        path: '/verify/login',
        component: () => import('@/views/login/infoForm/login.vue'),
      },
      {
        path: '/verify/register',
        component: reG,
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/components/404/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

/* 全局前置路由守卫*(身份验证) */
router.beforeEach((to, from, next) => {
  if (to.path === '/verify/login' || to.path === '/verify/register')
    return next();
  const tokenStr = getToken();
  // console.log(tokenStr);
  if (!tokenStr) return next('/verify/login');
  next();
});

export default router;
