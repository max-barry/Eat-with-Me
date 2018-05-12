import React, { Component } from 'react';
import {
    setPropTypes,
    compose,
    withProps,
    withHandlers,
    setDisplayName
} from 'recompose';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_IS_BAR, FACET_EXTRAS } from '../../Filters.shared';
import { FacetBars as Bars } from './Extra.components';
import {
    ExtrasContainer as Container,
    ExtrasFilterWrap as Wrap
} from './Extra.styles';

const enhanceBars = compose(
    setDisplayName('EnhancedBars'),
    withProps(props => ({
        attribute: FACET_IS_BAR
    })),
    connectRefinementList,
    withHandlers({
        onChange: props => _ => props.onChange(props.refine)
    })
);

const EnhancedBars = enhanceBars(Bars);

class ExtraFilters extends Component {
    state = { refinement: { ...this.props.defaultRefinement } };

    constructor(props) {
        super(props);
        this.onBarChange = this.onBarChange.bind(this);
    }

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    get barRefinements() {
        return this.state.refinement[FACET_IS_BAR].map(r => r.toString());
    }

    save = (force = false) =>
        this.props.updateVirtuals(FACET_EXTRAS, this.state.refinement, !force);

    onBarChange(refine) {
        const includeBars =
            this.barRefinements.length === 1 ? [true, false] : [false];
        refine(includeBars);
        this.setState({
            ...this.state,
            [FACET_IS_BAR]: includeBars
        });
    }

    render() {
        return (
            <Container>
                <Wrap>
                    <EnhancedBars
                        defaultRefinement={this.barRefinements}
                        onChange={this.onBarChange}
                    />
                </Wrap>
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </Container>
        );
    }
}

const enhance = setPropTypes({
    defaultRefinement: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    updateVirtuals: PropTypes.func.isRequired
});

export default enhance(ExtraFilters);
