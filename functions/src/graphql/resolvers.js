import userQueries from './resolvers/queries.users';
import restaurantQueries from './resolvers/queries.restaurants';
import restaurantMutations from './resolvers/mutations.restaurants';

const Queries = {
    ...restaurantQueries,
    ...userQueries
};

const Mutations = {
    ...restaurantMutations
};

const resolveFunctions = {
    Query: Queries,
    Mutation: Mutations
};

module.exports = resolveFunctions;
