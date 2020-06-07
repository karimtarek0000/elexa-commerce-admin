//
import { storage } from '../init';
import { genNameAndDateFile } from '../utillites/utillites';

// ADD IMAGE AND GET IMAGE
const addImageAndGetImage = (folderName, file) => {
  // PREPEAR REF
  const ref = storage.ref(`${folderName}/${genNameAndDateFile(file)}`);
  // GET IMAGE INFO
  return ref.put(file).then(res => res.ref.getDownloadURL());
};

// ALL EXPORT
export { addImageAndGetImage };
