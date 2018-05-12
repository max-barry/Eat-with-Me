import React, { Component } from 'react';
import { setPropTypes, onlyUpdateForKeys, compose } from 'recompose';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../shared.components';
import { ExtrasContainer, ExtrasFilterWrap } from './Extra.styles';
import { FACET_IS_BAR, FACET_EXTRAS } from '../../filters.shared';
import { ToggleWithLabel } from '../../../../components/Forms';

const IncludeBars = ({ refine, currentRefinement, onChange, ...props }) => (
    <ToggleWithLabel
        id="include-bars"
        onChange={() => onChange(refine)}
        checked={currentRefinement.length > 1}
        title={() => 'Include bars and pubs'}
        tag={() => "We don't include bars and pubs in results by default"}
    />
);

const enhanceIncludeBars = compose(
    onlyUpdateForKeys([]),
    connectRefinementList
);

const EnhancedIncludeBars = enhanceIncludeBars(IncludeBars);

class ExtraFilters extends Component {
    state = { ...this.props.defaultRefinement };

    get bar() {
        return this.state[FACET_IS_BAR];
    }

    save = (force = false) =>
        this.props.updateVirtuals(FACET_EXTRAS, this.state, !force);

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    onBarChange(refine) {
        const includeBars = this.bar.length === 1 ? [true, false] : [false];
        refine(includeBars);
        this.setState({
            ...this.state,
            [FACET_IS_BAR]: includeBars
        });
    }

    render() {
        return (
            <ExtrasContainer>
                <ExtrasFilterWrap>
                    <EnhancedIncludeBars
                        attribute="is_bar"
                        defaultRefinement={this.bar.map(r => r.toString())}
                        onChange={refine => this.onBarChange(refine)}
                    />
                </ExtrasFilterWrap>
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </ExtrasContainer>
        );
    }
}

const enhance = setPropTypes({
    defaultRefinement: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    updateVirtuals: PropTypes.func.isRequired
});

export default enhance(ExtraFilters);
