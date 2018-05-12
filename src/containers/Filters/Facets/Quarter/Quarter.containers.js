import React, { Component } from 'react';
import { setPropTypes, compose, withProps, withPropsOnChange } from 'recompose';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_QUARTER } from '../../Filters.shared';
import { QuarterList as List } from './Quarter.components';

class Quarter extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    get items() {
        return orderBy(this.props.items, ['count', 'label'], ['desc', 'asc']);
    }

    save = (force = false) =>
        this.props.updateVirtuals(
            FACET_QUARTER,
            this.props.currentRefinement,
            !force
        );

    update(value) {
        this.props.refine(value);
    }

    render() {
        return (
            <div>
                <List items={this.items} onChange={this.update} />
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
        defaultRefinement,
        attribute: FACET_QUARTER
    })),
    connectRefinementList
);

export default enhance(Quarter);
