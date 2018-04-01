import React, { Component } from 'react';

import { compose } from 'react-apollo';

import { gqlGetRestaurants, loadWaitingForData } from '../../data/composers';
import FeedLoading from './Feed.loading';
import RestaurantActions from '../RestaurantActions';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        const { restaurants } = this.props;

        return (
            <ul>
                {restaurants.map((restaurant, i) => (
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
    gqlGetRestaurants,
    loadWaitingForData('getRestaurants', FeedLoading)
);

export default enhance(Feed);
