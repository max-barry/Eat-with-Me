import { compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { componentFromProp, withHandlers, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import { GET_RESTAURANTS } from '../../data/queries';
import { gqlUpdateLikes, gqlGetUser } from '../../data/composers';
import { updateCacheArray } from '../../data/mutations';
import urls from '../../settings/urls';

const hasFavourited = ({ restaurant, user }) => _ =>
    !!(user && user.uid && restaurant.id in user.likes);

const favourite = ({ restaurant, user, history, updateLikes }) => _ => {
    // If not user.uid then redirect them to the register page
    if (!(user && user.uid)) return history.push(urls.REGISTER);

    updateLikes({
        variables: {
            id: restaurant.id,
            uid: user.uid
        },
        optimisticResponse: {
            __typename: 'Mutation',
            updateLikes: {
                __typename: 'Restaurant',
                id: restaurant.id,
                ...restaurant,
                likes: restaurant.likes + 1
            }
        },
        update: (cache, { data: { updateLikes } }) =>
            updateCacheArray(
                GET_RESTAURANTS,
                'getRestaurants',
                cache,
                updateLikes
            )
    });
};

const addToList = props => _ => {};

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired
});

const extraHandlers = withHandlers({
    favourite,
    hasFavourited
});

export default compose(
    propsCheck,
    gqlUpdateLikes,
    gqlGetUser,
    withRouter,
    extraHandlers
)(componentFromProp('component'));
