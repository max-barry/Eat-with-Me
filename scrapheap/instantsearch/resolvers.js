const TYPENAME = 'SearchState';

export const defaults = {
    searchState: {
        __typename: TYPENAME,
        state: null
    }
};

export default {
    Mutation: {
        updateSearchState: (_, { state }, { cache }) => {
            const data = {
                searchState: {
                    __typename: TYPENAME,
                    state: JSON.stringify(state)
                }
            };
            cache.writeData({ data });
            return null;
        }
    }
};
