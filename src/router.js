import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/session/Login.vue';
import NotFoundView from './views/error/NotFound.vue';
import HomeView from './views/home/Home.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: '/login' },

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

export default router;
