import React, { Component } from 'react';

import Modal from 'react-modal';
import { withHandlers, compose } from 'recompose';
import firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import urls from '../../settings/urls';

Modal.setAppElement('#root');

const Register = ({ closeModal, history }) => (
    <Modal isOpen={true} contentLabel="Register" onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
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
                credentialHelper: 'googleyolo',
                callbacks: {
                    // Avoid redirects after sign-in.
                    signInSuccess: () => history.push(urls.HOME)
                }
            }}
            firebaseAuth={firebase.auth()}
        />
    </Modal>
);

const enhance = compose(
    withHandlers({
        closeModal: ({ history }) => event => history.push(urls.HOME)
    })
);

export default enhance(Register);
