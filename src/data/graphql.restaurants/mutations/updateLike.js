import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withHandlers, compose } from 'recompose';

import { RESTAURANT_FRAGMENT } from '../fragments';
import { USER_FRAGMENT } from '../../graphql.users/fragments';

export const UPDATE_RESTAURANT_LIKES = gql`
    mutation UpdateRestaurantLikes($id: ID!, $uid: String!, $increment: Boolean = true) {
        updateLikes(id: $id, uid: $uid, increment: $increment) {
            user {
                ...${USER_FRAGMENT.name}
            }
            restaurant {
                ...${RESTAURANT_FRAGMENT.name}
            }
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
    ${USER_FRAGMENT.fragment}
`;

const updateLikes = ({ restaurant, user, ...props }) => increment => {
    console.log('updating');
    console.log({
        likes: {
            ...user.likes,
            [restaurant.id]: increment
        }
    });
    return props.updateLikes({
        variables: {
            increment,
            id: restaurant.id,
            uid: user.id
        },
        optimisticResponse: {
            __typename: 'Mutation',
            updateLikes: {
                __typename: 'RestaurantLikedBy',
                user: {
                    __typename: 'User',
                    ...user,
                    likes: {
                        ...user.likes,
                        [restaurant.id]: increment
                    }
                },
                restaurant: {
                    __typename: 'Restaurant',
                    ...restaurant,
                    likes: restaurant.likes + (increment ? 1 : -1)
                }
            }
        }
    });
};

export const gqlUpdateLikes = graphql(UPDATE_RESTAURANT_LIKES, {
    name: 'updateLikes'
});

export default compose(
    gqlUpdateLikes,
    withHandlers({
        updateLikes
    })
);
