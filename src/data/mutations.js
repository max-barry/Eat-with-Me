import gql from 'graphql-tag';
import set from 'lodash/set';

export const UPDATE_RESTAURANT_LIKES = gql`
    mutation UpdateRestaurantLikes($id: ID!) {
        like(id: $id) {
            __typename
            id
            name
            likes
        }
    }
`;

export const updateCacheArray = (query, key, cache, newItem) => {
    const oldData = cache.readQuery({
        query
    });
    const idx = oldData[key].findIndex(oldItem => oldItem.id === newItem.id);

    cache.writeQuery({
        query,
        data: set(oldData, `${key}[${idx}]`, newItem)
    });
};
