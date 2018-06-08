import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { pick } from 'ramda';
// import { connectCurrentRefinements } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';
import { Modal } from '../../hocs/Modal/Modal';
import { dimensions, breakpoints } from '../../settings/styles';
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
import { Drawer } from '../../components/Structures';
import { BottomBar } from '../../components/Navigation';
import mapLocationSvg from '../../components/SVGs/images/flaticons/map-location.svg';
import worldwideSvg from '../../components/SVGs/images/flaticons/worldwide.svg';
import moreSvg from '../../components/SVGs/images/flaticons/more.svg';
import { withPropsChecker } from '../../hocs/Debug/debug';

const SHARED_NAVIGATION = {
    [FACET_QUARTER]: 'Region',
    [FACET_CUISINE]: 'Cuisine'
    // [null]: 'Neighborhood',
};
const DESKTOP_NAVIGATION = {
    ...SHARED_NAVIGATION,
    [FACET_PRICE]: 'Price',
    [FACET_EXTRAS]: 'More...'
};
const MOBILE_NAVIGATION = {
    ...SHARED_NAVIGATION,
    [FACET_EXTRAS]: 'More filters'
};

// const virtuals = [
//     [FACET_QUARTER],
//     [FACET_CUISINE],
//     [FACET_PRICE],
//     [FACET_IS_BAR]
// ].map((facet, z) => (
//     <VirtualRefinement
//         ref={this.virtualRefs[facet]}
//         key={`virtual_${z}`}
//         attribute={facet}
//         limit={20}
//     />
// ));

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
        this.clear = this.clear.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.apply = this.apply.bind(this);
    }

    get container() {
        return this.containerRef.current;
    }

    // get virtuals() {
    //     const state = this.state;
    //     return {
    //         [FACET_QUARTER]: state[FACET_QUARTER],
    //         [FACET_CUISINE]: state[FACET_CUISINE],
    //         [FACET_PRICE]: state[FACET_PRICE],
    //         // [null, null,
    //         [FACET_IS_BAR]: state[FACET_EXTRAS][FACET_IS_BAR]
    //     };
    // }

    get extraKeys() {
        return Object.keys(this.state[FACET_EXTRAS]);
    }

    componentDidMount() {
        this.props.fetchCuisinesFromCacheFirst();
    }

    orderItems(items) {
        return orderBy(items, ['count', 'label'], ['desc', 'asc']);
    }

    getCurrentOpenItems(contentKey) {
        let items = null;
        const key = contentKey || this.state.contentKey;
        // If it's the extras tab, we need to source from multiple virtuals
        if (key === FACET_EXTRAS) {
            // Reduce a list of the extras until you've built an object
            // with a key per extra facet and the standard
            // items array as the value of that key
            items = this.extraKeys.reduce((acc, cur) => {
                const virtual = this.virtualRefs[cur].current;
                acc[cur] = this.orderItems(virtual.state.props.items);
                return acc;
            }, {});
        } else if (key) {
            // Otherwise just check we have a key (first render won't)
            // and grab the virtual for that key
            const virtual = this.virtualRefs[key].current;
            // Now fish out the items for that virtual an order them
            items = this.orderItems(virtual.state.props.items);
        }
        // Return the items
        return items;
    }

    openFilter(event, contentKey) {
        // Check we're not just reopening an already open facet
        if (contentKey === this.state.contentKey && this.state.open) return;

        // Create an empty object we will fill
        // with position: fixed modal attrs
        const position = {};
        // Find the width of the container of the element
        const {
            width: containerWidth
        } = this.container.getBoundingClientRect();
        // Are we on mobile?
        const isMobile = containerWidth <= breakpoints.mobile;

        if (!isMobile) {
            // Okay so this is tablet / desktop
            // Get the bounding rect of the clicked element
            // to work out left value
            let { left, bottom } = event.target.getBoundingClientRect();
            // Adjust for the window being very small but not mobile and
            // the filter now being off the screen
            // Delta is either 0 if no adjustment is needed or an integer
            // to shift the open filter component left by that
            left -= Math.abs(
                Math.min(
                    // The width of the container (basically the window) minus
                    // how far left this filter component needs to be
                    // and the width of the component OR 0 if we have space
                    containerWidth -
                        (left + dimensions.filtersComponentMinWidth),
                    0
                )
            );
            // Set these on the empty dimensions object
            position.left = left;
            position.top = bottom + FILTER_NAV_SPACING;
        }

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
        // const virtual = this.virtualRefs[contentKey].current;
        // Set the new state with the left value and an open filter
        this.setState({
            contentKey,
            contentProps,
            isMobile,
            content: facetDictionary[contentKey],
            open: true,
            style: {
                ...state.style,
                ...position
            }
        });
    }

    apply(refinements, close = true) {
        let hasValue;
        const state = this.state;
        const contentKey = state.contentKey;
        // If this is the extras then you need to refine multiple virtuals
        if (contentKey === FACET_EXTRAS) {
            // The extras come in as an object with keys for each extra facet
            // e.g. {IS_BAR: []}
            // Loop over the keys of extras
            this.extraKeys.forEach(key => {
                const virtual = this.virtualRefs[key].current;
                // If you have a value then refine the virtual
                if (refinements[key]) {
                    virtual.refine(refinements[key]);
                }
            });
            // Check if all the refined facets then .some it to check if we have a value
            hasValue = Object.entries(refinements).some(([k, v]) =>
                v.some(n => n)
            );
        } else {
            // For anything that isn't the Extras it's pretty simple
            // Get the ref for the virtual for this key
            const virtual = this.virtualRefs[contentKey].current;
            // Run a refine function
            virtual.refine(refinements);
            // If there are any truthy values in the refinements then it has a value
            hasValue = refinements.some(n => n);
        }
        // Update the state
        this.setState({
            [contentKey]: refinements,
            open: !close,
            hasValue: {
                ...state.hasValue,
                [contentKey]: hasValue
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
            isMobile,
            style: styleProps,
            content: Content,
            ...state
        } = this.state;

        // const virtualsDict = this.virtuals;
        // const virtuals = Object.entries(virtualsDict);
        const openItems = this.getCurrentOpenItems();
        const {
            overlay: overlayClass,
            content: contentClass
        } = filtersModalSimple(styleProps);

        return (
            <div ref={this.containerRef}>
                <Container>
                    <MediaQuery maxWidth={breakpoints.mobile}>
                        <BottomBar
                            items={Object.entries(MOBILE_NAVIGATION).map(
                                ([facet, label]) => ({
                                    label,
                                    icon: {
                                        [FACET_CUISINE]: worldwideSvg,
                                        [FACET_QUARTER]: mapLocationSvg,
                                        [FACET_EXTRAS]: moreSvg
                                    }[facet],
                                    onClick: e => this.openFilter(e, facet)
                                })
                            )}
                        />
                    </MediaQuery>
                    <MediaQuery minWidth={breakpoints.mobile + 1}>
                        <ButtonList>
                            {Object.entries(DESKTOP_NAVIGATION).map(
                                ([facet, label], i) => (
                                    <FilterButton
                                        key={`filter_button_${i}`}
                                        onClick={e => this.openFilter(e, facet)}
                                        children={label}
                                        hasValue={!!hasValue[facet]}
                                    />
                                )
                            )}
                        </ButtonList>
                    </MediaQuery>
                </Container>
                <div id="FilterCanvasWrap">
                    {!isMobile && (
                        <Modal
                            isOpen={state.open}
                            contentLabel="Filter tools modal"
                            onRequestClose={this.onRequestClose}
                            closeTimeoutMS={150}
                            className={contentClass}
                            overlayClassName={overlayClass}
                        >
                            {Content && (
                                <Content
                                    {...contentProps}
                                    initial={openItems}
                                />
                            )}
                        </Modal>
                    )}
                    {isMobile && (
                        <Drawer isOpen={state.open}>
                            {Content && (
                                <Content
                                    {...contentProps}
                                    initial={openItems}
                                />
                            )}
                        </Drawer>
                    )}
                </div>

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_QUARTER]}
                    key={`virtual_${FACET_QUARTER}`}
                    attribute={FACET_QUARTER}
                    limit={20}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_CUISINE]}
                    key={`virtual_${FACET_CUISINE}`}
                    attribute={FACET_CUISINE}
                    limit={20}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_PRICE]}
                    key={`virtual_${FACET_PRICE}`}
                    attribute={FACET_PRICE}
                    limit={20}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_IS_BAR]}
                    key={`virtual_${FACET_IS_BAR}`}
                    attribute={FACET_IS_BAR}
                    limit={20}
                />
            </div>
        );
    }
}

const enhance = compose(
    // connectCurrentRefinements,
    // withPropsChecker,
    connect(pick(['cuisine']), cuisineActions)
);

export default enhance(Filters);
