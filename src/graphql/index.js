import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import resolvers from './graphql.state/resolvers';
import defaults from './graphql.state/defaults';
import { GRAPHQL_SERVER_ENDPOINT } from '../settings/application';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: GRAPHQL_SERVER_ENDPOINT
});

const stateLink = withClientState({
    cache,
    resolvers,
    defaults
    // defaults: {}
});

export default new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, httpLink]),
    addTypename: true
});
