//
import * as Type from '@/store/Type/index';
//
export default {
  // CHANGE STATUS ASIDE
  [Type.CHANGE_STATUS_ASIDE](state, status) {
    state.statusAside = status;
  },
  // SET ALL CATEGORY
  [Type.SET_ALL_CATEGORY](state, category) {
    state.allCategory.push(category);
  },
  // SET ALL ITEMS
  [Type.SET_ALL_ITEMS](state, items) {
    state.allItems.push(items);
  },
  //
  setEndIndex(state) {
    return (state.countIndex += 1);
  }
};
