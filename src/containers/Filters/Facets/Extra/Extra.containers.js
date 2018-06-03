import React, { Component } from 'react';
import {
    compose,
    withProps,
    withHandlers,
    setDisplayName,
    hoistStatics,
    withStateHandlers
} from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { FacetActions as Actions } from '../Facets.components';
import { FACET_IS_BAR, FACET_EXTRAS } from '../../Filters.shared';
import { FacetBars as Bars } from './Extra.components';
import {
    ExtrasContainer as Container,
    ExtrasFilterWrap as Wrap
} from './Extra.styles';
import {
    withFacetSave,
    withFacetLifecycle,
    withFacetPropTypes,
    withCondenseFacetActions
} from '../Facets.shared';

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
    constructor(props) {
        super(props);
        this.onBarChange = this.onBarChange.bind(this);
    }

    get barRefinements() {
        return this.props.refinement[FACET_IS_BAR].map(r => r.toString());
    }

    onBarChange(refine) {
        const includeBars =
            this.barRefinements.length === 1 ? [true, false] : [false];

        refine(includeBars);

        this.props.updateFacetComponents(FACET_IS_BAR, includeBars);
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
                <Actions {...this.props.actions} />
            </Container>
        );
    }
}

const enhance = compose(
    withFacetPropTypes,
    withStateHandlers(
        ({ defaultRefinement }) => ({
            refinement: { ...defaultRefinement }
        }),
        {
            updateFacetComponents: ({ refinement }) => (key, value) => ({
                refinement: { ...refinement, [key]: value }
            })
        }
    ),
    withHandlers({
        save: ({ apply, refinement }) => (force = false) =>
            apply(refinement, !force)
    }),
    withFacetLifecycle,
    withCondenseFacetActions
);

export default enhance(ExtraFilters);
