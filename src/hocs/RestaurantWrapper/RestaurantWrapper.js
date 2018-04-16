import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
    componentFromProp,
    setPropTypes,
    compose,
    withPropsOnChange
} from 'recompose';

import { AuthenticationConsumer } from '../Authentication';
import updateLikeHandlers from '../../data/graphql.restaurants/mutations/updateLike';

const extraProps = withPropsOnChange(
    ['user', 'restaurant'],
    ({ user, restaurant, ...props }) => {
        console.log('!!!');
        console.log(!!user);
        if (user) console.log(!!user.id);
        if (user) console.log(user.likes);
        if (user) console.log(!!user.likes[restaurant.id]);

        console.log(restaurant);

        console.log('!!!');
        return {
            hasLiked: !!(user && user.id && user.likes[restaurant.id])
        };
    }
);

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired,
    updateLikes: PropTypes.func.isRequired,
    hasLiked: PropTypes.bool.isRequired
});

// TODO : Optimize a bit more by only listening to some prop changes (e.g. user or restaurant)

const enhance = compose(
    withRouter,
    AuthenticationConsumer,
    updateLikeHandlers,
    extraProps,
    propsCheck
);

export default enhance(componentFromProp('component'));
