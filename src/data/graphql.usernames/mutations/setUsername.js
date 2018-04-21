import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withHandlers, compose } from 'recompose';

export const SET_USER_USERNAME = gql`
    mutation SetUserUsername($user: String!, $username: String!) {
        setUsername(user: $user, username: $username)
    }
`;
