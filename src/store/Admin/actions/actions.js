import { getData, setData } from '@/firebase/helps/firestore';
import { createUser, signIn } from '@/firebase/helps/firebaseauth';
import { NAMECOLLECTIONID, NAMECOLLECTIONPROFILEADMIN, NAMEDOCID } from '@/store/Type/index';

export default {
  // CHECK INFO
  async checkInfo(context, nameDoc) {
    let getId, getName;
    // GET DATA ID SIGN UP
    await getData(NAMECOLLECTIONID, NAMEDOCID).then(doc => (getId = doc.data().idSignUp));
    // GET DOC FROM PROFILES ADMIN
    await getData(NAMECOLLECTIONPROFILEADMIN, nameDoc).then(doc => (getName = doc));
    // RETURN
    return { getId, getName };
  },
  // CREATE NEW ACCOUNT
  createNewAccount(context, info) {
    return createUser(info.email, info.password);
  },
  // CREATE PROFILE USER
  createProfileUser(context, info) {
    return setData(NAMECOLLECTIONPROFILEADMIN, info.nameProfile, info.dataProfile);
  },
  // SIGN IN
  enterSignIn(context, info) {
    return signIn(info.email, info.password);
  }
};
