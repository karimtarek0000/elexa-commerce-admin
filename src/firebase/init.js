import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA_cBJxKBTkiK3Q5EZ5vS-VVQfWkBHv2W4',
  authDomain: 'elaxa-commerce.firebaseapp.com',
  databaseURL: 'https://elaxa-commerce.firebaseio.com',
  projectId: 'elaxa-commerce',
  storageBucket: 'elaxa-commerce.appspot.com',
  messagingSenderId: '1053337600470',
  appId: '1:1053337600470:web:867620319b96bb7ef4e477'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ALL EXPORTS
export const db = firebase.firestore();
export const auth = firebase.auth();
