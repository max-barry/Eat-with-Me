export const FACET_QUARTER = 'quarter.name';
export const FACET_IS_BAR = 'is_bar';
export const FACET_PRICE = 'yelp_price_bracket';
// export const FACET_EXTRAS = 'extra';
export const FACET_CUISINE = 'all_category_groups.group';

export const initialRefinements = {
    [FACET_CUISINE]: [],
    [FACET_QUARTER]: [],
    [FACET_PRICE]: [],
    [FACET_IS_BAR]: ['false']
    // [FACET_EXTRAS]: {
    // }
};
