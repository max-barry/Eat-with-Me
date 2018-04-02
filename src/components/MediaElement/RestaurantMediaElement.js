import React from 'react';

import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';

import Favourite from '../Icon/Favourite';
import ListAdd from '../Icon/ListAdd';
import { IconWithText } from '../Icon/Icon';
import MediaElement from './MediaElement';
import { MediaElementActionList } from './MediaElement.styles';
import urls from '../../settings/urls';

const RestaurantMediaElement = ({
    favourite,
    hasFavourited,
    restaurant: { likes, name, slug, ...attributes },
    ...props
}) => (
    <MediaElement
        {...props}
        link={urls.RESTAURANT_SLUG.pathname.replace(':slug', slug)}
    >
        {name}
        <MediaElementActionList>
            <li>
                <IconWithText text={`${likes} likes`} onClick={favourite}>
                    <Favourite active={hasFavourited()} />
                </IconWithText>
            </li>
            <li>
                <IconWithText text={'Add to list'} onClick={this.addToList}>
                    <ListAdd active={false} />
                </IconWithText>
            </li>
        </MediaElementActionList>
    </MediaElement>
);

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired
});

const enhance = compose(propsCheck);

export default enhance(RestaurantMediaElement);
