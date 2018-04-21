import gql from 'graphql-tag';

export const CHECK_USERNAME_EXISTS = gql`
    query CheckUsernameExists($username: String!) {
        usernameExists(username: $username)
    }
`;
