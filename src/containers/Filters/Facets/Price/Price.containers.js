import React, { Component, Fragment } from 'react';
import { setPropTypes, compose, withProps, withPropsOnChange } from 'recompose';
import PropTypes from 'prop-types';
// import { orderBy } from 'lodash';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_PRICE } from '../../Filters.shared';
import { PriceOptions } from './Price.components';
import { withFacetAll } from '../Facets.shared';
// import RangeCheckbox from '../../../../components/Forms/RangeCheckbox';

const Price = ({ items, update, save, onRequestClose }) => (
    <Fragment>
        <PriceOptions items={items} onChange={value => update(value)} />
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
        attribute: FACET_PRICE
    })),
    connectRefinementList,
    withFacetAll
);

export default enhance(Price);
