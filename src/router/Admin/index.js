// ALL IMPORT COMPONENTS
import { currentUser } from '@/firebase/helps/firebaseauth';
import * as lazily from '@/router/Lazilye/index.js';

//
export default [
  {
    path: '/admin',
    component: lazily.Admin,
    children: [
      {
        path: '',
        name: 'home',
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
    path: '/admin/register',
    name: 'Register',
    component: lazily.Register,
    meta: {
      title: 'Admin Register'
    },
    beforeEnter(to, from, next) {
      const status = currentUser();
      if (status) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  },
  {
    path: '/admin/setting',
    name: 'ProfileSettingAdmin',
    component: lazily.ProfileSettingAdmin,
    meta: {
      statusAdmin: true,
      title: 'Profile Setting Admin'
    }
  }
];
