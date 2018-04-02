import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { compose, branch, withPropsOnChange } from 'recompose';

import { USER_FRAGMENT } from '../fragments';

const QUERY_NAME = 'getUserProfile';

export const GET_FIREBASE_UID = gql`
    {
        FIREBASE_USER_UID @client
    }
`;

export const GET_USER_PROFILE = gql`
    query GetUserProfile($id: ID!) {
        getUserProfile(id: $id) {
            ...${USER_FRAGMENT.name}
        }
    }
    ${USER_FRAGMENT.fragment}
`;

export const gqlUserProfile = graphql(GET_USER_PROFILE, {
    name: QUERY_NAME,
    options: ({ getFirebaseUid }) => ({
        variables: { id: getFirebaseUid.FIREBASE_USER_UID }
    })
});

export default compose(
    graphql(GET_FIREBASE_UID, { name: 'getFirebaseUid' }),
    branch(
        ({ getFirebaseUid }) =>
            !!(getFirebaseUid && getFirebaseUid.FIREBASE_USER_UID),
        compose(
            gqlUserProfile,
            withPropsOnChange([QUERY_NAME], props => ({
                user: props.getUserProfile.getUserProfile
            }))
        )
    )
);
