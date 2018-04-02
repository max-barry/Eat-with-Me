import React from 'react';

import { compose } from 'react-apollo';

import { loadWaitingForData } from '../../data/utils';
import getRestaurant from '../../data/graphql.restaurants/queries/getRestaurant';
import RestaurantLoading from './Restaurant.loading';
import RestaurantWrapper from '../../hocs/RestaurantWrapper';

const Content = ({ restaurant, ...props }) => (
    <p>
        {restaurant.name} {JSON.stringify(props)}
    </p>
);

// const RestaurantDetail = ({ getRestaurant: { getRestaurant }, ...props }) => (
const RestaurantDetail = ({ restaurant, ...props }) => {
    return (
        <RestaurantWrapper
            restaurant={restaurant}
            component={Content}
            {...props}
        />
    );
};

const enhance = compose(
    getRestaurant,
    loadWaitingForData('restaurant', RestaurantLoading)
);

export default enhance(RestaurantDetail);
