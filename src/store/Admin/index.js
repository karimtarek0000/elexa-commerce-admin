import state from './state/state';
import getters from './getters/getters';
import mutations from './mutations/mutations';
import actions from './actions/actions';

//
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
