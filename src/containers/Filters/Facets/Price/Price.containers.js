import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PriceOptions as Options } from './Price.components';
import { getRefinedItems, updateItem } from '../Facets.shared';

class Price extends Component {
    state = { items: this.props.initial };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    get refined() {
        return getRefinedItems(this.state.items);
    }

    componentDidMount() {
        this.props.onMount(this);
    }

    update(label) {
        this.setState({
            items: updateItem(label, this.state.items)
        });
    }

    render() {
        return <Options items={this.state.items} update={this.update} />;
    }
}

Price.propTypes = {
    initial: PropTypes.array.isRequired
};

export default Price;
