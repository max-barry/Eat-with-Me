import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { compose } from 'recompose';
import moize from 'moize';
import { applySpec, prop, invoker, map, head, join, assoc } from 'ramda';
import Filters from './Filters';
import Added from './Added';
import { CreateContainer as Container } from './CreateCollection.styles';
import { ContractableList, Card } from '../../components/Structures';
import { paths } from '../../shared';

const loadingItems = Array(6)
    .fill()
    .map(_ => ({
        component: Card,
        props: { isLoading: true }
    }));

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

class CreateCollection extends Component {
    state = { showMap: false };

    constructor(props) {
        super(props);
        this.toggleMap = this.toggleMap.bind(this);
    }

    get items() {
        const hits = this.props.hits;
        return hits.length ? reshape(hits) : loadingItems;
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
                <ContractableList
                    sticky={true}
                    columns={this.columns}
                    items={this.items}
                >
                    <Added />
                </ContractableList>
                <button onClick={() => this.props.refine()}>clicky</button>
            </Container>
        );
    }
}

const enhance = compose(connectInfiniteHits);

export default enhance(CreateCollection);
