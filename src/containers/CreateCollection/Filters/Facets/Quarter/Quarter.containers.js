import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QuarterList as List } from './Quarter.components';
import { updateItem, getRefinedItems } from '../Facets.shared';

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

Quarter.propTypes = {
    initial: PropTypes.array.isRequired
};

export default Quarter;
