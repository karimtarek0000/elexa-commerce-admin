//
import { storage } from '../init';
import { genNameAndDateFile } from '../utillites/utillites';

// ADD IMAGE AND GET IMAGE
const addImageAndGetImage = async (folderName, file) => {
  // SEND IMAGE TO FIRESTORE
  const ref = storage.ref(`${folderName}/${genNameAndDateFile(file)}`);
  // GET IMAGE INFO
  return ref.put(file).then(res => res.ref.getDownloadURL());
};

// DELETE FILE
const deleteFile = (folderName, fileName) => {
  // PREPEAR REF
  return storage.ref(`${folderName}/${fileName}`).delete();
  //
};

// ALL EXPORT
export { addImageAndGetImage, deleteFile };
