import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import { GET_RESTAURANTS } from '../../data/queries';
import FeedLoading from './Feed.loading';
import RestaurantActions from '../RestaurantActions';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        const { restaurants } = this.props;
        return (
            <ul>
                {restaurants.restaurants.map((restaurant, i) => (
                    <RestaurantActions
                        key={i}
                        restaurant={restaurant}
                        component={RestaurantMediaElement}
                    />
                ))}
            </ul>
        );
    }
}

const enhance = compose(
    graphql(GET_RESTAURANTS, { name: 'restaurants' }),
    branch(
        props => props.restaurants && props.restaurants.loading,
        renderComponent(FeedLoading)
    )
);

export default enhance(Feed);
