import gql from 'graphql-tag';

import { COLLECTIONS_FRAGMENT } from '../fragments';

export const GET_COLLECTIONS = gql`
    query GetCollections(
        $user: String
        $username: String
    ) {
        collections (
            user: $user
            username: $username
        ) {
            ...${COLLECTIONS_FRAGMENT.name}
        }
    }
    ${COLLECTIONS_FRAGMENT.fragment}
`;
