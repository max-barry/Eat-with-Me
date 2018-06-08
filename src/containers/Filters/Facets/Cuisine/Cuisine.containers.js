import React from 'react';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { connect } from 'react-redux';
import { pluck, pick } from 'ramda';
import { CuisineTabs as Tabs } from './Cuisine.components';
import { asFacetList } from '../Facets.shared';
import { cuisineActions } from '../../../../redux/ducks/cuisine';
import {
    cuisineHasLoadedSelector,
    cuisineFavoritesSelector,
    cuisineNationalSelector,
    cuisineGenreSelector
} from '../../../../redux/ducks/cuisine/cuisine.selectors';

const Cuisine = ({ items, update, ...props }) => (
    <Tabs items={items} update={update} />
);

const enhance = compose(
    asFacetList,
    connect(pick(['cuisine']), cuisineActions),
    branch(
        props => !cuisineHasLoadedSelector(props),
        renderComponent(() => 'No canzdo')
    ),
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
);

export default enhance(Cuisine);
