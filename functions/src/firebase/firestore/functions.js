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

// exports.dbWrite = functions.firestore.document('/path').onWrite((change, context) => {
//     const beforeData = change.before.data(); // data before the write
//     const afterData = change.after.data(); // data after the write
//   });
