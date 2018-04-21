// const functions = require('firebase-functions');
import { auth } from 'firebase-functions';

import {
    COLLECTION_USER,
    COLLECTION_COLLECTIONS
} from '../firestore/constants';
import { firestore } from '../setup';

const USER_DEFAULT_FIELDS = { enabled: true };

export const createUser = (userRecord, context) => {
    const { uid } = userRecord;
    // Create a batch writer
    const batch = firestore.batch();
    // Write a new user
    batch
        .collection(COLLECTION_USER)
        .doc(uid)
        .set(USER_DEFAULT_FIELDS, { merge: true });
    // Write a "my favourites" collection
    batch
        .collection(COLLECTION_COLLECTIONS)
        .doc()
        .set({
            is_all_favourites: true,
            restaurants: [],
            private: false,
            owner: uid
        });

    return batch.commit();
};

export const onUserCreated = auth.user().onCreate(createUser);

export const onUserDeleted = auth.user().onDelete((userRecord, context) =>
    firestore
        .collection(COLLECTION_USER)
        .doc(userRecord.uid)
        .update({
            enabled: false
        })
);
