import React, { Component, Fragment } from 'react';
import { setPropTypes, compose, withProps, withPropsOnChange } from 'recompose';
import PropTypes from 'prop-types';
// import { orderBy } from 'lodash';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_PRICE } from '../../Filters.shared';
import { PriceOptions } from './Price.components';
// import RangeCheckbox from '../../../../components/Forms/RangeCheckbox';

class Price extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    // get items() {
    //     return orderBy(this.props.items, ['count', 'label'], ['desc', 'asc']);
    // }

    save = (force = false) =>
        this.props.updateVirtuals(
            FACET_PRICE,
            this.props.currentRefinement,
            !force
        );

    update(value) {
        this.props.refine(value);
    }

    render() {
        return (
            <Fragment>
                <PriceOptions items={this.props.items} onChange={this.update} />
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </Fragment>
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
        attribute: FACET_PRICE
    })),
    connectRefinementList
);

export default enhance(Price);
