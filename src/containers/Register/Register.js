import React, { Component } from 'react';

import Modal from 'react-modal';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { withHandlers, compose } from 'recompose';

import firebase, { FIREBASE_UI_CONFIG } from '../../settings/firebase';
import urls from '../../settings/urls';
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
                    firebaseAuth={firebase.auth()}
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
