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
    FACET_PRICE,
    initialRefinements
} from './Filters.shared';
import {
    FiltersContainer as Container,
    filtersModalAdvanced,
    filtersModalSimple
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
        [FACET_PRICE]: initialRefinements[FACET_PRICE],
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
        let { left, bottom } = event.target.getBoundingClientRect();
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
            this.rendered.props.save(true);
        }
        // Set the new state with the left value and an open filter
        this.setState({
            contentKey,
            open: true,
            content: facetDictionary[contentKey],
            style: {
                ...this.state.style,
                top: bottom,
                left
            }
        });
    }

    updateVirtuals(refinements, close = true) {
        this.setState({
            [this.state.contentKey]: refinements,
            open: !close
        });
    }

    onRequestClose() {
        this.setState({ open: false });
    }

    render() {
        const {
            style: styleProps,
            content: { component: Content, modalAdvanced = false },
            ...state
        } = this.state;

        const navigation = [
            [FACET_QUARTER, 'Region'],
            [FACET_CUISINE, 'Cuisine'],
            [FACET_PRICE, 'Price'],
            [null, 'Neighborhood'],
            [FACET_EXTRAS, 'More...']
        ];

        const virtuals = [
            [FACET_QUARTER, state[FACET_QUARTER]],
            [FACET_CUISINE, state[FACET_CUISINE]],
            [FACET_PRICE, state[FACET_PRICE]],
            // [null, null],
            [FACET_IS_BAR, state[FACET_EXTRAS][FACET_IS_BAR]]
        ];

        return (
            <div ref={this.containerRef}>
                <Container>
                    <ul className={sFlexed}>
                        {navigation.map(([facet, label], i) => (
                            <FilterButton
                                key={`filter_button_${i}`}
                                onClick={e => this.openFilter(e, facet)}
                                children={label}
                            />
                        ))}
                    </ul>
                </Container>
                <div id="FilterCanvasWrap">
                    <Modal
                        isOpen={this.state.open}
                        contentLabel="Filter tools modal"
                        onRequestClose={this.onRequestClose}
                        style={
                            modalAdvanced
                                ? filtersModalAdvanced(styleProps)
                                : filtersModalSimple(styleProps)
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

                {virtuals.map(([facet, current], z) => (
                    <VirtualRefinement
                        key={`virtual_${z}`}
                        attribute={facet}
                        defaultRefinement={current}
                    />
                ))}
            </div>
        );
    }
}

export default Filters;
