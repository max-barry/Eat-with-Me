import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import MediaQuery from 'react-responsive';
import { map, path, toPairs, flip, prop, flatten, values } from 'ramda';
import { Modal } from '../../hocs/Modal/Modal';
import { dimensions, breakpoints } from '../../settings/styles';
import { facetDictionary } from './Facets';
import { VirtualRefinement, FilterButton } from './Filters.components';
import {
    FACET_CUISINE,
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
import ContentFrame from './ContentFrame';
import { BottomBar } from '../../components/Navigation';
import worldwideSvg from '../../components/SVGs/images/flaticons/worldwide.svg';

const SHARED_NAVIGATION = {
    Region: [FACET_QUARTER],
    Cuisine: [FACET_CUISINE]
};

const DESKTOP_NAVIGATION = {
    ...SHARED_NAVIGATION,
    Price: [FACET_PRICE]
    // 'More...': [FACET_EXTRAS]
    // 'More...': [FACET_PRICE, FACET_EXTRAS]
};

const MOBILE_NAVIGATION = {
    ...SHARED_NAVIGATION
    // 'More filters': [FACET_EXTRAS]
};

class Filters extends Component {
    state = {
        isOpen: false,
        facetComponents: [],
        menuItem: null,
        menuItemWithValue: {},
        style: {
            left: 0,
            top: 0
        }
    };
    containerRef = React.createRef();
    frameRef = React.createRef();
    virtualRefs = {
        [FACET_QUARTER]: React.createRef(),
        [FACET_CUISINE]: React.createRef(),
        [FACET_PRICE]: React.createRef(),
        [FACET_IS_BAR]: React.createRef()
    };

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.apply = this.apply.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onContentMount = this.onContentMount.bind(this);
    }

    get container() {
        return this.containerRef.current;
    }

    get currentRefinement() {
        return map(
            path(['current', 'state', 'props', 'items']),
            this.virtualRefs
        );
    }

    componentDidMount() {
        this.props.fetchCuisinesFromCacheFirst();
    }

    openFilter(event, menuItem, facets) {
        // Check we're not just reopening an already open menu item
        if (menuItem === this.state.menuItem && this.state.isOpen) return;

        // Create an empty object we will fill with position: fixed modal attrs
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

        // We need to check if the filters are already open
        // and save them down if they are
        if (this.state.isOpen && this.rendered) {
            this.apply(true);
        }

        // Set the new state with the left value and an open filter
        this.setState({
            menuItem,
            // contentProps,
            isMobile,
            facetComponents: facets.map(facet => ({
                attribute: facet,
                component: facetDictionary[facet]
            })),
            isOpen: true,
            style: {
                // ...this.state.style,
                ...position
            }
        });
    }

    apply(close = true) {
        const { menuItem, menuItemWithValue } = this.state;
        // Request the content frame to process itself
        const processed = this.frameRef.current.process();
        // For each processed facet find the corresponding virtual and refine it
        toPairs(processed).forEach(([attribute, refinement]) => {
            const virtual = this.virtualRefs[attribute].current;
            // If a value has been returned, snatch
            // the refine fn from the virtual and refine, baby
            if (refinement.length) virtual.refine(refinement);
        });
        // Close the opened element
        this.setState({
            isOpen: !close,
            menuItemWithValue: {
                ...menuItemWithValue,
                [menuItem]: !!flatten(values(processed)).length
            }
        });
    }

    clear() {
        const facet = this.state.menuItem;
        console.log('Clear it: ' + facet);
    }

    onContentMount(rendered) {
        this.rendered = rendered;
    }

    toggleOpen(isOpen = false) {
        this.setState({ isOpen });
    }

    render() {
        const {
            menuItem,
            menuItemWithValue,
            isMobile,
            isOpen,
            facetComponents,
            style: styleProps,
            ...state
        } = this.state;

        const Content = isOpen && (
            <ContentFrame
                ref={this.frameRef}
                apply={this.apply}
                close={this.toggleOpen}
                clear={this.clear}
                children={facetComponents}
                currentRefinement={this.currentRefinement}
            />
        );

        return (
            <div ref={this.containerRef}>
                <Container>
                    <MediaQuery maxWidth={breakpoints.mobile}>
                        <BottomBar
                            items={Object.entries(MOBILE_NAVIGATION).map(
                                ([label, facets]) => ({
                                    label,
                                    // icon: {
                                    //     [FACET_CUISINE]: worldwideSvg,
                                    //     [FACET_QUARTER]: mapLocationSvg
                                    //     // [FACET_EXTRAS]: moreSvg
                                    // }[label],
                                    icon: worldwideSvg,
                                    onClick: e =>
                                        this.openFilter(e, label, facets)
                                })
                            )}
                        />
                    </MediaQuery>
                    <MediaQuery minWidth={breakpoints.mobile + 1}>
                        <ButtonList>
                            {Object.entries(DESKTOP_NAVIGATION).map(
                                ([label, facets], i) => (
                                    <FilterButton
                                        key={`filter_button_${i}`}
                                        onClick={e =>
                                            this.openFilter(e, label, facets)
                                        }
                                        children={label}
                                        // hasValue={!!hasValue[facet]}
                                        hasValue={menuItemWithValue[label]}
                                    />
                                )
                            )}
                        </ButtonList>
                    </MediaQuery>
                </Container>
                <div id="FilterCanvasWrap">
                    {!isMobile && (
                        <Modal
                            isOpen={isOpen}
                            contentLabel="Filter tools modal"
                            onRequestClose={this.toggleOpen}
                            {...filtersModalSimple(styleProps)}
                        >
                            {Content}
                        </Modal>
                    )}
                    {isMobile && <Drawer isOpen={isOpen}>{Content}</Drawer>}
                </div>

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_QUARTER]}
                    key={`virtual_${FACET_QUARTER}`}
                    attribute={FACET_QUARTER}
                    limit={20}
                    defaultRefinement={initialRefinements[FACET_QUARTER]}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_CUISINE]}
                    key={`virtual_${FACET_CUISINE}`}
                    attribute={FACET_CUISINE}
                    limit={20}
                    defaultRefinement={initialRefinements[FACET_CUISINE]}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_PRICE]}
                    key={`virtual_${FACET_PRICE}`}
                    attribute={FACET_PRICE}
                    limit={20}
                    defaultRefinement={initialRefinements[FACET_PRICE]}
                />

                <VirtualRefinement
                    ref={this.virtualRefs[FACET_IS_BAR]}
                    key={`virtual_${FACET_IS_BAR}`}
                    attribute={FACET_IS_BAR}
                    limit={20}
                    defaultRefinement={initialRefinements[FACET_IS_BAR]}
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
