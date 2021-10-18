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
import allMixinsShared from './mixin/Shared/index';

// RENDER ALL MIXINS GLOBAL
allMixinsShared.forEach(nameMixin => {
  Vue.mixin(nameMixin);
});

// RENDER ALL COMPONENTS GLOBAL
components.forEach(comp => {
  Vue.component(comp.name, comp);
});

// GARDS - BEFORE EACH
router.beforeEach((to, from, next) => {
  if (to.matched.some(cur => cur.meta.statusAdmin)) {
    const status = currentUser();
    if (status) {
      next();
    } else {
      next({ name: 'register' });
    }
  } else {
    next();
  }
});

// GARDS - AFTER EACH
router.afterEach((to, from) => {
  // DEFAULT TITLE
  const defaultTitle = 'none';

  // NEXT TICK
  Vue.nextTick(() => {
    document.title = `Elexa - ${to.meta.title}` || defaultTitle;
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
