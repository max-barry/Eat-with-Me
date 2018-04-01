import React from 'react';

import { compose } from 'react-apollo';

import { gqlGetRestaurant, loadWaitingForData } from '../../data/composers';
import RestaurantLoading from './Restaurant.loading';
import RestaurantActions from '../RestaurantActions';

const Content = ({ restaurant, ...props }) => (
    <p>
        {restaurant.name} {JSON.stringify(props)}
    </p>
);

// const RestaurantDetail = ({ getRestaurant: { getRestaurant }, ...props }) => (
const RestaurantDetail = ({ restaurant, ...props }) => {
    return (
        <RestaurantActions
            restaurant={restaurant}
            component={Content}
            {...props}
        />
    );
};

const enhance = compose(
    gqlGetRestaurant,
    loadWaitingForData('getRestaurant', RestaurantLoading)
);

export default enhance(RestaurantDetail);
