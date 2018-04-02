import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withPropsOnChange } from 'recompose';

import { RESTAURANT_FRAGMENT } from '../fragments';

export const GET_RESTAURANTS = gql`
    query GetRestaurants {
        getRestaurants {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const gqlGetRestaurants = graphql(GET_RESTAURANTS, {
    name: 'getRestaurants'
});

export default compose(
    gqlGetRestaurants,
    withPropsOnChange(['getRestaurants'], ({ getRestaurants }) => ({
        restaurants: getRestaurants.getRestaurants
    }))
);
