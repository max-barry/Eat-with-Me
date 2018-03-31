const functions = require('firebase-functions');

const { COLLECTION_RESTAURANT } = require('./constants');

const { auth } = require('../setup');

// exports.onRestaurantLiked = functions.firestore
//     .document(`${COLLECTION_RESTAURANT}/{restaurantId}`)
//     .onUpdate(event => {
//         // Get the previous and current data
//         // if ()
//         console.log(event);
//     });
