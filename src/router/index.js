import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/error/403',
    name: 'error_403',
    component: () => import('../views/error/403.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
