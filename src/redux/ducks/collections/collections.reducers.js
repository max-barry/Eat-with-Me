import { handleActions } from 'redux-actions';
import {
    FETCH_COLLECTION,
    UPDATE_COLLECTION,
    CREATE_COLLECTION
} from './collections.types';
import { notEmpty } from '../../../shared';
// import { EMPTY_COLLECTION } from './collections.actions';

export const EMPTY_COLLECTION = { id: 'NEW', name: '', restaurants: {} };

const initial = {
    newCollection: EMPTY_COLLECTION,
    collections: {}
};

export default handleActions(
    {
        // [CREATE_COLLECTION]: (state, {payload}) ({
        // })
        // [`${FETCH_COLLECTION}_FULFILLED`]: (state, { payload }) => {
        //     const newState = {
        //         collections: {
        //             ...state.collections,
        //             [payload.id]: payload
        //         }
        //     };
        //     return {
        //         ...state,
        //         ...newState
        //     };
        // },
        // [UPDATE_COLLECTION]: (state, { payload }) => {
        //     const id = payload.id;
        //     const current = state.collections[id];
        //     const newState = {
        //         collections: {
        //             ...state.collections,
        //             [id]: {
        //                 ...current,
        //                 ...payload
        //             }
        //         }
        //     };
        //     return {
        //         ...state,
        //         ...newState
        //     };
        // }
    },
    initial
);
