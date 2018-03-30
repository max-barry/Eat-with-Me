import gql from 'graphql-tag';

export const RESTAURANT_FRAGMENT = {
    fragment: gql`
        fragment RestaurantBasic on Restaurant {
            __typename
            id
            name
            likes
            slug
        }
    `,
    name: 'RestaurantBasic'
};
