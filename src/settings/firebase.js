import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

// Configure Firebase.
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDwMcRpOphCy_LbaCIqUxUQ7ab7bjDE8QA',
    authDomain: 'eat-with-me-alpha.firebaseapp.com'
};

export const FIREBASE_UI_CONFIG = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            authMethod: 'https://accounts.google.com',
            clientId:
                '735729979405-b4dt8g88logn2me2q8lmau7sdjavjc8a.apps.googleusercontent.com'
        }
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    signInSuccessUrl: '/'
    // callbacks: {
    //     // Avoid redirects after sign-in.
    //     signInSuccess: () => false
    // }
};

// Initialize
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();

export default firebase;
