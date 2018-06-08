import React, { Component } from 'react';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { FACET_IS_BAR } from '../../Filters.shared';
import { FacetBars as Bars } from './Extra.components';
import {
    ExtrasContainer as Container,
    ExtrasFilterWrap as Wrap
} from './Extra.styles';
import { withFacetShared } from '../Facets.shared';

class ExtraFilters extends Component {
    constructor(props) {
        super(props);
        this.onBarChange = this.onBarChange.bind(this);
    }

    get barRefinements() {
        // The bar refinement will come in as an array with two items (false and true)
        // it will have a isRefined and label etc. but I'm ignoring that junk
        // Grab the first of these two array elements (it doesn't matter which)
        const firstRefinement = this.props.refinement[FACET_IS_BAR][0];
        // Now get the "value" key from this first refinement. This will be an array
        // of either [false] or [true, false]. Map these to strings.
        return firstRefinement.value.map(r => r.toString());
    }

    onBarChange(result) {
        const items = this.props.refinement[FACET_IS_BAR].map(item => {
            item.value = result ? [true, false] : [false];
            return item;
        });

        this.props.update(FACET_IS_BAR, items);
    }

    render() {
        return (
            <Container>
                <Wrap>
                    <Bars
                        refinement={this.barRefinements}
                        update={this.onBarChange}
                    />
                </Wrap>
            </Container>
        );
    }
}

const enhance = compose(
    withStateHandlers(
        ({ initial }) => ({
            lastUpdate: null,
            refinement: { ...initial }
        }),
        {
            update: ({ refinement }) => (key, value) => ({
                refinement: { ...refinement, [key]: value }
            })
        }
    ),
    withHandlers({
        save: ({ apply, refinement }) => (force = false) => {
            apply(
                Object.entries(refinement).reduce((acc, [k, v]) => {
                    // TODO : Temporary. Will only really work on the <Bar />
                    acc[k] = v[0].value;
                    return acc;
                }, {}),
                !force
            );
        }
    }),
    withFacetShared
);

export default enhance(ExtraFilters);
