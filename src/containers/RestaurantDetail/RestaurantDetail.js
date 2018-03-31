import React from 'react';

import { compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import { gqlGetRestaurant } from '../../data/composers';
import RestaurantLoading from './Restaurant.loading';
import RestaurantActions from '../RestaurantActions';
// import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

const Content = ({ restaurant, ...props }) => (
    <p>
        {restaurant.name} {JSON.stringify(props)}
    </p>
);

const RestaurantDetail = ({ getRestaurant: { getRestaurant }, ...props }) => (
    <RestaurantActions
        restaurant={getRestaurant}
        component={Content}
        {...props}
    />
);

const enhance = compose(
    gqlGetRestaurant,
    branch(
        props => props.getRestaurant && props.getRestaurant.loading,
        renderComponent(RestaurantLoading)
    )
);

export default enhance(RestaurantDetail);
