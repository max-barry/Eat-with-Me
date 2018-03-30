import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';

import { GET_RESTAURANTS } from '../../data/queries';
import RestaurantActions from '../RestaurantActions';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        const { restaurants } = this.props;
        return restaurants.loading ? (
            <p>Loading</p>
        ) : (
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

export default compose(graphql(GET_RESTAURANTS, { name: 'restaurants' }))(Feed);
