import { createAction } from 'redux-actions';
import * as types from './collections.types';
import { collectionSelectors } from './collections.selectors';
import { fetchFromApi } from '../shared.actions';
import { FIRESTORE_COLLECTION_COLLECTIONS } from '../../../settings';

const { UPDATE_COLLECTION, FETCH_COLLECTION, CREATE_COLLECTION } = types;

// export const setActiveCollection = createAction(
//     FETCH_COLLECTION,
//     id =>
//         id
//             ? fetchFromApi(FIRESTORE_COLLECTION_COLLECTIONS, id)
//             : Promise.resolve(EMPTY_COLLECTION)
// );

// export const createNewCollection = createAction(
//     CREATE_COLLECTION,
//     _ => EMPTY_COLLECTION
// );

export const updateNewCollectionName = createAction(
    UPDATE_COLLECTION,
    (id, name) => ({ id, name })
);

export const updateActiveCollectionRestaurants = createAction(
    UPDATE_COLLECTION,
    (id, restaurants) => ({ id, restaurants })
);

// export const updateActiveCollectionName = name => (dispatch, getState) => {
//     dispatch({
//         type
//     });
// };
