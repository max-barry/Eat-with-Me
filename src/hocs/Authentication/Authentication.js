import React from 'react';

import firebase from 'firebase/app';
import { Query } from 'react-apollo';
import { lifecycle, compose, withState } from 'recompose';

import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';

export const AuthenticationContext = React.createContext(null);

const authenticationStateHandlers = withState(
    'firebaseAuth',
    'setFirebaseState',
    null
);

const authenticationLifecycles = lifecycle({
    componentDidMount() {
        // TODO : Handle a delete auth or logout
        firebase.auth().onAuthStateChanged(this.props.setFirebaseState);
    }
});

const AuthProviderEnhancements = compose(
    authenticationStateHandlers,
    authenticationLifecycles
);

// TODO : Handle the loading and error states for this data loading
const AuthProviderComponent = ({ children, firebaseAuth, ...props }) => (
    <Query
        query={GET_USER_PROFILE}
        variables={{
            id: firebaseAuth ? firebaseAuth.uid : null,
            skip: !firebaseAuth
        }}
    >
        {({ data = {}, ...query }) => {
            return (
                <AuthenticationContext.Provider
                    value={{ user: data.user, query }}
                >
                    {children}
                </AuthenticationContext.Provider>
            );
        }}
    </Query>
);

export const AuthenticationProvider = AuthProviderEnhancements(
    AuthProviderComponent
);

export const AuthenticationConsumer = Component => props => (
    <AuthenticationContext.Consumer>
        {({ user, query }) => (
            <Component {...props} user={user} userQuery={query} />
        )}
    </AuthenticationContext.Consumer>
);
