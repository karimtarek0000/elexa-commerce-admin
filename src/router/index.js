import Vue from 'vue';
import VueRouter from 'vue-router';
import * as lazily from './Lazilye/index.js';
import { currentUser } from '@/firebase/helps/firebaseauth.js';
//
Vue.use(VueRouter);
//
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: lazily.Admin,
      children: [
        {
          path: '',
          name: 'admin',
          component: lazily.Home,
          meta: {
            statusAdmin: true,
            title: 'Home'
          }
        },
        {
          path: 'products',
          name: 'products',
          component: lazily.Products,
          meta: {
            statusAdmin: true,
            title: 'Products'
          }
        },
        {
          path: 'category',
          name: 'category',
          component: lazily.Category,
          meta: {
            statusAdmin: true,
            title: 'Category'
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: lazily.Register,
      meta: {
        title: 'Admin Register'
      },
      beforeEnter(to, from, next) {
        const status = currentUser();
        if (status) {
          next({ name: 'admin' });
        } else {
          next();
        }
      }
    },
    {
      path: '/setting',
      name: 'ProfileSettingAdmin',
      component: lazily.ProfileSettingAdmin,
      meta: {
        statusAdmin: true,
        title: 'Profile Setting Admin'
      }
    },
    {
      path: '*',
      component: lazily.NotFound,
      meta: {
        statusAdmin: true,
        title: 'Page Not Found'
      }
    }
  ]
});
