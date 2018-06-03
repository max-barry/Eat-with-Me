import React, { Component, createFactory } from 'react';
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
    filtersModalSimple,
    FILTER_NAV_SPACING
} from './Filters.styles';
import { cuisineActions } from '../../redux/ducks/cuisine';
import {
    // CurrentRefinements,
    connectCurrentRefinements
} from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';

// TODO : You connect to the redux store and use that to populate the ITEMS key on the content
// OR can you use the context API like the VirtualRefinement does? Just pull in the context and wrap the content

class Filters extends Component {
    state = {
        open: false,
        content: null,
        contentKey: null,
        // contentItems: [],
        [FACET_QUARTER]: initialRefinements[FACET_QUARTER],
        [FACET_EXTRAS]: initialRefinements[FACET_EXTRAS],
        [FACET_CUISINE]: initialRefinements[FACET_CUISINE],
        [FACET_PRICE]: initialRefinements[FACET_PRICE],
        hasValue: {},
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
    virtualRefs = {
        [FACET_QUARTER]: React.createRef(),
        [FACET_CUISINE]: React.createRef(),
        [FACET_PRICE]: React.createRef(),
        // [null, null,
        [FACET_IS_BAR]: React.createRef()
    };

    constructor(props) {
        super(props);
        // this.updateVirtuals = this.updateVirtuals.bind(this);
        this.clear = this.clear.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.apply = this.apply.bind(this);
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

    getCurrentOpenItems(contentKey) {
        const key = contentKey || this.state.contentKey;
        if (!key) return null;
        const virtual = this.virtualRefs[key].current;
        return orderBy(
            virtual.state.props.items,
            ['count', 'label'],
            ['desc', 'asc']
        );
    }

    openFilter(event, contentKey) {
        // Check we're not just reopening an already open facet
        if (contentKey === this.state.contentKey && this.state.open) return;
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
        // Some useful variables
        const { open, rendered, ...state } = this.state;
        // We need to check if the filters are already open
        // and save them down if they are
        if (open && rendered) {
            rendered.props.save(true);
        }
        // Now get the ref of the virtual representing this facet
        // const items = virtual.state.props.items;
        const contentProps = {
            // items,
            close: this.onRequestClose,
            apply: this.apply,
            // refine: this.updateVirtuals,
            onMount: rendered => (this.rendered = rendered),
            clear: () => this.clear(contentKey)
        };
        // Get the virtual (and it's current items) from the dict of refs
        const virtual = this.virtualRefs[contentKey].current;
        // Set the new state with the left value and an open filter
        this.setState({
            content: facetDictionary[contentKey],
            contentKey,
            contentProps,
            // contentItems: this.getCurrentOpenItems(contentKey),
            open: true,
            style: {
                ...state.style,
                top: bottom + FILTER_NAV_SPACING,
                left
            }
        });
    }

    // updateVirtuals(refinements) {
    //     const contentKey = this.state.contentKey;
    //     const virtual = this.virtualRefs[contentKey].current;
    //     // console.log(virtual.state.props);
    //     // Run a refine
    //     // console.log(refinements);
    //     console.log(refinements);
    //     virtual.refine(refinements);
    //     // console.log('update virtual exit');
    //     // const newRefinedVirtual = this.virtualRefs[contentKey].current;
    //     // console.log(newRefinedVirtual);
    //     // this.setState({
    //     //     [contentKey]: refinements,
    //     //     contentItems: newRefinedVirtual.state.props.items
    //     // });
    // }

    apply(refinements, close = true) {
        const state = this.state;
        const contentKey = state.contentKey;
        // Refine the virtuals
        const virtual = this.virtualRefs[contentKey].current;
        virtual.refine(refinements);
        // Update the state
        this.setState({
            [contentKey]: refinements,
            open: !close,
            hasValue: {
                ...state.hasValue,
                [contentKey]: refinements.some(n => n)
            }
        });
    }

    clear(facet) {
        console.log('Clear it: ' + facet);
    }

    onRequestClose() {
        this.setState({ open: false });
    }

    render() {
        const {
            hasValue,
            contentProps,
            contentKey,
            contentItems,
            style: styleProps,
            content: Content,
            ...state
        } = this.state;

        const navigation = Object.entries(this.navigation);
        const virtualsDict = this.virtuals;
        const virtuals = Object.entries(virtualsDict);
        const openItems = this.getCurrentOpenItems();
        // console.log('rerender');

        return (
            <div ref={this.containerRef}>
                <Container>
                    <ButtonList>
                        {navigation.map(([facet, label], i) => (
                            <FilterButton
                                key={`filter_button_${i}`}
                                onClick={e => this.openFilter(e, facet)}
                                children={label}
                                hasValue={!!hasValue[facet]}
                            />
                        ))}
                    </ButtonList>
                    {/* <StatusArea>{statuses}</StatusArea> */}
                </Container>
                <div id="FilterCanvasWrap">
                    <Modal
                        isOpen={state.open}
                        contentLabel="Filter tools modal"
                        onRequestClose={this.onRequestClose}
                        style={filtersModalSimple(styleProps)}
                    >
                        {Content && (
                            <Content {...contentProps} initial={openItems} />
                        )
                        // <Content
                        //     onRequestClose={this.onRequestClose}
                        //     updateVirtuals={this.updateVirtuals}
                        //     onMount={rendered => (this.rendered = rendered)}
                        //     clearFacet={() =>
                        //         this.clearFacet(this.state.contentKey)
                        //     }
                        //     refinement={this.state[this.state.contentKey]}
                        //     defaultRefinement={
                        //         this.state[this.state.contentKey]
                        //     }
                        // />
                        }
                    </Modal>
                </div>

                {virtuals.map(([facet, current], z) => (
                    <VirtualRefinement
                        ref={this.virtualRefs[facet]}
                        key={`virtual_${z}`}
                        attribute={facet}
                        limit={20}
                        // defaultRefinement={current}
                    />
                ))}
            </div>
        );
    }
}

const enhance = compose(
    connectCurrentRefinements,
    connect(pick(['cuisine']), cuisineActions)
);

export default enhance(Filters);
