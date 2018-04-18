import userQueries from './resolvers/queries.users';
import restaurantQueries from './resolvers/queries.restaurants';
import restaurantMutations from './resolvers/mutations.restaurants';
import collectionMutations from './resolvers/mutations.collections';

const Queries = {
    ...restaurantQueries,
    ...userQueries
    // ...collectionQueries
};

const Mutations = {
    ...restaurantMutations,
    ...collectionMutations
};

const resolveFunctions = {
    Query: Queries,
    Mutation: Mutations
};

export default resolveFunctions;
