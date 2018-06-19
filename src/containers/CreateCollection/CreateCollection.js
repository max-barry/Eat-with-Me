import React, { Component } from 'react';
import {
    connectInfiniteHits,
    connectStateResults
} from 'react-instantsearch/connectors';
import { compose } from 'recompose';
import moize from 'moize';
import { applySpec, prop, invoker, map, head, join, assoc } from 'ramda';
import Filters from './Filters';
import Added from './Added';
import { CreateContainer as Container } from './CreateCollection.styles';
import { Card, ExpandingThirds } from '../../components/Structures';
import { paths } from '../../shared';
import { InfiniteList } from '../../components/Performance';
import { withPropsChecker } from '../../hocs/Debug';

const reshape = moize.deep(
    map(
        compose(
            assoc('component', Card),
            applySpec({
                props: {
                    key: prop('id'),
                    title: prop('name'),
                    src: compose(head, prop('yelp_photos')),
                    strap: compose(
                        join(' • '),
                        paths([
                            ['all_category_groups', 0, 'category'],
                            ['micro_neighborhood', 'name']
                        ])
                    ),
                    badge: compose(invoker(1, 'toFixed')(2), prop('ewm_score'))
                }
            })
        )
    ),
    { maxSize: 20 }
);

const CreateCollectionResults = compose(connectStateResults)(
    ({ columns, items, hasMore, loadMore, ...props }) => {
        console.log(props);
        return (
            <ExpandingThirds
                sticky={true}
                secondary={<Added />}
                columns={columns}
                primary={
                    <InfiniteList
                        items={items}
                        hasMore={hasMore}
                        loadMore={loadMore}
                        isLoadingMore={props.searching}
                    />
                }
            />
        );
    }
);

class CreateCollection extends Component {
    state = { showMap: false };

    constructor(props) {
        super(props);
        this.toggleMap = this.toggleMap.bind(this);
    }

    get hitsLoaded() {
        return !!this.props.hits.length;
    }

    get items() {
        return reshape(this.props.hits);
    }

    get columns() {
        return this.state.showMap ? 1 : 2;
    }

    toggleMap() {
        this.setState({ showMap: !this.state.showMap });
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
                />
            </Container>
        );
    }
}

{
    /* <ExpandingThirds
    loadMore={this.props.hasMore ? this.props.refine : () => {}}
    sticky={true}
    columns={this.columns}
    items={this.items}
>
    <Added />
</ExpandingThirds> */
}

const enhance = compose(connectInfiniteHits);

export default enhance(CreateCollection);
