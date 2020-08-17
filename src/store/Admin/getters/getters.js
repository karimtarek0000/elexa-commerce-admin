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
  },
  // GET ACTIONS CONFIRM ALERT
  [Type.GET_ACTIONS_CONFIRM_ALERT](state) {
    return state.actionConfirmAlert;
  }
};
