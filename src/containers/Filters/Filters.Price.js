import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, sortWith, map, ascend, prop } from 'ramda';
import { Range } from '../../components/Inputs';
import { setInitialChecked, clearChecked } from './Filters.shared';

export const FACET_PRICE = 'yelp_price_bracket';

const makePriceString = n => (n > -1 && '£'.repeat(n, 10)).toString();
const sortPrices = sortWith([ascend(prop('int'))]);

class Price extends Component {
    state = setInitialChecked(this.props.items);

    get formatted() {
        return sortPrices(map(this.makeStep, keys(this.state)));
    }

    componentDidMount = () =>
        this.props.onMount ? this.props.onMount(this) : null;

    makeStep = label => {
        const int = parseFloat(label, 10);
        return {
            int,
            value: label,
            checked: this.state[label],
            label: makePriceString(int),
            skip: int === -1
        };
    };

    clear = () => this.setState(clearChecked(this.props.items));

    onChange = value => this.setState({ [value]: !this.state[value] });

    render = () => (
        <Range
            steps={this.formatted}
            onChange={this.onChange}
            name="Price"
            tag="Filter by price"
            title="Choose a price range"
        />
    );
}

Price.defaultProps = {};

Price.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            isRefined: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Price;
