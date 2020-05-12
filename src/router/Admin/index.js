// ALL IMPORT COMPONENTS
// import * as lazilye from '@/router/Lazilye/Admin.js';
import { currentUser } from '@/firebase/helps/firebaseauth';

////////////////////////////////////////
// Admin
const Admin = resolve => {
  require.ensure(['@/views/Admin/index.vue'], () => {
    resolve(require('@/views/Admin/index.vue'));
  });
};
// Products
const Products = resolve => {
  require.ensure(['@/views/Admin/products/index.vue'], () => {
    resolve(require('@/views/Admin/products/index.vue'));
  });
};
// Category
const Category = resolve => {
  require.ensure(['@/views/Admin/category/index.vue'], () => {
    resolve(require('@/views/Admin/category/index.vue'));
  });
};
// Home
const Home = resolve => {
  require.ensure(['@/views/Admin/home/index.vue'], () => {
    resolve(require('@/views/Admin/home/index.vue'));
  });
};
// Register
const Register = resolve => {
  require.ensure(['@/views/Admin/Register/index.vue'], () => {
    resolve(require('@/views/Admin/Register/index.vue'));
  });
};
// ProfileSettingAdmin
const ProfileSettingAdmin = resolve => {
  require.ensure(['@/views/Admin/ProfileSetting/index.vue'], () => {
    resolve(require('@/views/Admin/ProfileSetting/index.vue'));
  });
};

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
