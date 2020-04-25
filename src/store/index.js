import Vue from 'vue';
import Vuex from 'vuex';
import Admin from './Admin/index';
import { getData, setData } from '../firebase/helps/firestore';
import { createUser } from '../firebase/helps/firebaseauth';
import { NAMECOLLECTIONID, NAMECOLLECTIONPROFILEADMIN, NAMEDOCID } from '../store/Type/index';

//
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    check: false
  },
  mutations: {},
  actions: {
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
    }
  },
  modules: {
    Admin
  }
});
