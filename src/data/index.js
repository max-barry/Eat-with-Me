import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/eat-with-me-alpha/us-central1/api/graphql'
});

export default new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
