import gql from 'graphql-tag';

export const RESTAURANT_FRAGMENT = {
    fragment: gql`
        fragment RestaurantBasic on Restaurant {
            id
            name
            likes
            slug
            google_place_id
        }
    `,
    name: 'RestaurantBasic'
};
