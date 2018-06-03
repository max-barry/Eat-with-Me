import React, { Fragment } from 'react';
import { setPropTypes, compose, withPropsOnChange } from 'recompose';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_PRICE } from '../../Filters.shared';
import { PriceOptions as Options } from './Price.components';
import { withFacetAll } from '../Facets.shared';
import { withPropsChecker } from '../../../../hocs/Debug/debug';

const Price = ({ items, update, actions }) => (
    <Fragment>
        <Options items={items} onChange={value => update(value)} />
        <Actions {...actions} />
    </Fragment>
);

const enhance = compose(
    withPropsOnChange(['defaultRefinement'], ({ defaultRefinement }) => ({
        defaultRefinement,
        attribute: FACET_PRICE
    })),
    connectRefinementList,
    withFacetAll,
    withPropsChecker
);

export default enhance(Price);
