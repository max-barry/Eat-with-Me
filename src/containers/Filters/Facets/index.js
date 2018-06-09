import React from 'react';
import Loadable from 'react-loadable';
import {
    FACET_QUARTER,
    // FACET_EXTRAS,
    FACET_CUISINE,
    FACET_PRICE
} from '../Filters.shared';

const FilterQuarter = Loadable({
    loader: _ => import('./Quarter'),
    loading: () => <p>Loading quarter filter</p>
});

const FilterExtras = Loadable({
    loader: _ => import('./Extra'),
    loading: () => <p>Loading extra filter</p>
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
    // [FACET_EXTRAS]: FilterExtras,
    [FACET_CUISINE]: FilterCuisine,
    [FACET_PRICE]: FilterPrice
};
