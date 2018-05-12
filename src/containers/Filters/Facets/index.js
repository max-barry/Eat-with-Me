import React from 'react';
import Loadable from 'react-loadable';
import { FACET_QUARTER, FACET_EXTRAS, FACET_CUISINE } from '../filters.shared';

const FilterQuarter = Loadable({
    loader: _ => import('./Quarter/Quarter'),
    loading: () => <p>Loading quarter filter</p>
});

const FilterExtras = Loadable({
    loader: _ => import('./Extra/Extra'),
    loading: () => <p>Loading extra filter</p>
});

const FilterCuisine = Loadable({
    loader: _ => import('./Cuisine/Cuisine'),
    loading: () => <p>Loading extra filter</p>
});

export const facetDictionary = {
    [FACET_QUARTER]: { component: FilterQuarter },
    [FACET_EXTRAS]: { component: FilterExtras },
    [FACET_CUISINE]: { component: FilterCuisine, modalAdvanced: true }
};
