// ALL IMPORT COMPONENTS
import Admin from '@/views/Admin/index.vue';
import Products from '@/views/Admin/products/index.vue';
import Category from '@/views/Admin/category/index.vue';
import Home from '@/views/Admin/home/index.vue';
import Register from '@/views/Admin/Register/index.vue';

//
export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'products',
        name: 'products',
        component: Products
      },
      {
        path: 'category',
        name: 'category',
        component: Category
      }
    ]
  },
  {
    path: '/admin/register',
    name: 'Register',
    component: Register
  }
];
