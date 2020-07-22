//
import { loopIntoCollections, createSubCollection, getAllDoc } from '@/firebase/helps/firestore';
import { addImageAndGetImage, deleteFile } from '@/firebase/helps/firestorage';
import * as Type from '@/store/Type/index';
import { db } from '@/firebase/init';
//
export default {
  // ADD CATEGORY
  [Type.ADD_AND_UPDATE_CATEGORY]({ commit, state }, nameDoc) {
    return new Promise((resolve, reject) => {
      // REF
      const ref = db.collection(Type.NAME_COLLECTION_CATEGORY).doc(nameDoc.toLowerCase());
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
  },
  // ADD PRODUCTS IN CATEGORY
  [Type.ADD_PRODUCT_IN_CATEGORY]({ commit }, info) {
    return new Promise((resolve, reject) => {
      createSubCollection(Type.NAME_COLLECTION_CATEGORY, info.nameDoc.toLowerCase(), info.name, info.data)
        .then(() => {
          // UPDATE ALL ITEMS
          commit(Type.SET_ALL_ITEMS, info.data);
          //
          resolve('create products successfully');
        })
        .catch(() => {
          reject('some error please try again!');
        });
    });
  },
  // PREVIEW IMAGE PRODUCTS
  [Type.PREVIEW_IMAGE_PRODUCT]({ commit }, dataImage) {
    return addImageAndGetImage(Type.FOLDER_NAME_STORAGE, dataImage);
  },
  // DELETE IMAGE
  [Type.DELETE_IMAGE]({ commit }, imageName) {
    return deleteFile(Type.FOLDER_NAME_STORAGE, imageName);
  },
  // GET ALL ITEMS CATEGORY
  async [Type.GET_ALL_ITEMS_CATEGORY]({ commit, state }) {
    //
    const getItems = await getAllDoc(Type.NAME_COLLECTION_CATEGORY);
    //
    getItems.forEach(doc => {
      for (const item of Object.values(doc.data())) {
        //
        commit(Type.SET_ALL_ITEMS, item);
        //
        commit('setEndIndex');
        // console.log(doc.id);
      }
    });
  }
};
