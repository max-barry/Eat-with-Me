import { createActions } from 'redux-actions';
import * as types from './restaurants.types';
import { cuisineSelectors, restaurantSelectors } from './restaurants.selectors';
import { fetchFromApi, fetchFromCache } from '../shared.actions';
import {
    FIRESTORE_COLLECTION_CATEGORY_GROUPS,
    FIRESTORE_COLLECTION_RESTUARANTS
} from '../../../settings';

// @link https://github.com/redux-utilities/redux-actions/issues/61
// @link https://stackoverflow.com/a/42982806

const { FETCH_CUISINES, FETCH_RESTAURANT } = types;

const fetchCuisinesFromNetwork = () =>
    fetchFromApi(FIRESTORE_COLLECTION_CATEGORY_GROUPS);

const fetchRestaurantFromNetwork = id =>
    fetchFromApi(`${FIRESTORE_COLLECTION_RESTUARANTS}/${id}`);

export const {
    app: {
        restaurants: { fetchCuisines, fetchRestaurant }
    }
} = createActions({
    [FETCH_CUISINES]: fetchFromCache(
        cuisineSelectors.hasLoaded,
        fetchCuisinesFromNetwork
    ),
    [FETCH_RESTAURANT]: fetchFromCache(
        restaurantSelectors.hasLoaded,
        fetchRestaurantFromNetwork
    )
});
