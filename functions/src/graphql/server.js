import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { printSchema } from 'graphql/utilities/schemaPrinter';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
// const graphiqlExpress = require('apollo-server-express').graphiqlExpress;
// const ApolloEngine = require('apollo-engine').ApolloEngine;

import schema from './schema';
import { firestore } from '../firebase/setup';
import {
    COLLECTION_RESTAURANT,
    COLLECTION_USER
} from '../firebase/firestore/constants';

const setupGraphQLServer = () => {
    // setup server
    const graphQLServer = express();

    // Cors setup
    // TODO : Make this secure
    graphQLServer.use(cors());

    // /api/graphql
    graphQLServer.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({
            schema,
            context: {
                db: firestore,
                restaurantRef: firestore.collection(COLLECTION_RESTAURANT),
                userRef: firestore.collection(COLLECTION_USER),
                throwMissing: () => {
                    throw new Error('Could not find');
                },
                throwBadRequest: () => {
                    throw new Error('Request not properly formed');
                }
            },
            tracing: false,
            cacheControl: false
        })
    );

    // /api/graphiql
    graphQLServer.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/eat-with-me-alpha/us-central1/api/graphql'
        })
    );

    // /api/schema
    graphQLServer.use('/schema', (req, res) => {
        res.set('Content-Type', 'text/plain');
        res.send(printSchema(schema));
    });

    // const engine = new ApolloEngine({
    //     apiKey: 'service:max-barry-685:B5aSiMIYx8C-ZgbpGjEW2A'
    // });
    // graphQLServer.use(engine.expressMiddleware());

    // return engine.listen({
    //     port: 3000,
    //     expressApp: app,

    //     // GraphQL endpoint suffix - '/graphql' by default
    //     graphqlPaths: ['/graphql', '/special-graphql'],
    //   });

    return graphQLServer;
};

export default setupGraphQLServer;
