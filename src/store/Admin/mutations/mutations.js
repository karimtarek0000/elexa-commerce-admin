//
import * as Type from '@/store/Type/index';
import state from '../state/state';
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
  // DELETE ALL PRODUCTS WITH CATEGORY
  [Type.DELETE_ALL_PRODUCTS_WITH_CATEGORY](state, nameCategory) {
    // REMOVE ALL PRODUCTS WITH NAME CATEGORY
    if (state.allItems.length !== 0) {
      state.allItems.forEach((item, index, array) => {
        if (item.nameCategory == nameCategory) array.splice(index, 1);
      });
    }
    // DELETE CATEGORY FROM ALL CATEGORY
    const indexCategory = state.allCategory.findIndex(category => category == nameCategory);
    state.allCategory.splice(indexCategory, 1);
  },
  // CHANGE ACTION CONFIRM ALERT
  [Type.CHANGE_ACTION_CONFIRM_ALERT](state, info) {
    const { messageConfirmAlert, titleBtnDelete } = info;
    return (state.actionConfirmAlert = { statusConfirmAlert: true, messageConfirmAlert, titleBtnDelete });
  },
  // CHNAGE STATUS BTN CONFIRM ALERT
  [Type.CHANGE_STATUS_BTN_CONFRIM_ALERT](state, status) {
    if (status) {
      state.confirmedDeleted = status;
      state.actionConfirmAlert.statusConfirmAlert = !status;
    } else {
      state.actionConfirmAlert.statusConfirmAlert = status;
    }
  },
  //
  [Type.CHNAGE_CONFIRMED_DELETE](state) {
    return (state.confirmedDeleted = false);
  },
  //
  setEndIndex(state) {
    return (state.countIndex += 1);
  }
};
