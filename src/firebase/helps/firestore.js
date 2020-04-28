// INIT FIREBASE
import { db } from '../init';

//// ALL FUNCTIONS HELPS FIREBASE
// GET DATA
const getData = (nameCollection, nameDoc) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .get();
};

// ADD DATA
const setData = (nameCollection, nameDoc, data) => {
  return db
    .collection(nameCollection)
    .doc(nameDoc)
    .set(data);
};

//
const whereAndGet = (nameCollection, nameWhere, equalData) => {
  return db
    .collection(nameCollection)
    .where(nameWhere, '==', equalData)
    .get();
};

export { getData, setData, whereAndGet };
