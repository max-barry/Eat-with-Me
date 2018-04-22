import gql from 'graphql-tag';

export const COLLECTIONS_FRAGMENT = {
    fragment: gql`
        fragment CollectionBasic on Collection {
            user
            username
        }
    `,
    name: 'CollectionBasic'
};
