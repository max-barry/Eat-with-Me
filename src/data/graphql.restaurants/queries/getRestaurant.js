import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withPropsOnChange } from 'recompose';

import { RESTAURANT_FRAGMENT } from '../fragments';

export const GET_RESTAURANT = gql`
    query GetRestaurant($id: ID, $slug: String) {
        getRestaurant(id: $id, slug: $slug) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;

export const gqlGetRestaurant = graphql(GET_RESTAURANT, {
    name: 'getRestaurant',
    options: ({ match }) => ({
        variables: {
            slug: match.params.slug
        }
    })
});

export default compose(
    gqlGetRestaurant,
    withPropsOnChange(['getRestaurant'], ({ getRestaurant }) => ({
        restaurant: getRestaurant.getRestaurant
    }))
);
