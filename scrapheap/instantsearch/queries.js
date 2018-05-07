import gql from 'graphql-tag';

export const GET_SEARCH_STATE = gql`
    query {
        searchState @client {
            state
        }
    }
`;
