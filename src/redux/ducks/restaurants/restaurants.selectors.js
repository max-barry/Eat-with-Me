import {
    path,
    pathOr,
    prop,
    filter,
    compose,
    join,
    invoker,
    propOr,
    head,
    identity
} from 'ramda';
import { createSelector } from 'reselect';
import { paths } from '../../../shared';

const cuisine = {
    isPreload: path(['restaurants', 'cuisinesIsPreload']),
    isLoading: path(['restaurants', 'cuisinesIsLoading']),
    isFound: state => {
        // console.log(state);
        return path(['restaurants', 'cuisines', 'length'], state);
    },
    get: pathOr([], ['restaurants', 'cuisines'])
};

cuisine.hasLoaded = createSelector(
    [cuisine.isPreload, cuisine.isLoading, cuisine.isFound],
    (preload, loading, found) => {
        // console.log('Checking if loaded');
        // console.log(preload, loading, found);
        return !preload && !loading && found;
    }
);

cuisine.isFavorite = createSelector(cuisine.get, filter(prop('favorites')));
cuisine.isNational = createSelector(cuisine.get, filter(prop('national')));
cuisine.isGenre = createSelector(cuisine.get, filter(prop('genre')));

export { cuisine as cuisineSelectors };

const restaurant = {
    getRestaurant: identity,
    makeStrap: compose(
        join(' • '),
        paths([
            ['all_category_groups', 0, 'category'],
            ['micro_neighborhood', 'name']
        ])
    ),
    makeTag: compose(
        invoker(1, 'toFixed')(2),
        propOr(0, 'ewm_score')
    ),
    makeImg: compose(
        head,
        propOr([], 'yelp_photos')
    )
};

restaurant.makeCard = createSelector(
    [
        restaurant.getRestaurant,
        restaurant.makeStrap,
        restaurant.makeTag,
        restaurant.makeImg
    ],
    (resturant, strap, tag, img) => ({
        strap,
        img,
        tag,
        title: resturant.name,
        deck: 'This is where the deck will go'
    })
);

export { restaurant as restaurantSelectors };
