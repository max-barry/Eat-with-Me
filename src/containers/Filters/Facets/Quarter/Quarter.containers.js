import React, { Fragment } from 'react';
import { setPropTypes, compose, withPropsOnChange } from 'recompose';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_QUARTER } from '../../Filters.shared';
import { QuarterList as List } from './Quarter.components';
import { withFacetAll, withItemsOrdered } from '../Facets.shared';

const Quarter = ({ items, update, save, onRequestClose }) => (
    <Fragment>
        <List items={items} onChange={value => update(value)} />
        <Actions applyAction={_ => save()} cancelAction={onRequestClose} />
    </Fragment>
);

const enhance = compose(
    setPropTypes({
        onRequestClose: PropTypes.func.isRequired,
        defaultRefinement: PropTypes.array.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    }),
    withPropsOnChange(['defaultRefinement'], ({ defaultRefinement }) => ({
        defaultRefinement,
        attribute: FACET_QUARTER
    })),
    connectRefinementList,
    withItemsOrdered(['count', 'label'], ['desc', 'asc']),
    withFacetAll
);

export default enhance(Quarter);
