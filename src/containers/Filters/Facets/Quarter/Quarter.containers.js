import React, { Component } from 'react';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { FacetActions as Actions } from '../shared.components';
import { FACET_QUARTER } from '../../filters.shared';
import { QuarterList as List } from './Quarter.components';
import { QuarterContainer as Container } from './Quarter.styles';

class Quarter extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_QUARTER, this.state.refinement, !force);

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    update([refine, value]) {
        refine(value);
        this.setState({ refinement: value });
    }

    render() {
        return (
            <Container>
                <List
                    attribute={FACET_QUARTER}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                />
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </Container>
        );
    }
}

const enhance = compose(
    setPropTypes({
        defaultRefinement: PropTypes.array.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    })
);

export default enhance(Quarter);
