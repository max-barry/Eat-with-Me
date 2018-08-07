import {
    path,
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
    isPreload: state => path(['cuisinesIsPreload'], state),
    isLoading: state => path(['cuisinesIsLoading'], state),
    isFound: state => path(['cuisines', 'length'], state),
    getArray: state => path(['cuisines'], state) || []
};

cuisine.hasLoaded = createSelector(
    [cuisine.isPreload, cuisine.isLoading, cuisine.isFound],
    (preload, loading, found) => !preload && !loading && found
);

cuisine.isFavorite = createSelector(
    [cuisine.getArray],
    filter(prop('favorites'))
);

cuisine.isNational = createSelector(
    [cuisine.getArray],
    filter(prop('national'))
);

cuisine.isGenre = createSelector([cuisine.getArray], filter(prop('genre')));

const restaurant = {
    getRestaurant: identity,
    hasLoaded: id => {
        console.log(id);
        return false;
    },
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

export { cuisine as cuisineSelectors };
