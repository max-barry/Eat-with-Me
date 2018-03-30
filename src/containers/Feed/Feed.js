import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { GET_RESTAURANTS } from '../../data/queries';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    render() {
        return this.props.data.loading ? (
            <p>Loading</p>
        ) : (
            <ul>
                {this.props.data.restaurants.map((restaurant, i) => (
                    <RestaurantMediaElement restaurant={restaurant} key={i} />
                ))}
            </ul>
        );
    }
}

export default graphql(GET_RESTAURANTS)(Feed);
