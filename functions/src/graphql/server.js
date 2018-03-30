const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const printSchema = require('graphql/utilities/schemaPrinter').printSchema;
const graphqlExpress = require('apollo-server-express').graphqlExpress;
const graphiqlExpress = require('apollo-server-express').graphiqlExpress;
// const ApolloEngine = require('apollo-engine').ApolloEngine;

const schema = require('./schema');
const firestore = require('../firebaseSetup').firestore;

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
                restaurantRef: firestore.collection('restaurants')
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

module.exports = setupGraphQLServer;
