import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import { Modal } from '../../hocs/Modal/Modal';
import { dimensions } from '../../settings/styles';
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
    FiltersButtonList as ButtonList,
    // FiltersStatusArea as StatusArea,
    filtersModalAdvanced,
    filtersModalSimple,
    FILTER_NAV_SPACING
} from './Filters.styles';
import { cuisineActions } from '../../redux/ducks/cuisine';

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
    navigation = {
        [FACET_QUARTER]: 'Region',
        [FACET_CUISINE]: 'Cuisine',
        [FACET_PRICE]: 'Price',
        // [null]: 'Neighborhood',
        [FACET_EXTRAS]: 'More...'
    };
    containerRef = React.createRef();

    constructor(props) {
        super(props);
        this.updateVirtuals = this.updateVirtuals.bind(this);
        this.clearFacet = this.clearFacet.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    get container() {
        return this.containerRef.current;
    }

    get virtuals() {
        const state = this.state;
        return {
            [FACET_QUARTER]: state[FACET_QUARTER],
            [FACET_CUISINE]: state[FACET_CUISINE],
            [FACET_PRICE]: state[FACET_PRICE],
            // [null, null,
            [FACET_IS_BAR]: state[FACET_EXTRAS][FACET_IS_BAR]
        };
    }

    componentDidMount() {
        this.props.fetchCuisinesFromCacheFirst();
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
                top: bottom + FILTER_NAV_SPACING,
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

    clearFacet(facet) {
        console.log('Clear it');
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

        const navigation = Object.entries(this.navigation);
        const virtualsDict = this.virtuals;
        const virtuals = Object.entries(virtualsDict);

        return (
            <div ref={this.containerRef}>
                <Container>
                    <ButtonList>
                        {navigation.map(([facet, label], i) => {
                            const virtual = virtualsDict[facet];
                            const hasValue =
                                virtual !== undefined
                                    ? virtual.some(n => n)
                                    : Object.entries(state[facet]).some(
                                          ([k, v]) => v.some(z => z)
                                      );
                            return (
                                <FilterButton
                                    key={`filter_button_${i}`}
                                    onClick={e => this.openFilter(e, facet)}
                                    children={label}
                                    hasValue={hasValue}
                                />
                            );
                        })}
                    </ButtonList>
                    {/* <StatusArea>{statuses}</StatusArea> */}
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

const enhance = compose(connect(pick(['cuisine']), cuisineActions));

export default enhance(Filters);
