const functions = require('firebase-functions');

const { COLLECTION_USER } = require('../firestore/constants');
const { firestore } = require('../setup');

// exports.authAction = functions.auth.user().onCreate((userRecord, context) => {
//     const creationTime = userRecord.metadata.creationTime; // 2016-12-15T19:37:37.059Z
//     const lastSignInTime = userRecord.metadata.lastSignInTime; // 2018-01-03T16:23:12.051Z
//   }

exports.onUserCreated = functions.auth.user().onCreate((userRecord, context) =>
    firestore
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .set(
            {
                enabled: true
            },
            { merge: true }
        )
);

exports.onUserDeleted = functions.auth.user().onDelete((userRecord, context) =>
    firestore
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .update({
            enabled: false
        })
);
