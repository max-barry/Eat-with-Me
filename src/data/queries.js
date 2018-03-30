import gql from 'graphql-tag';

import { RESTAURANT_FRAGMENT } from './fragments';

export const GET_RESTAURANTS = gql`
    query GetRestaurants {
        restaurants {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const GET_RESTAURANT = gql`
    query GetRestaurant($id: ID, $slug: String) {
        restaurant(id: $id, slug: $slug) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;
