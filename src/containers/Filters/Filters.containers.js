import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import MediaQuery from 'react-responsive';
import {
    map,
    path,
    toPairs,
    flatten,
    values,
    keys,
    assoc,
    mergeAll
} from 'ramda';
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
import mapLocationSvg from '../../components/SVGs/images/flaticons/map-location.svg';
import moreSvg from '../../components/SVGs/images/flaticons/more.svg';
import worldwideSvg from '../../components/SVGs/images/flaticons/worldwide.svg';
import moize from 'moize';

const MENU_COPY = {
    region: 'Region',
    cuisine: 'Cuisine',
    price: 'Price',
    more: 'More filters'
};

const DESKTOP_NAVIGATION = Object.entries({
    [MENU_COPY.region]: [FACET_QUARTER],
    [MENU_COPY.cuisine]: [FACET_CUISINE],
    [MENU_COPY.price]: [FACET_PRICE],
    [MENU_COPY.more]: [FACET_IS_BAR]
});

const MOBILE_NAVIGATION = Object.entries({
    [MENU_COPY.region]: [FACET_QUARTER],
    [MENU_COPY.cuisine]: [FACET_CUISINE],
    [MENU_COPY.more]: [FACET_IS_BAR, FACET_PRICE]
});

const resetFacet = moize.deep(data =>
    mergeAll(
        map(facet => assoc(facet, initialRefinements[facet], data), keys(data))
    )
);

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
        this._refine = this._refine.bind(this);
        this.closeFilters = this.closeFilters.bind(this);
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
        if (this.state.isOpen) this.apply(false);

        // Set the new state with the left value and an open filter
        this.setState({
            menuItem,
            isMobile,
            isOpen: true,
            style: { ...position },
            facetComponents: facets.map(facet => ({
                attribute: facet,
                component: facetDictionary[facet]
            }))
        });
    }

    closeFilters() {
        this.setState({ isOpen: false });
    }

    _refine(data) {
        // For each processed facet find the corresponding virtual and refine it
        toPairs(data).forEach(([attribute, refinement]) => {
            const virtual = this.virtualRefs[attribute].current;
            // Refine the virtual with the provided refinement
            virtual.refine(refinement);
        });
    }

    apply(close = true) {
        const { menuItem, menuItemWithValue } = this.state;
        // Request the content frame to process itself
        const processed = this.frameRef.current.process();
        // Refine each virtual with this processed data
        this._refine(processed);
        // Flatten out the truthy values
        const refinedValues = flatten(values(processed));
        // Close the opened element
        this.setState({
            isOpen: !close,
            menuItemWithValue: {
                ...menuItemWithValue,
                [menuItem]:
                    !!refinedValues.length &&
                    refinedValues[0] !== false.toString() // Toggle facets give a ['false']
            }
        });
    }

    clear() {
        const { menuItem, menuItemWithValue } = this.state;
        // Get the processed data of the current open tab
        const processed = this.frameRef.current.process();
        // Reset all the processed values to their defaults
        const cleared = resetFacet(processed);
        // Call the shared refine fn on this to submit our new cleaned refinements
        this._refine(cleared);
        // Close the overlay
        this.setState({
            isOpen: false,
            menuItemWithValue: {
                ...menuItemWithValue,
                [menuItem]: false
            }
        });
    }

    onContentMount(rendered) {
        this.rendered = rendered;
    }

    render() {
        const {
            menuItemWithValue,
            menuItem,
            isMobile,
            isOpen,
            facetComponents,
            style: styleProps
        } = this.state;

        const { overlayClass, contentClass } = filtersModalSimple(styleProps);

        const Content = isOpen && (
            <ContentFrame
                ref={this.frameRef}
                children={facetComponents}
                menuItem={menuItem}
                apply={this.apply}
                close={this.closeFilters}
                clear={this.clear}
                clearEnabled={menuItemWithValue[menuItem]}
                currentRefinement={this.currentRefinement}
            />
        );

        return (
            <div ref={this.containerRef}>
                <Container>
                    <MediaQuery maxWidth={breakpoints.mobile}>
                        <BottomBar
                            items={MOBILE_NAVIGATION.map(([label, facets]) => ({
                                label,
                                icon: {
                                    [MENU_COPY.region]: worldwideSvg,
                                    [MENU_COPY.cuisine]: mapLocationSvg,
                                    [MENU_COPY.more]: moreSvg
                                }[label],
                                hasValue: menuItemWithValue[label],
                                onClick: e => this.openFilter(e, label, facets)
                            }))}
                        />
                    </MediaQuery>
                    <MediaQuery minWidth={breakpoints.mobile + 1}>
                        <ButtonList>
                            {DESKTOP_NAVIGATION.map(([label, facets], i) => (
                                <FilterButton
                                    key={`filter_button_${i}`}
                                    children={label}
                                    hasValue={menuItemWithValue[label]}
                                    onClick={e =>
                                        this.openFilter(e, label, facets)
                                    }
                                />
                            ))}
                        </ButtonList>
                    </MediaQuery>
                </Container>
                <div id="FilterCanvasWrap">
                    {!isMobile && (
                        <Modal
                            isOpen={isOpen}
                            contentLabel={`Filter by ${menuItem}`}
                            onRequestClose={this.closeFilters}
                            overlayClassName={overlayClass}
                            className={contentClass}
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

const enhance = compose(connect(pick(['cuisine']), cuisineActions));

export default enhance(Filters);
