import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './components/GlobalComponents/Admin/index';
import { auth } from '@/firebase/init.js';
import { currentUser } from '@/firebase/helps/firebaseauth';

//
Vue.config.productionTip = false;

// IMPORT MIXINS
import allMixins from './mixin/Shared/index';

// RENDER ALL MIXINS GLOBAL
allMixins.forEach(nameMixin => {
  Vue.mixin(nameMixin);
});

// RENDER ALL COMPONENTS GLOBAL
components.forEach(comp => {
  Vue.component(comp.name, comp);
});

// GARDS - BEFORE EACH
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(cur => cur.meta.statusAdmin)) {
//     const status = currentUser();
//     if (status) {
//       next();
//     } else {
//       next({ name: 'Register' });
//     }
//   } else {
//     next();
//   }
// });

// GARDS - AFTER EACH
router.afterEach((to, from) => {
  // DEFAULT TITLE
  const defaultTitle = 'none';

  // NEXT TICK
  Vue.nextTick(() => {
    document.title = to.meta.title || defaultTitle;
  });
});

// ON AUTH STATE CHANGED WILL BE RENDER VUE SIGN IN OR SIGN UP
let app = null;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});

////////////////////////
/// Target
// var test = { a: 1, b: 2, c:3 };
// var test1 = {a: 3, b: 2, c:5 };

// const newResult = Object.assign(test, test1); // target and source

// console.log(newResult);

/// Clone
// var newClone = Object.assign({}, test);

// newClone.a = 10;

// console.log(newClone.a);
// console.log(test.a);

/// Mearging
// var test = { a: 1 };
// var test1 = { b: 2 };
// // var test2 = { c: 3 };

// var test5 = Object.assign(test, test1);

// console.log(test5);
// console.log(test);

/// Merging Objects With Same Properties Target
// var test = { a: 1, b: 2, c: 3};
// var test1 = { a: 10, b: 20, c: 35};
// var test2 = { a: 12, b: 122, c: 44};

// const d = Object.assign({}, test, test1, test2);

// console.log(d);
// console.log(test);

// Easy Way remove any Property From Object
// var data1 = [{ name: 'x', age: 22, car: 'bmw', id: 122 }].map( ({ name, ...reset }) => reset)[0];

// console.log(data1);
