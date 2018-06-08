import React from 'react';
import { compose } from 'recompose';
import { PriceOptions as Options } from './Price.components';
import { asFacetList } from '../Facets.shared';

const Price = ({ items, update }) => <Options items={items} update={update} />;

const enhance = compose(asFacetList);

export default enhance(Price);
