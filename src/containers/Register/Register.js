import React from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { renderComponent, compose, branch } from 'recompose';
import urls from '../../settings/urls';
import { withAuthenticationConsumer } from '../../hocs/Authentication';
import withModal from '../../hocs/Modal';

Modal.setAppElement('#root');

const RegisterUsername = renderComponent(
    Loadable({
        loader: _ => import('./RegisterUsername'),
        loading: () => <p>Loading register username</p>
    })
);
const RegisterFirebaseUI = renderComponent(
    Loadable({
        loader: _ => import('./RegisterSignIn'),
        loading: () => <p>Loading register firebase UI</p>
    })
);

// const RegisterUsernameHoc = renderComponent(RegisterUsername);
// const RegisterFirebaseUIHoc = renderComponent(RegisterFirebaseUI);
const RedirectHome = renderComponent(() => <Redirect to={urls.HOME} />);

const enhance = compose(
    withRouter,
    withAuthenticationConsumer,
    withModal({
        isOpen: true,
        contentLabel: 'Register',
        onClose: props => event => props.history.push(urls.HOME)
    }),
    branch(
        ({ auth: { user } }) => user && user.username,
        RedirectHome,
        branch(
            ({ auth: { user } }) => !!user,
            RegisterUsername,
            RegisterFirebaseUI
        )
    )
);

export default enhance();

// withModal

// withHandlers({
//     closeModal: ({ history }) => event => history.push(urls.HOME)
// })

// export default a;

// export default enhance(
//     branch(
//         ({ user: { user } }) => user && user.username,
//         RedirectHome,
//         branch(
//             ({ user: { user } }) => !!user,
//             RegisterUsernameHoc,
//             RegisterFirebaseUIHoc
//         )
//     )
// );

// const Register = ({ closeModal, history, user: { user } }) => {
//     // If we have a user and they have a username
//     // then we don't need to be on the register page
//     if (user && user.username) return <Redirect to={urls.HOME} />;

//     // Otherwise we don't have a user or the username is lacking a username
//     const modalContent = !user ? (
//         <RegisterFirebaseUI />
//     ) : (
//         <RegisterUsername user={user} />
//     );

//     return (
//         <Modal
//             isOpen={true}
//             contentLabel="Register"
//             onRequestClose={closeModal}
//         >
//             <button onClick={closeModal}>Close</button>
//             {JSON.stringify(user)}
//             {modalContent}
//         </Modal>
//     );
// };
