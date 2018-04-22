import React from 'react';

import { Query } from 'react-apollo';
import firebase from 'firebase/app';
import { lifecycle, compose, withState } from 'recompose';

import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';
import defineAbilityForUser from './abilities';

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
                    query,
                    firebaseAuthPreload,
                    firebaseAuthObj,
                    authLoaded: !firebaseAuthPreload && !query.loading,
                    ability:
                        !firebaseAuthPreload && !query.loading && data
                            ? defineAbilityForUser(data.user)
                            : null,
                    user: data.user
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
