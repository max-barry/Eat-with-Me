import { firestore } from 'firebase-functions';

import { COLLECTION_USER, COLLECTION_USERNAME } from './constants';

import { db } from '../setup';

export const onUsernameSet = firestore
    .document(`${COLLECTION_USERNAME}/{username}`)
    .onWrite((change, context) => {
        // Get the username from params
        const username = context.params.username;
        // Get the user ID against this user
        const userId = change.after.data().user;
        // Set the username to the user
        return db
            .collection(COLLECTION_USER)
            .doc(userId)
            .set({ username }, { merge: true });
    });
