import { path, prop } from 'ramda';
import { createSelector } from 'reselect';

const cuisinePreload = state => path(['cuisine', 'isPreload'], state);
const cuisineLoading = state => path(['cuisine', 'isLoading'], state);
const cuisineFound = state => path(['cuisine', 'result', 'length'], state);
const cuisineArray = state => path(['cuisine', 'result'], state) || [];

export const cuisineHasLoadedSelector = createSelector(
    [cuisinePreload, cuisineLoading, cuisineFound],
    (preload, loading, found) => !preload && !loading && found
);

export const cuisineFavoritesSelector = createSelector(
    [cuisineArray],
    cuisines => cuisines.filter(prop('favorites'))
);

export const cuisineNationalSelector = createSelector(
    [cuisineArray],
    cuisines => cuisines.filter(prop('national'))
);

export const cuisineGenreSelector = createSelector([cuisineArray], cuisines =>
    cuisines.filter(prop('genre'))
);
