import React, { Component } from 'react';
import { css } from 'emotion';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { pure } from 'recompose';
import Row from '../../components/Structures/Row';
import ButtonSimple from '../../components/Buttons/ButtonSimple';
import { FiltersContainer } from './Filters.styles';
import { bs, dimensions } from '../../settings/styles';
import FiltersCanvas from './FiltersCanvas';
import {
    FACET_QUARTER,
    FACET_EXTRAS,
    initial_refinements
} from './Filters.constants';
// import withSearch from '../../hocs/Search/Search';
// import { Hits } from 'react-instantsearch/dom';

const VirtualQuarter = connectRefinementList(() => null);

const FilterButton = pure(({ children, ...props }) => (
    <ButtonSimple
        {...props}
        className={css(
            { marginLeft: bs(0.25), marginRight: bs(0.25) },
            `&:first-child {margin-left: 0}
             &:last-child  {margin-right: 0}`
        )}
    >
        {children}
    </ButtonSimple>
));

// const VirtualFilters = Object.entries(enums).map(([key, en], i) => {
//     const comp = filterComponents[en];
//     const Connector = connectors[comp.connector](() => null);
//     return { Virtual: Connector, props: comp.props };
// });

class Filters extends Component {
    state = {
        left: 0,
        top: 0,
        filtersOpen: false,
        contentKey: null,
        [FACET_QUARTER]: initial_refinements[FACET_QUARTER],
        [FACET_EXTRAS]: initial_refinements[FACET_EXTRAS]
    };
    ref = React.createRef();

    openFilter(event, contentKey) {
        // Get the bounding rect of the clicked element
        // to work out left value
        const { left } = event.target.getBoundingClientRect();
        // Adjust for the window being very small and
        // the filter now being off the screen
        // Delta is either 0 if no adjustment is needed or an integer
        // to shift the open filter component left by that
        const {
            width: containerWidth
        } = this.ref.current.getBoundingClientRect();
        const delta = Math.min(
            // The width of the container (basically the window) minus
            // how far left this filter component needs to be
            // and the width of the component OR 0 if we have space
            containerWidth - (left + dimensions.filtersComponentMinWidth),
            0
        );
        // Set the new state with the left value and an open filter
        this.setState({
            left: left - Math.abs(delta),
            filtersOpen: true,
            contentKey
        });
    }

    componentDidMount() {
        const { left, bottom } = this.ref.current.getBoundingClientRect();
        this.setState({ left, top: bottom });
    }

    render() {
        return (
            <div ref={this.ref}>
                <FiltersContainer>
                    <Row>
                        <FilterButton
                            onClick={e => this.openFilter(e, FACET_QUARTER)}
                        >
                            Region
                        </FilterButton>
                        <FilterButton onClick={e => this.openFilter(e)}>
                            Cuisine
                        </FilterButton>
                        <FilterButton onClick={e => this.openFilter(e)}>
                            Price
                        </FilterButton>
                        <FilterButton onClick={e => this.openFilter(e)}>
                            Neighborhood
                        </FilterButton>
                        <FilterButton
                            onClick={e => this.openFilter(e, FACET_EXTRAS)}
                        >
                            More...
                        </FilterButton>
                    </Row>
                </FiltersContainer>
                <div id="FilterCanvasWrap">
                    <FiltersCanvas
                        isOpen={this.state.filtersOpen}
                        top={this.state.top}
                        left={this.state.left}
                        contentKey={this.state.contentKey}
                        defaultRefinement={this.state[this.state.contentKey]}
                        onRequestClose={() => {
                            this.setState({ filtersOpen: false });
                        }}
                        updateVirtuals={(attr, refinements) =>
                            this.setState({
                                [this.state.contentKey]: refinements,
                                filtersOpen: false
                            })
                        }
                    />
                </div>

                <VirtualQuarter
                    attribute={FACET_QUARTER}
                    defaultRefinement={this.state[FACET_QUARTER]}
                />
            </div>
        );
    }
}

export default Filters;
