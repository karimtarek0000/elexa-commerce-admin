// ALL IMPORT COMPONENTS
import Admin from '@/views/Admin/index.vue'
import Products from '@/views/Admin/products/index.vue';
import Category from '@/views/Admin/category/index.vue';
import Home from '@/views/Admin/home/index.vue';

// 
export default [
    {
        path: '/admin',
        name: 'admin',
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
    }
]