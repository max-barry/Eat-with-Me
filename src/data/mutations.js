import gql from 'graphql-tag';
import set from 'lodash/set';

import { RESTAURANT_FRAGMENT } from './fragments';

export const UPDATE_RESTAURANT_LIKES = gql`
    mutation UpdateRestaurantLikes($id: ID!, $uid: String!) {
        updateLikes(id: $id, uid: $uid) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const updateCacheArray = (query, key, cache, newItem) => {
    // TODO : You might be able to use cache.readFragment
    const oldData = cache.readQuery({
        query
    });
    const idx = oldData[key].findIndex(oldItem => oldItem.id === newItem.id);

    cache.writeQuery({
        query,
        data: set(oldData, `${key}[${idx}]`, newItem)
    });
};
