import * as firebase from 'firebase/app';
import 'firebase/auth';
// import * as firebaseui from 'firebaseui';

// Configure Firebase.
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDwMcRpOphCy_LbaCIqUxUQ7ab7bjDE8QA',
    authDomain: 'eat-with-me-alpha.firebaseapp.com'
};

// Initialize
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();

export default firebase;
