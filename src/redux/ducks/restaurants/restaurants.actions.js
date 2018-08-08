import { createAction, createActions } from 'redux-actions';
import * as types from './restaurants.types';
import { cuisineSelectors, restaurantSelectors } from './restaurants.selectors';
import { fetchFromApi, fetchFromCache } from '../shared.actions';
import {
    FIRESTORE_COLLECTION_CATEGORY_GROUPS,
    FIRESTORE_COLLECTION_RESTUARANTS,
    SERVER_ENDPOINT
} from '../../../settings';

// @link https://github.com/redux-utilities/redux-actions/issues/61
// @link https://stackoverflow.com/a/42982806

const { FETCH_CUISINES } = types;

// TODO : Use createActions to combine the createAction together

export const fetchCuisinesFromNetwork = createAction(FETCH_CUISINES, args =>
    fetchFromApi(FIRESTORE_COLLECTION_CATEGORY_GROUPS)
);

export const fetchCuisines = args => (dispatch, getState) =>
    fetchFromCache(
        cuisineSelectors.hasLoaded,
        fetchCuisinesFromNetwork,
        dispatch,
        getState
    );
