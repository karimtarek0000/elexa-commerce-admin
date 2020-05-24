// ALL IMPORT COMPONENTS
import Home from '@/views/EndUser/Home.vue';
import About from '@/views/EndUser/About.vue';

//
export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Elexa'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];
