import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from './Admin/index.js';
import EndUser from './EndUser/index.js';
import Shared from './Shared/index.js';

// ALL ROUTES
const routes = [...Admin, ...EndUser, ...Shared];
//
Vue.use(VueRouter);
//
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
//
export default router;
