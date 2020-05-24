export default {
  // CHANGE STATUS ASIDE
  chnageStatusAside(state, payload) {
    state.statusAside = payload;
  },
  // SET ALL CATEGORY
  setAllCategory(state, payload) {
    state.allCategory.push(payload);
  }
};
