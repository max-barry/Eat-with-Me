import { createAction } from 'redux-actions';
import * as types from './restaurants.types';
import { cuisineSelectors } from './restaurants.selectors';
import { fetchFromApi } from '../shared.actions';
import { FIRESTORE_COLLECTION_CATEGORY_GROUPS } from '../../../settings';

// @link https://github.com/redux-utilities/redux-actions/issues/61
// @link https://stackoverflow.com/a/42982806

const { FETCH_CUISINES } = types;
const { get, hasLoaded } = cuisineSelectors;

export const fetchCuisines = args => (dispatch, getState) => {
    const state = getState();
    const isCached = hasLoaded(state);

    dispatch({
        type: FETCH_CUISINES,
        payload: isCached
            ? Promise.resolve(get(state))
            : fetchFromApi(FIRESTORE_COLLECTION_CATEGORY_GROUPS)
    });
};
