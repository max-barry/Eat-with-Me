const functions = require('firebase-functions');

const setupGraphQLServer = require('./graphql/server');
const { onRestaurantLiked } = require('./firebase/firestore/functions');
const {
    onUserCreated,
    onUserDeleted
} = require('./firebase/fireauth/functions');

const GraphQLServer = setupGraphQLServer();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(GraphQLServer);

exports.onUserCreated = onUserCreated;
exports.onUserDeleted = onUserDeleted;
// exports.onRestaurantLiked = onRestaurantLiked;

// service:max-barry-685:B5aSiMIYx8C-ZgbpGjEW2A
