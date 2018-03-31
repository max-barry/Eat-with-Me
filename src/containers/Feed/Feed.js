import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import { GET_RESTAURANTS } from '../../data/queries';
import FeedLoading from './Feed.loading';
import RestaurantActions from '../RestaurantActions';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        const { getRestaurants } = this.props;
        return (
            <ul>
                {getRestaurants.getRestaurants.map((restaurant, i) => (
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
    graphql(GET_RESTAURANTS, { name: 'getRestaurants' }),
    branch(
        props =>
            props.getRestaurants &&
            props.getRestaurants.loading &&
            props.getRestaurants.restaurants === undefined,
        renderComponent(FeedLoading)
    )
);

export default enhance(Feed);
