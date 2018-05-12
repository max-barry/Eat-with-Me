import React, { Component } from 'react';
import { compose, setPropTypes, withPropsOnChange, withProps } from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { FacetActions as Actions } from '../Facets.components';
import { CuisineTabs as Tabs } from './Cuisine.components';
import { FACET_CUISINE } from '../../Filters.shared';

class Cuisine extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
    }

    get items() {
        const items = orderBy(
            this.props.items,
            ['count', 'label'],
            ['desc', 'asc']
        );
        return [
            { name: 'Favourites', items: items.slice(0, 5) },
            { name: 'By country', items: items.slice(5, 11) },
            { name: 'Everything else', items: items.slice(11, 17) }
        ];
    }

    save = force =>
        this.props.updateVirtuals(
            FACET_CUISINE,
            this.props.currentRefinement,
            !force
        );

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    update(value) {
        this.props.refine(value);
    }

    render() {
        return (
            <div>
                <Tabs items={this.items} onChange={this.update} />
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </div>
        );
    }
}

const enhance = compose(
    setPropTypes({
        onRequestClose: PropTypes.func.isRequired,
        defaultRefinement: PropTypes.array.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    }),
    withPropsOnChange(['defaultRefinement'], ({ defaultRefinement }) => ({
        // withProps(({ defaultRefinement }) => ({
        defaultRefinement,
        attribute: FACET_CUISINE,
        limit: 20
    })),
    connectRefinementList
);

export default enhance(Cuisine);
