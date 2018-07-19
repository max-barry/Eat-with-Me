import React, { Component, Fragment } from 'react';
import {
    connectInfiniteHits,
    connectStateResults
} from 'react-instantsearch/connectors';
import { Hits } from 'react-instantsearch/dom';
import { compose, onlyUpdateForKeys } from 'recompose';
import moize from 'moize';
import {
    applySpec,
    prop,
    propOr,
    invoker,
    map,
    head,
    join,
    assoc
} from 'ramda';
import Filters from './Filters';
import Added from './Added';
import {
    CreateContainer as Container,
    CreateLoadingRow as LoadingRow,
    CreateActionContainer as ActionContainer
} from './CreateCollection.styles';
import {
    Card,
    ExpandingThirds,
    MediaElement
} from '../../components/Structures';
import { paths } from '../../shared';
import { InfiniteList } from '../../components/Performance';
import { ToggleWithLabel } from '../../components/Forms';
import { bs } from '../../settings/styles';
import { ButtonAddToCollection } from '../../components/Buttons';
import SearchableMap from './SearchableMap/SearchableMap';

const reshape = moize.deep(
    map(
        compose(
            assoc('component', Card),
            applySpec({
                props: {
                    key: prop('id'),
                    title: prop('name'),
                    src: compose(head, propOr([], 'yelp_photos')),
                    coordinates: prop('_geoloc'),
                    // TODO : More efficient way to set onClick without inline func
                    action: () => (
                        <ButtonAddToCollection
                            added={false}
                            onClick={() => console.log('clicked')}
                        />
                    ),
                    strap: compose(
                        join(' • '),
                        paths([
                            ['all_category_groups', 0, 'category'],
                            ['micro_neighborhood', 'name']
                        ])
                    ),
                    badge: compose(
                        invoker(1, 'toFixed')(2),
                        propOr(0, 'ewm_score')
                    )
                }
            })
        )
    ),
    { maxSize: 20 }
);

const ActionArea = ({ toggleMap, isMapShown, items }) => {
    return (
        <ActionContainer>
            <ToggleWithLabel
                compact={true}
                checked={isMapShown}
                onChange={toggleMap}
                title="Show map"
                name="show_map"
                style={{ marginBottom: bs(1) }}
            />
            {!isMapShown && <Added />}
            {isMapShown && <SearchableMap items={items} />}
        </ActionContainer>
    );
};

const LoadingResults = onlyUpdateForKeys([])(_ => (
    <Fragment>
        {Array(5)
            .fill()
            .map((_, i) => (
                <LoadingRow key={`loading_${i}`}>
                    <Card isLoading={true} />
                    <Card isLoading={true} />
                </LoadingRow>
            ))}
    </Fragment>
));

const CreateCollectionResults = compose(connectStateResults)(
    ({ columns, items, hasMore, loadMore, ...props }) => {
        // console.log(items);
        return (
            <ExpandingThirds
                sticky={true}
                columns={columns}
                secondary={
                    <ActionArea
                        items={items}
                        toggleMap={props.toggleMap}
                        isMapShown={props.isMapShown}
                    />
                }
                primary={
                    !!items.length ? (
                        <InfiniteList
                            items={items}
                            hasMore={hasMore}
                            loadMore={loadMore}
                            isLoadingMore={props.searching}
                        />
                    ) : (
                        <LoadingResults />
                    )
                }
            />
        );
    }
);

class CreateCollection extends Component {
    state = { isMapShown: false };

    constructor(props) {
        super(props);
        this.toggleMap = this.toggleMap.bind(this);
    }

    get items() {
        return reshape(this.props.hits);
    }

    get columns() {
        return this.state.isMapShown ? 1 : 2;
    }

    toggleMap() {
        this.setState({ isMapShown: !this.state.isMapShown });
    }

    render() {
        return (
            <Container>
                <Filters />
                <CreateCollectionResults
                    columns={this.columns}
                    items={this.items}
                    hasMore={this.props.hits.length < 200}
                    loadMore={this.props.refine}
                    toggleMap={this.toggleMap}
                    isMapShown={this.state.isMapShown}
                />
            </Container>
        );
    }
}

// TODO : There is a double Algolia hit because you're setting isBar to a false value. Leave it undetermined

const enhance = compose(connectInfiniteHits);

export default enhance(CreateCollection);
