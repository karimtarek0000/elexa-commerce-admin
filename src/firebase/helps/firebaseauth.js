//
import { auth } from '../init';

//
export const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
