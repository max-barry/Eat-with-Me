import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

// import { QueryResolvers, MutationResolvers } from './resolvers';
// import typeDefs from './typeDefs';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/eat-with-me-alpha/us-central1/api/graphql'
});

const stateLink = withClientState({
    cache,
    resolvers: {
        // Query: QueryResolvers,
        // Mutation: MutationResolvers
    },
    defaults: {
        FIREBASE_USER_UID: null
        // getUserAuth: {
        //     __typename: 'getUserAuth',
        //     id: null
        // }
    }
});

export default new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, httpLink]),
    addTypename: true
});
