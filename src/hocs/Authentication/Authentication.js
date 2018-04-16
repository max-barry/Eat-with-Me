import React, { createElement } from 'react';

import firebase from 'firebase/app';
import { withApollo } from 'react-apollo';
import { lifecycle, withHandlers, withStateHandlers, compose } from 'recompose';

import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';

export const AuthenticationContext = React.createContext(null);

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
        setDatabaseState(response.data.user);
    }
});

const authenticationLifecycles = lifecycle({
    componentDidMount() {
        // TODO : Handle a delete auth or logout
        firebase.auth().onAuthStateChanged(this.props.onFirebaseAuthChange);
    }
});

const AuthProviderEnhancements = compose(
    withApollo,
    authenticationStateHandlers,
    authenticationHandlers,
    authenticationLifecycles
);

const AuthProviderComponent = ({ children, databaseAuth }) => (
    <AuthenticationContext.Provider value={databaseAuth}>
        {children}
    </AuthenticationContext.Provider>
);

export const AuthenticationProvider = AuthProviderEnhancements(
    AuthProviderComponent
);

export const AuthenticationConsumer = Component => props => (
    <AuthenticationContext.Consumer>
        {user => <Component {...props} user={user} />}
    </AuthenticationContext.Consumer>
);
