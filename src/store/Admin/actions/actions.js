//
import { setData, loopIntoCollections } from '@/firebase/helps/firestore';
import { NAMECOLLECTIONCATEGORY } from '@/store/Type/index';
import { db } from '@/firebase/init';

export default {
  // ADD CATEGORY
  addAndUpdateCategory({ commit, state }, nameDoc) {
    //
    // if (state.allCategory.some(cur => cur === nameDoc)) return false;

    return new Promise((resolve, reject) => {
      const ref = db.collection(NAMECOLLECTIONCATEGORY).doc(nameDoc);

      ref
        .get()
        .then(doc => {
          if (!doc.exists) {
            ref.set({});
            // ADD IN ALL CATEGORY A NEW CATEGORY
            commit('setAllCategory', nameDoc);
            // WIIL BE RETURN RESOLVE
            resolve('done');
          } else {
            // WIIL BE RETURN REJECT
            reject('exists before please change name and add again');
          }
        })
        .catch(() => {
          reject('somthing error please check internet');
        });
    });

    // SET CATEGORY IN FIREBASE
    // await setData(NAMECOLLECTIONCATEGORY, nameDoc);
  },
  // GET ALL CATEGORY FROM DATA BASE
  getAllCategoryFromDatabase({ commit }) {
    loopIntoCollections(NAMECOLLECTIONCATEGORY).then(docs => {
      docs.forEach(doc => {
        commit('setAllCategory', doc.id);
      });
    });
  }
};
