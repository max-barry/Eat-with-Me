import moize from 'moize';
import {
    connectRefinementList,
    connectToggleRefinement
} from 'react-instantsearch-dom';
import {
    filter,
    keys,
    pick,
    sortBy,
    prop,
    mapObjIndexed,
    is,
    ifElse,
    compose,
    isEmpty,
    map,
    path,
    not
} from 'ramda';
import Quarter, { FACET_QUARTER } from './Filters.Quarter';
import Cuisine, { FACET_CUISINE } from './Filters.Cuisine';
import Bar, { FACET_IS_BAR } from './Filters.Bar';
import Price, { FACET_PRICE } from './Filters.Price';
import mapLocationSvg from '../../../public/images/icons/map-location.svg';
import worldwideSvg from '../../../public/images/icons/worldwide.svg';
import moreSvg from '../../../public/images/icons/more.svg';

const VirtualList = connectRefinementList(() => null);
const VirtualToggle = connectToggleRefinement(() => null);

export const componentMap = {
    [FACET_QUARTER]: { toRender: Quarter, virtual: VirtualList },
    [FACET_CUISINE]: { toRender: Cuisine, virtual: VirtualList },
    [FACET_PRICE]: { toRender: Price, virtual: VirtualList },
    [FACET_IS_BAR]: {
        toRender: Bar,
        virtual: VirtualToggle,
        virtualProps: {
            value: 'false',
            defaultRefinement: true
        }
    }
    // [RESULTS_VIEW]: {}
};

export const componentMapArray = Object.entries(componentMap);

export const desktopNavigation = [
    ['Region', [FACET_QUARTER]],
    ['Cuisine', [FACET_CUISINE]],
    ['Price', [FACET_PRICE]],
    ['More filters', [FACET_IS_BAR]]
];

// TODO : Moize
export const mobileDrawerItems = fn => [
    {
        label: 'Region',
        icon: mapLocationSvg,
        onClick: () => fn(null, [FACET_QUARTER], true)
    },
    {
        label: 'Cuisine',
        icon: worldwideSvg,
        onClick: () => fn(null, [FACET_CUISINE], true)
    },
    {
        label: 'More filters',
        icon: moreSvg,
        onClick: () => fn(null, [FACET_IS_BAR, FACET_PRICE], true)
    }
];

/**
 * Run through an array of algolia items and return
 * an object with each label as a key and a true / false
 * value showing whether it is refined
 *
 * @param {array} items
 */
export const setInitialChecked = items =>
    Object.assign(
        {},
        ...items.map(item => ({
            [item.label]: item.isRefined
        }))
    );

export const clearChecked = items =>
    Object.assign(
        {},
        ...items.map(item => ({
            [item.label]: false
        }))
    );

// Bunch of curried utilities
const getItemsFromVirtuals = path(['state', 'props', 'items']);

const isVirtualList = compose(
    is(Array),
    getItemsFromVirtuals
);

const sortVirtualItems = compose(
    sortBy(prop('label')),
    getItemsFromVirtuals
);

const getCurrentToggle = path(['state', 'props', 'currentRefinement']);

export const formatPropsFromVirtuals = compose(
    map(ifElse(isVirtualList, sortVirtualItems, getCurrentToggle)),
    pick
);

export const renderedIsList = compose(
    is(Array),
    path(['props', 'items'])
);

export const getRefinedFromRendered = compose(
    keys,
    filter(Boolean),
    prop('state')
);

export const checkIfNewRefinements = mapObjIndexed(
    // Is this an array?
    ifElse(
        is(Array),
        // If it is an array, is it NOT empty?
        compose(
            not,
            isEmpty
        ),
        // Otherwise it's a bool, has bool changed from original value?
        (v, k) => v !== componentMap[k].virtualProps.defaultRefinement
    )
);

export const checkIfHasValue = moize.maxSize(5)(
    compose(
        // Filter the applied tracker values down to only true ones
        // and does that leave us with anything in the object?
        compose(
            not,
            isEmpty,
            filter(Boolean)
        ),
        // Pick the attributes we're interested in from the currently applied tracker
        pick
    )
);
