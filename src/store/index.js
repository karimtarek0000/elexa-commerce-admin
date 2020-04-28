import Vue from 'vue';
import Vuex from 'vuex';
import Admin from './Admin/index';
import Shared from './Shared/index';

//
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  modules: {
    Admin,
    Shared
  }
});
