import React, { Component } from 'react';
import { Modal } from '../../hocs/Modal/Modal';
import { dimensions, sFlexed } from '../../settings/styles';
import { facetDictionary } from './Facets';
import { VirtualRefinement, FilterButton } from './Filters.components';
import {
    FACET_CUISINE,
    FACET_EXTRAS,
    FACET_IS_BAR,
    FACET_QUARTER,
    initialRefinements
} from './Filters.shared';
import {
    FiltersContainer as Container,
    FiltersModalAdvanced,
    FiltersModalSimple
} from './Filters.styles';

// replace pure with updatewith... (the better one)

class Filters extends Component {
    state = {
        open: false,
        content: {},
        contentKey: null,
        [FACET_QUARTER]: initialRefinements[FACET_QUARTER],
        [FACET_EXTRAS]: initialRefinements[FACET_EXTRAS],
        [FACET_CUISINE]: initialRefinements[FACET_CUISINE],
        style: {
            left: 0,
            top: 0
        }
    };
    containerRef = React.createRef();

    constructor(props) {
        super(props);
        this.updateVirtuals = this.updateVirtuals.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    get container() {
        return this.containerRef.current;
    }

    openFilter(event, contentKey) {
        // Get the bounding rect of the clicked element
        // to work out left value
        let { left } = event.target.getBoundingClientRect();
        // Adjust for the window being very small and
        // the filter now being off the screen
        // Delta is either 0 if no adjustment is needed or an integer
        // to shift the open filter component left by that
        const {
            width: containerWidth
        } = this.container.getBoundingClientRect();
        left -= Math.abs(
            Math.min(
                // The width of the container (basically the window) minus
                // how far left this filter component needs to be
                // and the width of the component OR 0 if we have space
                containerWidth - (left + dimensions.filtersComponentMinWidth),
                0
            )
        );
        // We need to check if the filters are already open
        // and save them down if they are
        if (this.state.open && this.rendered) {
            this.rendered.save(true);
        }
        // Set the new state with the left value and an open filter
        this.setState({
            contentKey,
            open: true,
            content: facetDictionary[contentKey],
            style: {
                ...this.state.style,
                left
            }
        });
    }

    updateVirtuals(attr, refinements, close = true) {
        this.setState({
            [this.state.contentKey]: refinements,
            open: !close
        });
    }

    onRequestClose() {
        this.setState({ open: false });
    }

    componentDidMount() {
        const { left, bottom } = this.container.getBoundingClientRect();
        this.setState({ style: { left, top: bottom } });
    }

    render() {
        const {
            style: styleProps,
            content: { component: Content, modalAdvanced = false }
        } = this.state;

        return (
            <div ref={this.containerRef}>
                <Container>
                    <ul className={sFlexed}>
                        <FilterButton
                            onClick={e => this.openFilter(e, FACET_QUARTER)}
                            children="Region"
                        />
                        <FilterButton
                            onClick={e => this.openFilter(e, FACET_CUISINE)}
                            children="Cuisine"
                        />
                        <FilterButton
                            onClick={e => this.openFilter(e)}
                            children="Price"
                        />
                        <FilterButton
                            onClick={e => this.openFilter(e)}
                            children="Neighborhood"
                        />
                        <FilterButton
                            onClick={e => this.openFilter(e, FACET_EXTRAS)}
                            children="More..."
                        />
                    </ul>
                </Container>
                <div id="FilterCanvasWrap">
                    <Modal
                        isOpen={this.state.open}
                        contentLabel="Filter tools modal"
                        onRequestClose={this.onRequestClose}
                        style={
                            modalAdvanced
                                ? FiltersModalAdvanced(styleProps)
                                : FiltersModalSimple(styleProps)
                        }
                    >
                        {Content && (
                            <Content
                                onRequestClose={this.onRequestClose}
                                onMount={rendered => (this.rendered = rendered)}
                                defaultRefinement={
                                    this.state[this.state.contentKey]
                                }
                                updateVirtuals={this.updateVirtuals}
                            />
                        )}
                    </Modal>
                </div>

                <VirtualRefinement
                    attribute={FACET_QUARTER}
                    defaultRefinement={this.state[FACET_QUARTER]}
                />
                <VirtualRefinement
                    attribute={FACET_IS_BAR}
                    defaultRefinement={this.state[FACET_EXTRAS][FACET_IS_BAR]}
                />
                <VirtualRefinement
                    attribute={FACET_CUISINE}
                    defaultRefinement={this.state[FACET_CUISINE]}
                />
            </div>
        );
    }
}

export default Filters;
