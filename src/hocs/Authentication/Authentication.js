import React, { Component } from 'react';
import { Query } from 'react-apollo';
import firebase from 'firebase/app';
import { GET_USER_PROFILE } from '../../graphql/graphql.users/queries';
import defineAbilityForUser from './abilities';

export const AuthenticationContext = React.createContext(null);

// TODO : Optimise with a "withpropsonchange" (if you can without breaking router)
export const withAuthenticationConsumer = BaseComponent => props => (
    <AuthenticationContext.Consumer>
        {auth => <BaseComponent {...props} auth={auth} />}
    </AuthenticationContext.Consumer>
);

export const withAuthenticationProvider = BaseComponent => {
    return class extends Component {
        state = {
            firebaseAuthObj: null,
            firebaseAuthPreload: true
        };

        componentDidMount() {
            // TODO : Handle a delete auth or logout
            firebase.auth().onAuthStateChanged(firebaseAuthObj =>
                this.setState({
                    firebaseAuthObj,
                    firebaseAuthPreload: false
                })
            );
        }

        render() {
            const { firebaseAuthObj, firebaseAuthPreload } = this.state;
            return (
                <Query
                    query={GET_USER_PROFILE}
                    variables={{
                        id: firebaseAuthObj ? firebaseAuthObj.uid : null,
                        skip: !firebaseAuthObj
                    }}
                >
                    {({ data, ...query }) => (
                        <AuthenticationContext.Provider
                            value={{
                                query,
                                firebaseAuthPreload,
                                firebaseAuthObj,
                                authLoaded:
                                    !firebaseAuthPreload && !query.loading,
                                ability:
                                    !firebaseAuthPreload &&
                                    !query.loading &&
                                    data.user
                                        ? defineAbilityForUser(data.user)
                                        : null,
                                user: data.user
                            }}
                        >
                            <BaseComponent {...this.props} />
                        </AuthenticationContext.Provider>
                    )}
                </Query>
            );
        }
    };
};
