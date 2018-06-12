import React from 'react';
import Loadable from 'react-loadable';
import {
    FACET_QUARTER,
    FACET_IS_BAR,
    FACET_CUISINE,
    FACET_PRICE
} from '../Filters.shared';

const FilterQuarter = Loadable({
    loader: _ => import('./Quarter'),
    loading: () => <p>Loading quarter filter</p>
});

const FilterIsBar = Loadable({
    loader: _ => import('./IsBar'),
    loading: () => <p>Loading barboi</p>
});

const FilterCuisine = Loadable({
    loader: _ => import('./Cuisine'),
    loading: () => <p>Loading cuisine filter</p>
});

const FilterPrice = Loadable({
    loader: _ => import('./Price'),
    loading: () => <p>Loading price filter</p>
});

export const facetDictionary = {
    [FACET_QUARTER]: FilterQuarter,
    [FACET_IS_BAR]: FilterIsBar,
    [FACET_CUISINE]: FilterCuisine,
    [FACET_PRICE]: FilterPrice
};
