import React, { Component } from 'react';
import { connectHits } from 'react-instantsearch/connectors';
import { compose } from 'recompose';
import moize from 'moize';
import { applySpec, prop, path, curry } from 'ramda';
import Filters from './Filters';
import Added from './Added';
import { CreateContainer as Container } from './CreateCollection.styles';
import { ContractableList, Card } from '../../components/Structures';

const loadingItems = Array(1)
    .fill()
    .map(_ => ({
        component: Card,
        props: {
            isLoading: true,
            src: 'src',
            strap: 'strap',
            title: 'title',
            deck: 'deck'
        }
    }));

class CreateCollection extends Component {
    state = { showMap: false };

    constructor(props) {
        super(props);

        this.toggleMap = this.toggleMap.bind(this);
    }

    get items() {
        return this.props.hits.map(item => ({
            component: Card,
            props: {
                src: item.yelp_photos.length ? item.yelp_photos[0] : null,
                strap: [
                    path(['micro_neighborhood', 'name'], item),
                    prop('all_category_groups', item)[0].category
                ].join(' • '),
                title: item.name,
                deck: 'Deck goes here and will say something',
                badge: item.ewm_score.toFixed(2)
            }
        }));
    }

    toggleMap() {
        this.setState({ showMap: !this.state.showMap });
    }

    render() {
        return (
            <Container>
                <Filters />
                <ContractableList columns={2} items={loadingItems}>
                    <Added />
                </ContractableList>
            </Container>
        );
    }
}
const enhance = compose(connectHits);

export default enhance(CreateCollection);
