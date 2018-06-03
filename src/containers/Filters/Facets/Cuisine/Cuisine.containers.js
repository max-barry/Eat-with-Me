import React, { Fragment } from 'react';
import {
    compose,
    withPropsOnChange,
    lifecycle,
    branch,
    renderComponent,
    withHandlers,
    withStateHandlers,
    withProps
} from 'recompose';
import { connect } from 'react-redux';
import { pluck, pick } from 'ramda';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { CuisineTabs as Tabs } from './Cuisine.components';
import { FACET_CUISINE } from '../../Filters.shared';
import { withFacetAll, withItemsOrdered } from '../Facets.shared';
import { cuisineActions } from '../../../../redux/ducks/cuisine';
import {
    cuisineHasLoadedSelector,
    cuisineFavoritesSelector,
    cuisineNationalSelector,
    cuisineGenreSelector
} from '../../../../redux/ducks/cuisine/cuisine.selectors';

// const withUpdateHandler = withHandlers({
//     // update: (panel, item) =>
//     update:
// });

const withFacetUpdate = withStateHandlers(
    ({ initial }) => ({
        lastUpdate: null,
        items: initial
    }),
    {
        update: ({ items }) => label => {
            // Find the index of the value you wish to update
            const i = items.findIndex(item => item.label === label);
            const item = items[i];
            // Update the element at index i with a new refined state
            // console.log(items);
            items[i] = { ...item, isRefined: !item.isRefined };
            // console.log(items);
            // Return the fresh new items
            return {
                items,
                lastUpdate: new Date().getTime()
            };
        }
    }
);

const Cuisine = ({ items, update, actions, ...props }) => {
    // return items.map(item => item.label + item.isRefined).join(' ');
    // return <div>items.map(item => item.label + item.isRefined).join(' ');
    return (
        <Fragment>
            <Tabs items={items} update={update} />
            <Actions {...actions} />
        </Fragment>
    );
};

const enhance = compose(
    // withPropsOnChange(['defaultRefinement'], ({ defaultRefinement }) => ({
    //     defaultRefinement,
    //     attribute: FACET_CUISINE,
    //     limit: 20
    // })),
    // connectRefinementList,
    withFacetUpdate,
    withFacetAll,
    connect(pick(['cuisine']), cuisineActions),
    branch(
        props => !cuisineHasLoadedSelector(props),
        renderComponent(() => 'No canzdo')
    ),
    // withItemsOrdered(['count', 'label'], ['desc', 'asc']),
    withProps(({ items, cuisine, ...props }) => {
        const favorites = pluck('group')(cuisineFavoritesSelector({ cuisine }));
        const byCountry = pluck('group')(cuisineNationalSelector({ cuisine }));
        const byCuisines = pluck('group')(cuisineGenreSelector({ cuisine }));

        return {
            items: [
                {
                    name: 'Most popular',
                    hideCount: true,
                    items: items.filter(item => favorites.includes(item.label))
                },
                {
                    name: 'By country',
                    items: items.filter(item => byCountry.includes(item.label))
                },
                {
                    name: 'Everything else',
                    items: items.filter(item => byCuisines.includes(item.label))
                }
            ]
        };
    })
    // withPropsOnChange(['items'], ({ items, cuisine, ...props }) => {
    //     const favorites = pluck('group')(cuisineFavoritesSelector({ cuisine }));
    //     const byCountry = pluck('group')(cuisineNationalSelector({ cuisine }));
    //     const byCuisines = pluck('group')(cuisineGenreSelector({ cuisine }));

    //     return {
    //         items: [
    //             {
    //                 name: 'Most popular',
    //                 hideCount: true,
    //                 items: items.filter(item => favorites.includes(item.label))
    //             },
    //             {
    //                 name: 'By country',
    //                 items: items.filter(item => byCountry.includes(item.label))
    //             },
    //             {
    //                 name: 'Everything else',
    //                 items: items.filter(item => byCuisines.includes(item.label))
    //             }
    //         ]
    //     };
    // })
);

export default enhance(Cuisine);
