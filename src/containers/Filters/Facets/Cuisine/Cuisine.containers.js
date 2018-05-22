import React, { Fragment } from 'react';
import {
    compose,
    withPropsOnChange,
    lifecycle,
    branch,
    renderComponent
} from 'recompose';
import { connect } from 'react-redux';
import { pluck } from 'ramda';
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

const Cuisine = ({ items, update, save, onRequestClose, ...props }) => (
    <Fragment>
        <Tabs items={items} onChange={value => update(value)} />
        <Actions applyAction={_ => save()} cancelAction={onRequestClose} />
    </Fragment>
);

const enhance = compose(
    withPropsOnChange(['defaultRefinement'], ({ defaultRefinement }) => ({
        defaultRefinement,
        attribute: FACET_CUISINE,
        limit: 20
    })),
    connectRefinementList,
    connect(pick(['cuisine']), cuisineActions),
    lifecycle({
        componentDidMount() {
            this.props.fetchCuisinesFromCacheFirst();
        }
    }),
    branch(
        props => !cuisineHasLoadedSelector(props),
        renderComponent(() => 'No canzdo')
    ),
    withItemsOrdered(['count', 'label'], ['desc', 'asc']),
    withPropsOnChange(['items'], ({ items, cuisine, ...props }) => {
        const favorites = pluck('group')(cuisineFavoritesSelector({ cuisine }));
        const byCountry = pluck('group')(cuisineNationalSelector({ cuisine }));
        const byCuisines = pluck('group')(cuisineGenreSelector({ cuisine }));

        return {
            items: [
                {
                    name: 'Most popular',
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
    }),
    withFacetAll
);

export default enhance(Cuisine);
