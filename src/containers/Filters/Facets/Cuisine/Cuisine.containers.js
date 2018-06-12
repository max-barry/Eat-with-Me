import React, { Component } from 'react';
import { compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { pluck, pick } from 'ramda';
import PropTypes from 'prop-types';
import { CuisineTabs as Tabs } from './Cuisine.components';
import { getRefinedItems, updateItem } from '../Facets.shared';
import { cuisineActions } from '../../../../redux/ducks/cuisine';
import {
    cuisineHasLoadedSelector,
    cuisineFavoritesSelector,
    cuisineNationalSelector,
    cuisineGenreSelector
} from '../../../../redux/ducks/cuisine/cuisine.selectors';

class Cuisine extends Component {
    state = { items: this.props.initial };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    get structuredItems() {
        const items = this.state.items;
        const cuisine = this.props.cuisine;

        const favorites = pluck('group')(cuisineFavoritesSelector({ cuisine }));
        const byCountry = pluck('group')(cuisineNationalSelector({ cuisine }));
        const byCuisines = pluck('group')(cuisineGenreSelector({ cuisine }));

        return [
            {
                name: 'Most popular',
                hideCount: true,
                items: items.filter(item => favorites.includes(item.label))
            },
            {
                name: 'By country',
                items: items.filter(item => byCountry.includes(item.label))
            },
            {
                name: 'Everything else',
                items: items.filter(item => byCuisines.includes(item.label))
            }
        ];
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
        return <Tabs items={this.structuredItems} update={this.update} />;
    }
}

Cuisine.propTypes = {
    initial: PropTypes.array.isRequired
};

const enhance = compose(
    connect(pick(['cuisine']), cuisineActions),
    branch(
        props => !cuisineHasLoadedSelector(props),
        renderComponent(() => 'No canzdo')
    )
);

export default enhance(Cuisine);
