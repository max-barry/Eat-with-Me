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

export const GET_RESTAURANT = gql`
    query GetRestaurant(
        $id: ID,
        $slug: String
    ) {
        restaurant (
            id: $id,
            slug: $slug
        ) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const GET_RESTAURANTS = gql`
    query GetRestaurants(
        $after: String = null,
        $orderBy: String = "-yelp_review_count",
        $limit: Int = 20
    ) {
        restaurants (
            after: $after,
            orderBy: $orderBy,
            limit: $limit
        ) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;
