//
import * as Type from '@/store/Type/index';
//
export default {
  // CHANGE STATUS ASIDE
  [Type.CHANGE_STATUS_ASIDE](state, payload) {
    state.statusAside = payload;
  },
  // SET ALL CATEGORY
  [Type.SET_ALL_CATEGORY](state, payload) {
    state.allCategory.push(payload);
  }
};
