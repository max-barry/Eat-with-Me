import React from 'react';

import { withHandlers, compose } from 'recompose';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';

import { AuthenticationConsumer } from '../../hocs/Authentication';
import urls from '../../settings/urls';
import RegisterUsername from './RegisterUsername';
import RegisterFirebaseUI from './RegisterSignIn';

Modal.setAppElement('#root');

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
            {JSON.stringify(user)}
            {modalContent}
        </Modal>
    );
};

const enhance = compose(
    AuthenticationConsumer,
    withHandlers({
        closeModal: ({ history }) => event => history.push(urls.HOME)
    })
);

export default enhance(Register);
