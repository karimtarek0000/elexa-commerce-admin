import { getData, setData, whereAndGet } from '@/firebase/helps/firestore';
import { createUser, signIn, signOut, currentUser } from '@/firebase/helps/firebaseauth';
import { NAMECOLLECTIONID, NAMEDOCID } from '@/store/Type/index';

export default {
  // CHECK INFO
  async checkInfo(context, info) {
    let getId, getName;
    // GET DATA ID SIGN UP
    await getData(NAMECOLLECTIONID, NAMEDOCID).then(doc => (getId = doc.data().idSignUp));
    // GET DOC FROM PROFILES ADMIN
    await getData(info.nameCollection, info.nameDoc).then(doc => (getName = doc));
    // RETURN
    return { getId, getName };
  },
  // CREATE NEW ACCOUNT
  createNewAccount(context, info) {
    return createUser(info.email, info.password);
  },
  // CREATE PROFILE USER
  createProfileUser(context, info) {
    return setData(info.nameCollection, info.nameProfile, info.dataProfile);
  },
  //
  async getDataUser(context, info) {
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
  enterSignIn(context, info) {
    return signIn(info.email, info.password);
  },
  // ENTER SIGN OUT
  exitSignOut() {
    return signOut();
  }
};
