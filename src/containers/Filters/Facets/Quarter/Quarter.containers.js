import React, { Component } from 'react';
// import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { prop } from 'ramda';
import { QuarterList as List } from './Quarter.components';
import { updateItem, getRefinedItems } from '../Facets.shared';
// import { asFacetList, withListUpdate, withUpdate } from '../Facets.shared';
// import { FACET_QUARTER } from '../../Filters.shared';

class Quarter extends Component {
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
        return <List items={this.state.items} update={this.update} />;
    }
}

// Quarter.attribute = FACET_QUARTER;

Quarter.propTypes = {
    initial: PropTypes.array.isRequired
};

// const Quarter = ({ items, update }) => ;

// const enhance = compose(withUpdate);

export default Quarter;
