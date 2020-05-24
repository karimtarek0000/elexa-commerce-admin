import * as lazily from '@/router/Lazilye/index.js';

export default [
  {
    path: '*',
    component: lazily.NotFound,
    meta: {
      statusAdmin: true,
      title: 'Page Not Found'
    }
  }
];
