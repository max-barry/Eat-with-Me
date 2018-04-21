import { auth } from 'firebase-functions';

import {
    COLLECTION_USER,
    COLLECTION_COLLECTIONS
} from '../firestore/constants';
import { db } from '../setup';

const USER_DEFAULT_FIELDS = { enabled: true };

export const createUser = (userRecord, context) => {
    const { uid } = userRecord;
    // Create a batch writer
    const batch = db.batch();
    // Write a new user
    const userRef = db.collection(COLLECTION_USER).doc(uid);
    batch.set(userRef, USER_DEFAULT_FIELDS, { merge: true });
    // Write a "my favourites" collection
    const collectionRef = db.collection(COLLECTION_COLLECTIONS).doc();
    batch.set(collectionRef, {
        is_all_favourites: true,
        restaurants: [],
        private: false,
        owner: uid
    });

    return batch.commit();
};

export const onUserCreated = auth.user().onCreate(createUser);

export const onUserDeleted = auth.user().onDelete((userRecord, context) =>
    db
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .update({
            enabled: false
        })
);
