import { getData, setData, whereAndGet } from '@/firebase/helps/firestore';
import { createUser, signIn, signOut, currentUser } from '@/firebase/helps/firebaseauth';
import * as Type from '@/store/Type/index';

export default {
  // CHECK INFO
  async [Type.CHECK_INFO](context, info) {
    let getId, getName;
    // GET DATA ID SIGN UP
    await getData(Type.NAME_COLLECTION_ID, Type.NAME_DOC_ID).then(doc => (getId = doc.data().idSignUp));
    // GET DOC FROM PROFILES ADMIN
    await getData(info.nameCollection, info.nameDoc).then(doc => (getName = doc));
    // RETURN
    return { getId, getName };
  },
  // CREATE NEW ACCOUNT
  [Type.CREATE_NEW_ACCOUNT](context, info) {
    return createUser(info.email, info.password);
  },
  // CREATE PROFILE USER
  [Type.CREATE_PROFILE_USER](context, info) {
    return setData(info.nameCollection, info.nameProfile, info.dataProfile);
  },
  //
  async [Type.GET_DATA_USER](context, info) {
    let data = null;
    const uid = await currentUser().uid;
    await whereAndGet(info.nameCollection, info.nameWhere, uid).then(docs => {
      docs.forEach(doc => {
        data = doc.data();
      });
    });
    return data;
  },
  // ENTER SIGN IN
  [Type.ENTER_SIGN_IN](context, info) {
    return signIn(info.email, info.password);
  },
  // ENTER SIGN OUT
  [Type.EXIT_SIGN_OUT]() {
    return signOut();
  }
};
