import functions from 'firebase-functions';

import {
    COLLECTION_USER,
    COLLECTION_COLLECTIONS
} from '../firestore/constants';
import { firestore } from '../setup';

// exports.authAction = functions.auth.user().onCreate((userRecord, context) => {
//     const creationTime = userRecord.metadata.creationTime; // 2016-12-15T19:37:37.059Z
//     const lastSignInTime = userRecord.metadata.lastSignInTime; // 2018-01-03T16:23:12.051Z
//   }

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

export const onUserCreated = functions.auth.user().onCreate(createUser);

export const onUserDeleted = functions.auth
    .user()
    .onDelete((userRecord, context) =>
        firestore
            .collection(COLLECTION_USER)
            .doc(userRecord.uid)
            .update({
                enabled: false
            })
    );
