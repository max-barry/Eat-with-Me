import userQueries from './resolvers/queries.users';
import usernameQueries from './resolvers/queries.usernames';
import restaurantQueries from './resolvers/queries.restaurants';
import restaurantMutations from './resolvers/mutations.restaurants';
import collectionMutations from './resolvers/mutations.collections';
import usernameMutations from './resolvers/mutations.usernames';

const Queries = {
    ...restaurantQueries,
    ...userQueries,
    ...usernameQueries
};

const Mutations = {
    ...restaurantMutations,
    ...collectionMutations,
    ...usernameMutations
};

const resolveFunctions = {
    Query: Queries,
    Mutation: Mutations
};

export default resolveFunctions;
