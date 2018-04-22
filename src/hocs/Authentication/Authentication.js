import React from 'react';

import firebase from 'firebase/app';
import { Query } from 'react-apollo';
import { lifecycle, compose, withState } from 'recompose';

import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';

export const AuthenticationContext = React.createContext(null);

const authenticationStateHandlers = withState(
    'firebaseAuth',
    'setFirebaseState',
    {
        firebaseAuthObj: null,
        firebaseAuthPreload: true
    }
);

const authenticationLifecycles = lifecycle({
    componentDidMount() {
        // TODO : Handle a delete auth or logout
        firebase.auth().onAuthStateChanged(firebaseAuthObj =>
            this.props.setFirebaseState({
                firebaseAuthObj,
                firebaseAuthPreload: false
            })
        );
    }
});

const AuthProviderEnhancements = compose(
    authenticationStateHandlers,
    authenticationLifecycles
);

// TODO : Handle the loading and error states for this data loading
const AuthProviderComponent = ({
    children,
    firebaseAuth: { firebaseAuthObj, firebaseAuthPreload },
    ...props
}) => (
    <Query
        query={GET_USER_PROFILE}
        variables={{
            id: firebaseAuthObj ? firebaseAuthObj.uid : null,
            skip: !firebaseAuthObj
        }}
    >
        {({ data = {}, ...query }) => (
            <AuthenticationContext.Provider
                value={{
                    user: data.user,
                    query,
                    firebaseAuthPreload,
                    firebaseAuthObj
                }}
            >
                {children}
            </AuthenticationContext.Provider>
        )}
    </Query>
);

export const AuthenticationProvider = AuthProviderEnhancements(
    AuthProviderComponent
);
// TODO : Optimise with a "withpropsonchange" (if you can without breaking router)
export const AuthenticationConsumer = Component => props => (
    <AuthenticationContext.Consumer>
        {auth => <Component {...props} user={{ ...auth }} />}
    </AuthenticationContext.Consumer>
);
