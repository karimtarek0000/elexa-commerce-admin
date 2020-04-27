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

//
const currentUser = () => {
  return auth.currentUser;
};

//
export { createUser, signIn, currentUser };
