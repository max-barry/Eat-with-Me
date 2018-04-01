import { graphql } from 'react-apollo';

import { compose, branch, withPropsOnChange, renderComponent } from 'recompose';

import {
    GET_USER_AUTH,
    GET_USER_PROFILE,
    GET_RESTAURANT,
    GET_RESTAURANTS
} from './queries';
import { UPDATE_RESTAURANT_LIKES } from './mutations';

const _normalizeQuery = (query, newProp, fallback = null, watch) =>
    withPropsOnChange([].concat(watch || query), props => ({
        [newProp]:
            props[query] && props[query][query] ? props[query][query] : fallback
    }));

export const loadWaitingForData = (query, loader) =>
    branch(
        props => !props[query] || (props[query] && props[query].loading),
        renderComponent(loader)
    );

export const gqlGetUser = compose(
    graphql(GET_USER_AUTH, { name: 'getUserAuth' }),
    _normalizeQuery('getUserAuth', 'user'),
    branch(
        ({ user }) => !!(user && user.uid),
        compose(
            graphql(GET_USER_PROFILE, {
                name: 'getUserProfile',
                options: ({ getUserAuth }) => ({
                    variables: { uid: getUserAuth.getUserAuth.uid }
                })
            }),
            _normalizeQuery('getUserProfile', 'user')
        )
    )
);

export const gqlGetRestaurant = compose(
    graphql(GET_RESTAURANT, {
        name: 'getRestaurant',
        options: ({ match }) => ({
            variables: {
                slug: match.params.slug
            }
        })
    }),
    _normalizeQuery('getRestaurant', 'restaurant')
);

export const gqlGetRestaurants = compose(
    graphql(GET_RESTAURANTS, { name: 'getRestaurants' }),
    _normalizeQuery('getRestaurants', 'restaurants', [])
);

export const gqlUpdateLikes = graphql(UPDATE_RESTAURANT_LIKES, {
    name: 'updateLikes'
});
