//
import * as Type from '@/store/Type/index';

//
export default {
  // GET ALL CATEGORY
  [Type.GET_ALL_CATEGORY](state) {
    return state.allCategory;
  },
  // GET ALL ITEMS
  [Type.GET_ALL_ITEMS](state) {
    return state.allItems;
  }
};
