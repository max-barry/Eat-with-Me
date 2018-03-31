const functions = require('firebase-functions');

const { COLLECTION_USER } = require('../firestore/constants');
const { firestore } = require('../setup');

exports.onUserCreated = functions.auth.user().onCreate(event =>
    firestore
        .collection(COLLECTION_USER)
        .doc(event.data.uid)
        .set(
            {
                enabled: true
            },
            { merge: true }
        )
);

exports.onUserDeleted = functions.auth.user().onDelete(event =>
    firestore
        .collection(COLLECTION_USER)
        .doc(event.data.uid)
        .update({
            enabled: false
        })
);
