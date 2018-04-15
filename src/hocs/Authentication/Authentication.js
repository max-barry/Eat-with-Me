import React, { createElement } from 'react';

// import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import {
    lifecycle,
    // withState,
    withHandlers,
    // shouldUpdate,
    // defaultProps,
    withStateHandlers,
    compose
} from 'recompose';
import firebase from 'firebase/app';

import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';

const authenticationStateHandlers = withStateHandlers(
    { firebaseAuth: null, databaseAuth: null },
    {
        setFirebaseState: props => firebaseAuthObject => ({
            firebaseAuth: firebaseAuthObject
        }),
        setDatabaseState: props => databaseAuthObject => ({
            databaseAuth: databaseAuthObject
        })
    }
);

const authenticationHandlers = withHandlers({
    onFirebaseAuthChange: ({
        setFirebaseState,
        setDatabaseState,
        client
    }) => async firebaseAuth => {
        // Update the state of the firebase auth object
        setFirebaseState(firebaseAuth);
        // Call Graphql with our new Firebase Auth UID
        // TODO : Secure this
        const response = await client.query({
            query: GET_USER_PROFILE,
            variables: { id: firebaseAuth.uid }
        });
        // Update the state of the database auth object
        setDatabaseState(response.data.userProfile);
    }
});

const authenticationLifecycles = lifecycle({
    componentDidMount() {
        // TODO : Handle a delete auth or logout
        firebase.auth().onAuthStateChanged(this.props.onFirebaseAuthChange);
    }
});

// const enhance = ;
// const enhance = compose(withApollo, AuthenticationLifecycles);

// const enhance = compose(withApollo, updateOnAuth);

export const AuthenticationContext = React.createContext(null);

export const AuthenticationProvider = compose(
    withApollo,
    authenticationStateHandlers,
    authenticationHandlers,
    authenticationLifecycles
)(({ children, databaseAuth }) => (
    <AuthenticationContext.Provider value={databaseAuth}>
        {children}
    </AuthenticationContext.Provider>
));

export const AuthenticationConsumer = propName => {
    const Component = props => (
        <AuthenticationContext.Consumer>
            {user => createElement(props[propName], { user, ...props })}
        </AuthenticationContext.Consumer>
    );
    Component.displayName = `authenticationConsumer(${propName})`;
    return Component;
};

// export default () => <Authentication />;

// const updateOnAuth = lifecycle({
//     componentDidMount() {
//         const { client } = this.props;
//         firebase.auth().onAuthStateChanged(authObject => {
//             client.writeData({
//                 data: {
//                     FIREBASE_USER_UID: authObject.uid
//                 }
//             });
//         });
//     }
// });

// const enhance = compose(withApollo, updateOnAuth);

// const Authentication = props => props.children;

// export default enhance(Authentication);
