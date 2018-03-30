import gql from 'graphql-tag';

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
