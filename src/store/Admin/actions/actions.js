//
import { setData, loopIntoCollections } from '@/firebase/helps/firestore';
import * as Type from '@/store/Type/index';
import { db } from '@/firebase/init';

export default {
  // ADD CATEGORY
  [Type.ADD_AND_UPDATE_CATEGORY]({ commit, state }, nameDoc) {
    return new Promise((resolve, reject) => {
      // REF
      const ref = db.collection(Type.NAME_COLLECTION_CATEGORY).doc(nameDoc);
      // PROMISE
      ref
        .get()
        .then(doc => {
          if (!doc.exists) {
            ref.set({});
            // ADD IN ALL CATEGORY A NEW CATEGORY
            commit(Type.SET_ALL_CATEGORY, nameDoc);
            // WIIL BE RETURN RESOLVE
            resolve('create category successfully');
          } else {
            // WIIL BE RETURN REJECT
            reject('exists before please change name and add again');
          }
        })
        .catch(() => {
          // WILL BE RETURN REJECT
          reject('somthing error please check internet');
        });
    });
  },
  // GET ALL CATEGORY FROM FIREBASE
  [Type.GET_ALL_CATEGORY_FROM_DATABASE]({ commit }) {
    // WILL BE PROMISE RETURN RESOLVE OR REJECT
    return new Promise((resolve, reject) => {
      loopIntoCollections(Type.NAME_COLLECTION_CATEGORY).then(docs => {
        if (docs) {
          docs.forEach(doc => commit(Type.SET_ALL_CATEGORY, doc.id));
          resolve();
        } else {
          reject();
        }
      });
    });
  }
};
