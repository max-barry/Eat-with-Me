import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { FacetActions as Actions } from '../Facets.components';
import { QuarterList as List } from './Quarter.components';
import { asFacetList } from '../Facets.shared';

const Quarter = ({ items, update, actions }) => (
    <Fragment>
        <List items={items} update={update} />
        <Actions {...actions} />
    </Fragment>
);

const enhance = compose(asFacetList);

export default enhance(Quarter);
