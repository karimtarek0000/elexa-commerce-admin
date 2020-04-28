//
import { auth } from '../init';

// CREATE USER
const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// SIGN IN
const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// SIGN OUT
const signOut = () => {
  return auth.signOut();
};

//
const currentUser = () => {
  return auth.currentUser;
};

//

//
export { createUser, signIn, signOut, currentUser };
