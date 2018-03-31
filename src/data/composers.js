import { graphql } from 'react-apollo';

import { GET_USER_AUTH, GET_RESTAURANT } from './queries';
import { UPDATE_RESTAURANT_LIKES } from './mutations';

export const gqlGetUserAuth = graphql(GET_USER_AUTH, {
    name: 'getAuthUser'
});

export const gqlGetRestaurant = graphql(GET_RESTAURANT, {
    name: 'getRestaurant',
    options: ({ match }) => ({
        variables: {
            slug: match.params.slug
        }
    })
});

export const gqlUpdateLikes = graphql(UPDATE_RESTAURANT_LIKES, {
    name: 'updateLikes'
});
