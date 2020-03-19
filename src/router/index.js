import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from './Admin/index.js'
import EndUser from './EndUser/index.js'

// ALL ROUTES
const routes = [...Admin, ...EndUser];

Vue.use(VueRouter)

// 
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
