import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import { GET_RESTAURANT } from '../../data/queries';
import RestaurantLoading from './Restaurant.loading';
import RestaurantActions from '../RestaurantActions';
// import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

const Content = props => (
    <div>
        <p>{props.restaurant.restaurant.name}</p>
    </div>
);

class RestaurantDetail extends Component {
    render() {
        const props = this.props;
        // const { restaurants } = this.props;
        return <RestaurantActions {...props} component={Content} />;
    }
}

const enhance = compose(
    graphql(GET_RESTAURANT, {
        name: 'restaurant',
        options: ({ match }) => ({
            variables: {
                slug: match.params.slug
            }
        })
    }),
    branch(
        props => props.restaurant && props.restaurant.loading,
        renderComponent(RestaurantLoading)
    )
);

export default enhance(RestaurantDetail);
