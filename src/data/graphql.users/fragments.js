import gql from 'graphql-tag';

export const USER_FRAGMENT = {
    fragment: gql`
        fragment UserBasic on User {
            id
            likes
        }
    `,
    name: 'UserBasic'
};
