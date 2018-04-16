import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../fragments';

export const GET_USER_PROFILE = gql`
    query GetUserProfile($id: ID!, $skip: Boolean = false) {
        user(id: $id) @skip(if: $skip) {
            ...${USER_FRAGMENT.name}
        }
    }
    ${USER_FRAGMENT.fragment}
`;
