import { auth } from 'firebase-functions';

import {
    COLLECTION_USER,
    COLLECTION_COLLECTIONS,
    COLLECTION_USERNAME
} from '../firestore/constants';
import { db } from '../setup';

const USER_DEFAULT_FIELDS = { enabled: true };

export const createUser = (userRecord, context) => {
    console.log(`Adding a new user ${userRecord.uid}`);

    return db
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .set(USER_DEFAULT_FIELDS, { merge: true });
};

export const onUserCreated = auth.user().onCreate(createUser);

export const onUserDeleted = auth.user().onDelete((userRecord, context) => {
    console.log(`Deleting user ${userRecord.uid}`);

    return db
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .update({
            enabled: false
        });
});

// We want to add an owner username to the collection
// let username = null;
// Check if a username exists for this user
// const usernameRef = db.collection(COLLECTION_USERNAME);
// Get our user's username (if it exists)
// const usernamesSnapshot = await usernameRef
//     .where('user', '==', uid)
//     .limit(1)
//     .get();

// if (!usernamesSnapshot.empty) {
//     username = usernamesSnapshot.docs[0].id;
// }

// console.log(`Fetched usernames for ${uid} and found ${username}`);

// Write a "my favourites" collection
// console.log(`Creating a basic collection`);
// const collectionRef = db.collection(COLLECTION_COLLECTIONS).doc();
// batch.set(collectionRef, {
//     is_all_favourites: true,
//     restaurants: [],
//     private: false,
//     user: uid,
//     username
// });
