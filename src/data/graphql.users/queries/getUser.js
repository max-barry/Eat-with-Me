import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../fragments';

export const GET_USER_PROFILE = gql`
    query GetUserProfile($id: ID!) {
        userProfile(id: $id) {
            ...${USER_FRAGMENT.name}
        }
    }
    ${USER_FRAGMENT.fragment}
`;
