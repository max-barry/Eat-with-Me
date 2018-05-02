import gql from 'graphql-tag';

export const SET_USER_USERNAME = gql`
    mutation SetUserUsername($user: String!, $username: String!) {
        setUsername(user: $user, username: $username)
    }
`;
