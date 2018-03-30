import gql from 'graphql-tag';

export const GET_RESTAURANTS = gql`
    query GetRestaurants {
        restaurants {
            __typename
            id
            name
            likes
        }
    }
`;

export const GET_RESTAURANT = gql`
    query GetRestaurant($id: ID!) {
        restaurant(id: $id) {
            __typename
            id
            name
            likes
        }
    }
`;
