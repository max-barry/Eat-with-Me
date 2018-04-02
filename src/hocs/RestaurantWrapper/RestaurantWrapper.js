import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
    componentFromProp,
    // withHandlers,
    // withProps,
    setPropTypes,
    compose,
    withPropsOnChange
} from 'recompose';

import getUser from '../../data/graphql.users/queries/getUser';
import updateLikeHandlers from '../../data/graphql.restaurants/mutations/updateLike';

const addToList = props => _ => {};

// TODO : Optimise with an onChange
const extraProps = withPropsOnChange(
    ['user', 'restaurant'],
    ({ user, restaurant, ...props }) => ({
        hasLiked: !!(user && user.id && user.likes[restaurant.id])
    })
);

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired,
    updateLikes: PropTypes.func.isRequired,
    hasLiked: PropTypes.bool.isRequired
});

export default compose(
    getUser,
    updateLikeHandlers,
    withRouter,
    extraProps,
    // initialProps,
    // extraHandlers,
    propsCheck
)(componentFromProp('component'));
