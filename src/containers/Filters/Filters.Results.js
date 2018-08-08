import React, { Component } from 'react';
import { map, omit, values, isEmpty } from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { colors, bs } from '../../settings';
import { Card, AnimatedList } from '../../components/Display';
import {
    Main,
    ResultsList,
    AddedArea,
    AddedHeadline,
    AddedInterior,
    LoadMore,
    animatedListStyles
} from './Filters.styles';
import { restaurantSelectors } from '../../redux/ducks/restaurants/restaurants.selectors';
import { ButtonSimple as Button } from '../../components/Buttons';
import addSvg from '../../../public/images/icons/add.svg';
import MiniCard from '../../components/Display/MiniCard';

const AddedMiniCard = ({ hit, remove }) => {
    const Remove = (
        <Button color={colors.error} mini onClick={() => remove(hit)}>
            Remove
        </Button>
    );
    return <MiniCard {...restaurantSelectors.makeCard(hit)} actions={Remove} />;
};

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

class Results extends Component {
    state = {
        collection: {}
    };

    get collectionIsEmpty() {
        return isEmpty(this.state.collection);
    }

    get collectionAsListItems() {
        return values(
            map(
                hit => ({
                    key: hit.id,
                    component: (
                        <AddedMiniCard
                            hit={hit}
                            remove={this.removeFromCollection}
                        />
                    )
                }),
                this.state.collection
            )
        );
    }

    addToCollection = hit =>
        this.setState({
            collection: {
                ...this.state.collection,
                [hit.id]: hit
            }
        });

    removeFromCollection = hit =>
        this.setState({
            collection: omit([hit.id], this.state.collection)
        });

    render = () => {
        const { refine, hits } = this.props;
        const { collection } = this.state;
        const isEmpty = this.collectionIsEmpty;
        const add = this.addToCollection;
        const remove = this.removeFromCollection;

        return (
            <Main>
                <div>
                    <ResultsList>
                        {hits.map(hit => (
                            <Result
                                key={hit.id}
                                hit={hit}
                                added={!!collection[hit.id]}
                                add={add}
                                remove={remove}
                            />
                        ))}
                    </ResultsList>
                    <LoadMore
                        color={colors.secondary}
                        onClick={refine}
                        fullWidth
                    >
                        Load more
                    </LoadMore>
                </div>
                <AddedArea>
                    <AddedInterior>
                        <AddedHeadline>This is the headline</AddedHeadline>
                        {isEmpty && <div>It's empty</div>}
                        <AnimatedList
                            gap={bs(0.5)}
                            items={this.collectionAsListItems}
                            className={animatedListStyles}
                        />
                    </AddedInterior>
                </AddedArea>
            </Main>
        );
    };
}

Results.defaultProps = {};
Results.propTypes = {};

export default connectInfiniteHits(Results);
