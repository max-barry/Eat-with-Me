// Various content of our register component
import React from 'react';

import firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const RegisterFirebaseUI = _ => (
    <FirebaseAuth
        uiConfig={{
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
            // credentialHelper: 'googleyolo',
            callbacks: {
                signInSuccess: () => false
            }
        }}
        firebaseAuth={firebase.auth()}
    />
);

export default RegisterFirebaseUI;
