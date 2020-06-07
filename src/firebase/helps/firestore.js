// INIT FIREBASE
import { db } from '../init';

//// ALL FUNCTIONS HELPS FIREBASE

// GET DATA
const getData = (nameCollection, nameDoc = null) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .get();
};

// ADD DATA
const setData = (nameCollection, nameDoc, data = {}) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .set(data);
};

// ADD DATA
const createSubCollection = (nameCollection, nameDoc, name, data) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .set({ [name]: data }, { merge: true });
};

// LOOP INTO COLLECTIONS
const loopIntoCollections = nameCollection => {
  return db.collection(nameCollection).get();
};

// ON SNAP SHOT WILL BE WATCH UPDATE
const onSnapShot = (nameCollection, nameDoc) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .onSnapshot(snapshot => {
      snapshot.docChanges();
    });
};

// WHERE AND GET
const whereAndGet = (nameCollection, nameWhere, equalData) => {
  return db
    .collection(nameCollection)
    .where(nameWhere, '==', equalData)
    .get();
};

// ALL EXPORTS
export { getData, setData, whereAndGet, loopIntoCollections, onSnapShot, createSubCollection };
