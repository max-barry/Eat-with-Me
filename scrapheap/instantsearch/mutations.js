import gql from 'graphql-tag';

export const UPDATE_SEARCH_STATE = gql`
    mutation UpdateSearchState($state: State) {
        updateSearchState(state: $state) @client
    }
`;
