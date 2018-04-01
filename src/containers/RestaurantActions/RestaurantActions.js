import { compose } from 'react-apollo';
import { componentFromProp, withHandlers, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import { GET_RESTAURANTS } from '../../data/queries';
import { gqlUpdateLikes, gqlGetUser } from '../../data/composers';
import { updateCacheArray } from '../../data/mutations';

const favourite = props => _ => {
    const { restaurant, user } = props;

    props.updateLikes({
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

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired
});

const extraHandlers = withHandlers({
    favourite
});

export default compose(propsCheck, gqlUpdateLikes, gqlGetUser, extraHandlers)(
    componentFromProp('component')
);
