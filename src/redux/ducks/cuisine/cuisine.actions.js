import { createAction } from 'redux-actions';
import * as types from './cuisine.types';
import {
    SERVER_ENDPOINT,
    FIRESTORE_COLLECTION_CATEGORY_GROUPS
} from '../../../settings/apis';
import { cuisineHasLoadedSelector as hasLoaded } from './cuisine.selectors';

// @link https://github.com/redux-utilities/redux-actions/issues/61
// @link https://stackoverflow.com/a/42982806

const fetchCuisinesFromApi = () =>
    fetch(`${SERVER_ENDPOINT}${FIRESTORE_COLLECTION_CATEGORY_GROUPS}`).then(
        response => response.json()
    );

export const fetchCuisines = createAction(
    types.FETCH_CUISINES,
    fetchCuisinesFromApi
);

export const fetchCuisinesFromCacheFirst = () => (dispatch, getState) => {
    if (hasLoaded(getState())) return Promise.resolve();
    return dispatch(fetchCuisines());
};

// const fetchCategoryGroups = () => (dispatch, getState) => {
//     console.log(dispatch);
//     console.log(getState);
//     // if (hasLoaded(getState())) return Promise.resolve();

//     return fetch(
//         `${SERVER_ENDPOINT}${FIRESTORE_COLLECTION_CATEGORY_GROUPS}`
//     ).then(response => response.json());
// };

// export const fetchCuisines = createAction(types.FETCH_CUISINES);
