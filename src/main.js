// vue
import Vue from 'vue';

// mint-ui
import './plugins/mint-ui';

// 路由
import router from './router';

// 状态管理
import store from './store';

// 样式
import './assets/css/main.scss';

// vue 组件 / 根组件
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');