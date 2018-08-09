import React, { Component, Fragment } from 'react';
import { map, values, invoker, ifElse, path } from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { colors, bpProps } from '../../settings';
import { Card, AnimatedList } from '../../components/Display';
import {
    ResultsList,
    AddedHeadline,
    LoadMore,
    animatedListStyles,
    Inner,
    Outer,
    RenderedWrap
} from './Filters.styles';
import {
    DesktopModalActions,
    MobileTopActions,
    MobileBottomActions
} from './Filters.Navigation';
import {
    renderedIsList,
    getRefinedFromRendered,
    componentMap
} from './Filters.shared';
import { restaurantSelectors } from '../../redux/ducks/restaurants/restaurants.selectors';
import { ButtonSimple as Button } from '../../components/Buttons';
import addSvg from '../../../public/images/icons/add.svg';
import MiniCard from '../../components/Display/MiniCard';

const Result = ({ hit, added, add, remove }) => {
    const cardProps = restaurantSelectors.makeCard(hit);
    const actionFn = added ? remove : add;
    const color = added ? colors.secondary : undefined;
    const text = added ? 'Remove from collection' : 'Add to collection';

    const Action = (
        <Button icon={addSvg} color={color} onClick={() => actionFn(hit)}>
            {text}
        </Button>
    );

    return <Card {...cardProps} key={hit.id} action={Action} />;
};

class ResultsComponent extends Component {
    render = () => (
        <Fragment>
            <ResultsList>
                {this.props.hits.map(hit => (
                    <Result
                        key={hit.id}
                        hit={hit}
                        added={!!this.props.collection[hit.id]}
                        add={this.props.add}
                        remove={this.props.remove}
                    />
                ))}
            </ResultsList>
            <LoadMore
                color={colors.secondary}
                onClick={this.props.refine}
                fullWidth
            >
                Load more
            </LoadMore>
        </Fragment>
    );
}

ResultsComponent.defaultProps = {};

ResultsComponent.propTypes = {
    hits: PropTypes.array.isRequired,
    refine: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired
};

export const Results = connectInfiniteHits(ResultsComponent);

const AddedMiniCard = ({ hit, remove }) => {
    const Remove = (
        <Button color={colors.error} mini onClick={() => remove(hit)}>
            Remove
        </Button>
    );
    return <MiniCard {...restaurantSelectors.makeCard(hit)} actions={Remove} />;
};

class Added extends Component {
    get collectionAsList() {
        return values(
            map(
                restaurant => ({
                    key: restaurant.id,
                    component: (
                        <AddedMiniCard
                            hit={restaurant}
                            remove={this.props.remove}
                        />
                    )
                }),
                this.props.collection
            )
        );
    }

    render = () => (
        <Fragment>
            <MediaQuery {...bpProps.mobile}>
                <MobileTopActions
                    title={'Your list'}
                    closeModal={this.props.close}
                />
            </MediaQuery>
            <MediaQuery {...bpProps.notMobile}>
                <AddedHeadline>This is the headline</AddedHeadline>
            </MediaQuery>
            {this.props.isEmpty && <div>It's empty</div>}
            <AnimatedList
                items={this.collectionAsList}
                className={animatedListStyles}
                onDismiss={this.props.remove}
            />
        </Fragment>
    );
}

Added.defaultProps = {};

Added.propTypes = {
    collection: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
};

export { Added };

class ModalContent extends Component {
    facetRefs = {};

    get refinedAttrs() {
        return map(
            ifElse(
                renderedIsList,
                getRefinedFromRendered,
                path(['state', 'refined'])
            ),
            this.facetRefs
        );
    }

    /**
     * Map over each attribute that is rendered and
     * find it's rendered element and fish the refining function
     *
     * Zip the result of this call with an array containing attribute names
     *
     * @memberof ModalContent
     */
    apply = () => this.props.refine(this.refinedAttrs);

    /**
     * Clear all current refinements by calling the "clear" method on each
     *
     * @memberof ModalContent
     */
    clear = () => map(invoker(0, 'clear'), this.facetRefs);

    render = () => {
        const { closeModal, attributes } = this.props;

        const actionProps = {
            closeModal,
            apply: this.apply,
            clear: this.clear
        };

        return (
            <Outer>
                <MediaQuery {...bpProps.mobile}>
                    <MobileTopActions {...actionProps} />
                </MediaQuery>
                <Inner>
                    {Object.keys(attributes).map((attribute, key) => {
                        const RenderedComponent =
                            componentMap[attribute].toRender;
                        const items = attributes[attribute];
                        const onMount = el => (this.facetRefs[attribute] = el);

                        return (
                            <RenderedWrap key={`facet_component_${key}`}>
                                <RenderedComponent
                                    items={items}
                                    onMount={onMount}
                                />
                            </RenderedWrap>
                        );
                    })}
                </Inner>
                <MediaQuery {...bpProps.notMobile}>
                    <DesktopModalActions {...actionProps} />
                </MediaQuery>
                <MediaQuery {...bpProps.mobile}>
                    <MobileBottomActions {...actionProps} />
                </MediaQuery>
            </Outer>
        );
    };
}

export { ModalContent };
