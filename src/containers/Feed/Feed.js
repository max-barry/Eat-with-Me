import React, { Component } from 'react';

import { compose } from 'react-apollo';

import { loadWaitingForData } from '../../data/utils';
import getRestaurants from '../../data/graphql.restaurants/queries/getRestaurants';
import FeedLoading from './Feed.loading';
import RestaurantWrapper from '../../hocs/RestaurantWrapper';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        const { restaurants } = this.props;

        return (
            <ul>
                {restaurants.map((restaurant, i) => (
                    <RestaurantWrapper
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
    getRestaurants,
    loadWaitingForData('getRestaurants', FeedLoading)
);

export default enhance(Feed);
