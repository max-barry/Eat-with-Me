import React from 'react';
import firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import {
    FIREBASE_AUTH_CLIENT_ID,
    FIREBASE_AUTH_METHOD
} from '../../settings/apis';

export default props => (
    <FirebaseAuth
        uiConfig={{
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    authMethod: FIREBASE_AUTH_METHOD,
                    clientId: FIREBASE_AUTH_CLIENT_ID
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
