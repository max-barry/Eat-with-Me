import gql from 'graphql-tag';

export const USER_FRAGMENT = {
    fragment: gql`
        fragment UserBasic on User {
            id
            likes
            username
        }
    `,
    name: 'UserBasic'
};

export const GET_USER_PROFILE = gql`
    query GetUserProfile($id: ID!, $skip: Boolean = false) {
        user(id: $id) @skip(if: $skip) {
            ...${USER_FRAGMENT.name}
        }
    }
    ${USER_FRAGMENT.fragment}
`;
