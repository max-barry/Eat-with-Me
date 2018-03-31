import gql from 'graphql-tag';

import { RESTAURANT_FRAGMENT } from './fragments';

export const GET_RESTAURANTS = gql`
    query GetRestaurants {
        getRestaurants {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const GET_RESTAURANT = gql`
    query GetRestaurant($id: ID, $slug: String) {
        getRestaurant(id: $id, slug: $slug) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const GET_USER_AUTH = gql`
    query GetUserAuth {
        userAuth @client {
            __typename
            uid
            displayName
        }
    }
`;
