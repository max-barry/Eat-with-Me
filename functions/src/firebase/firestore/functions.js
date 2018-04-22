import { firestore } from 'firebase-functions';

import {
    COLLECTION_USER,
    COLLECTION_USERNAME,
    COLLECTION_COLLECTIONS
} from './constants';

import { db } from '../setup';

export const onUsernameSetUpdateUser = firestore
    .document(`${COLLECTION_USERNAME}/{username}`)
    .onCreate((snap, context) => {
        // Get the username from params
        const username = context.params.username;
        // Get the user ID against this user
        const userId = snap.data().user;

        console.log(`${username} created for user ${userId}`);

        // Set the username to the user
        return db
            .collection(COLLECTION_USER)
            .doc(userId)
            .set({ username }, { merge: true });
    });

export const onUsernameSetUpdateCollections = firestore
    .document(`${COLLECTION_USERNAME}/{username}`)
    .onCreate(async (snap, context) => {
        // Get the username from params
        const username = context.params.username;

        // Get the user ID against this user
        const userId = snap.data().user;

        console.log(`Fetching collections for ${userId}`);

        // Get the collections for this user ID
        const collectionSnapshot = await db
            .collection(COLLECTION_COLLECTIONS)
            .where('user', '==', userId)
            .get();

        // If this user has no collections back out of here
        if (collectionSnapshot.empty)
            return console.log(`No collections found for ${userId}`);

        // Create a batch writer
        const writer = db.batch();
        // Loop over all the collections you found and update them with the username
        collectionSnapshot.forEach(collection => {
            console.log(`Collection ${collection.id} got username ${username}`);
            writer.update(collection, { username: username });
        });

        // Commit the batch write
        return batch.commit();
    });
