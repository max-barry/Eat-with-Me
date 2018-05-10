import React, { Component } from 'react';
import { css } from 'emotion';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { pure, onlyUpdateForKeys } from 'recompose';
import Row from '../../components/Structures/Row';
import ButtonSimple from '../../components/Buttons/ButtonSimple';
import { bs, dimensions } from '../../settings/styles';
import {
    FiltersContainer,
    FiltersModalSimple,
    FiltersModalAdvanced
} from './Filters.styles';
import {
    FACET_QUARTER,
    FACET_EXTRAS,
    FACET_CUISINE,
    FACET_IS_BAR,
    initial_refinements
} from './Filters.constants';
import { filterComponents } from './FilterContent';
import { Modal } from '../../hocs/Modal/Modal';

const VirtualRefinement = connectRefinementList(() => null);

// replace pure with updatewith... (the better one)
const FilterButton = onlyUpdateForKeys([])(
    ({ children, onClick, ...props }) => (
        <li
            {...props}
            className={css(
                { marginLeft: bs(0.25), marginRight: bs(0.25) },
                `&:first-child {margin-left: 0}
             &:last-child  {margin-right: 0}`
            )}
        >
            <ButtonSimple onClick={onClick}>{children}</ButtonSimple>
        </li>
    )
);

class Filters extends Component {
    state = {
        filtersOpen: false,
        content: {},
        contentKey: null,
        [FACET_QUARTER]: initial_refinements[FACET_QUARTER],
        [FACET_EXTRAS]: initial_refinements[FACET_EXTRAS],
        [FACET_CUISINE]: initial_refinements[FACET_CUISINE],
        style: {
            left: 0,
            top: 0
        }
    };

    containerRef = React.createRef();

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
        if (this.state.filtersOpen && this.rendered) {
            this.rendered.save(true);
        }
        // Set the new state with the left value and an open filter
        this.setState({
            contentKey,
            filtersOpen: true,
            content: filterComponents[contentKey],
            style: {
                ...this.state.style,
                left
            }
        });
    }

    updateVirtuals([attr, refinements, close = true]) {
        this.setState({
            [this.state.contentKey]: refinements,
            filtersOpen: !close
        });
    }

    onRequestClose() {
        this.setState({ filtersOpen: false });
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
                <FiltersContainer>
                    <Row>
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
                    </Row>
                </FiltersContainer>
                <div id="FilterCanvasWrap">
                    <Modal
                        isOpen={this.state.filtersOpen}
                        contentLabel="Filter content modal"
                        style={
                            modalAdvanced
                                ? FiltersModalAdvanced(styleProps)
                                : FiltersModalSimple(styleProps)
                        }
                        onRequestClose={() => this.onRequestClose()}
                    >
                        {Content && (
                            <Content
                                onRequestClose={() => this.onRequestClose()}
                                onMount={rendered => (this.rendered = rendered)}
                                defaultRefinement={
                                    this.state[this.state.contentKey]
                                }
                                updateVirtuals={(...args) =>
                                    this.updateVirtuals(args)
                                }
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
