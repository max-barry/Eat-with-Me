import React, { Component } from 'react';

import Modal from 'react-modal';
import { withHandlers, compose } from 'recompose';

import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
// import * as firebaseui from 'firebaseui';
// import firebase, { FIREBASE_UI_CONFIG } from '../../settings/firebase';
import firebase, { auth } from '../../settings/firebase';

import urls from '../../settings/urls';

const FIREBASE_UI_CONFIG = {
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
    credentialHelper: firebase.auth.CredentialHelper.GOOGLE_YOLO,
    signInSuccessUrl: '/'
    // callbacks: {
    //     // Avoid redirects after sign-in.
    //     signInSuccess: () => false
    // }
};

// import { graphql, compose } from 'react-apollo';
// import { branch, renderComponent } from 'recompose';
// import { css } from 'react-emotion';

Modal.setAppElement('#root');

class Register extends Component {
    // Configure FirebaseUI.

    render() {
        const { closeModal } = this.props;
        return (
            <Modal
                isOpen={true}
                contentLabel="Register"
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>Close</button>
                <FirebaseAuth
                    uiConfig={FIREBASE_UI_CONFIG}
                    firebaseAuth={auth}
                />
            </Modal>
        );
    }
}

const enhance = compose(
    withHandlers({
        closeModal: ({ history }) => event => history.push(urls.HOME)
    })
);

export default enhance(Register);
