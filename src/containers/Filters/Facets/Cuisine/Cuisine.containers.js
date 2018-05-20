import React, { Fragment } from 'react';
import { compose, withPropsOnChange } from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { CuisineTabs as Tabs } from './Cuisine.components';
import { FACET_CUISINE } from '../../Filters.shared';
import { withFacetAll, withItemsOrdered } from '../Facets.shared';

const Cuisine = ({ items, update, save, onRequestClose }) => (
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
    withItemsOrdered(['count', 'label'], ['desc', 'asc'], items => [
        { name: 'Favourites', items: items.slice(0, 5) },
        { name: 'By country', items: items.slice(5, 11) },
        { name: 'Everything else', items: items.slice(11, 17) }
    ]),
    withFacetAll
);

export default enhance(Cuisine);
