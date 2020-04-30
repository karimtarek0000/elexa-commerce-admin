// ALL IMPORT COMPONENTS
import Admin from '@/views/Admin/index.vue';
import Products from '@/views/Admin/products/index.vue';
import Category from '@/views/Admin/category/index.vue';
import Home from '@/views/Admin/home/index.vue';
import Register from '@/views/Admin/Register/index.vue';
import ProfileSettingAdmin from '@/views/Admin/ProfileSetting/index.vue';
import { currentUser } from '@/firebase/helps/firebaseauth';

//
export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          statusAdmin: true,
          title: 'Home'
        }
      },
      {
        path: 'products',
        name: 'products',
        component: Products,
        meta: {
          statusAdmin: true,
          title: 'Products'
        }
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
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
    component: Register,
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
    component: ProfileSettingAdmin,
    meta: {
      statusAdmin: true,
      title: 'Profile Setting Admin'
    }
  }
];
