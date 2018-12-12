import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/session/Login.vue';
import NotFoundView from './views/error/NotFound.vue';
import HomeView from './views/home/Home.vue';

import SessionService from './services/SessionService';

Vue.use(Router);

const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: '/home' },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true, title: '首页' },
      children: [
      ],
    },
    // 404
    { path: '*', component: NotFoundView },

  ],
});

/*
 * 对路由进行登陆认证。`route.meta.requiresAuth = true` 的才需要登陆认证
 */
router.beforeEach((to, from, next) => {
  if (SessionService.isLogin()) { // 已登陆
    return next();
  }

  const hasAuthRoute = to.matched.some(record => record.meta.requiresAuth);

  if (!hasAuthRoute) { // 没有需要认证的路由
    return next();
  }

  // 未登录，跳转登陆页
  return next({
    name: 'login',
    query: { status: 401 },
  });
});


export default router;
