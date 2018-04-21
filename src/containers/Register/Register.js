import React from 'react';

import firebase from 'firebase/app';
import { withHandlers, compose } from 'recompose';

import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import { AuthenticationConsumer } from '../../hocs/Authentication';
import urls from '../../settings/urls';
import RegisterUsername from './RegisterUsername';

Modal.setAppElement('#root');

// Various content of our register component
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

const Register = ({ closeModal, history, user }) => {
    // If we have a user and they have a username
    // then we don't need to be on the register page
    if (user && user.username) return <Redirect to={urls.HOME} />;

    // Otherwise we don't have a user or the username is lacking a username
    const modalContent = !user ? (
        <RegisterFirebaseUI />
    ) : (
        <RegisterUsername user={user} />
    );

    return (
        <Modal
            isOpen={true}
            contentLabel="Register"
            onRequestClose={closeModal}
        >
            <button onClick={closeModal}>Close</button>
            {modalContent}
        </Modal>
    );
};

// );

const enhance = compose(
    AuthenticationConsumer,
    withHandlers({
        closeModal: ({ history }) => event => history.push(urls.HOME)
    })
);

export default enhance(Register);
