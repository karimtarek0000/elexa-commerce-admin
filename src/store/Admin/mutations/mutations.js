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
  // CHANGE NAME CATEGORY
  [Type.CHANGE_NAME_CATEGORY](state, info) {
    // GET INDEX NAME CATEGORY
    const indexNameCategory = state.allCategory.findIndex(category => category == info.oldNameCategory);
    // CHANGE NAME CATEGORY SPECIFIC INDEX
    state.allCategory[indexNameCategory] = info.newNameCategory;
    // IF ALL ITEMS LENGTH NOT EQUAL 0
    if (state.allItems.length !== 0) {
      // GET INDEX NAME CATEGORY FROM ITEMS
      state.allItems.forEach((item, index) => {
        // IF NAME CATEGORY EQUAL OLD NAME CATEGORY
        if (item.nameCategory == info.oldNameCategory) {
          // CHANGE NAME CATEGORY FROM ITEM SPECIFIC INDEX
          state.allItems[index].nameCategory = info.newNameCategory;
        }
      });
    }
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
