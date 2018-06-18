import {
    prop,
    map,
    when,
    propEq,
    curry,
    lensProp,
    not,
    over,
    pluck,
    filter
} from 'ramda';

export const priceIntToSymbol = int => '£'.repeat(parseFloat(int), 10);

// Take all the items in an Algolia refinement (e.g. [{isRefined: false, label: ...}])
// MAP over it WHEN you reach the item with a label PROPEQ to the supplied label
// snatch the current isRefined value (lensProp) and NOT it (true => false & vice versa)
export const updateItem = curry((label, items) =>
    map(when(propEq('label', label), over(lensProp('isRefined'), not)), items)
);

export const getRefinedItems = curry(items =>
    pluck('label', filter(prop('isRefined'), items))
);
