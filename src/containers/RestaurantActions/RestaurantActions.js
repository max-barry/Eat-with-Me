import { graphql, compose } from 'react-apollo';
import { componentFromProp, withHandlers } from 'recompose';

import { GET_RESTAURANTS } from '../../data/queries';
import {
    UPDATE_RESTAURANT_LIKES,
    updateCacheArray
} from '../../data/mutations';

const favourite = props => async () => {
    const { restaurant: { id, ...attributes } } = props;

    props.like({
        variables: {
            id
        },
        optimisticResponse: {
            __typename: 'Mutation',
            like: {
                __typename: 'Restaurant',
                id: id,
                ...attributes,
                likes: attributes.likes + 1
            }
        },
        update: (cache, { data: { like } }) =>
            updateCacheArray(GET_RESTAURANTS, 'restaurants', cache, like)
    });
};

const RestaurantActions = compose(
    graphql(UPDATE_RESTAURANT_LIKES, { name: 'like' }),
    withHandlers({
        favourite
    })
)(componentFromProp('component'));

export default RestaurantActions;
