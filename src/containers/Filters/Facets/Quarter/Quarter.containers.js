import React from 'react';
import { compose } from 'recompose';
import { QuarterList as List } from './Quarter.components';
import { asFacetList } from '../Facets.shared';

const Quarter = ({ items, update }) => <List items={items} update={update} />;

const enhance = compose(asFacetList);

export default enhance(Quarter);
