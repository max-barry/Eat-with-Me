import gql from 'graphql-tag';

export const GET_GOOGLE_PLACE = gql`
    query GetGooglePlace($place_id: ID) {
        googleplace(place_id: $place_id) @client {
            name
        }
    }
`;
