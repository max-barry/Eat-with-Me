import React from 'react';

import Favourite from '../Icon/Favourite';
import ListAdd from '../Icon/ListAdd';
import { IconWithText } from '../Icon/Icon';
import MediaElement from './MediaElement';
import { MediaElementActionList } from './MediaElement.styles';

const RestaurantMediaElement = ({
    favourite,
    restaurant: { likes, name, ...attributes }
}) => (
    <MediaElement>
        {name}
        <MediaElementActionList>
            <li>
                <IconWithText text={`${likes} likes`} onClick={favourite}>
                    <Favourite active={false} />
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

export default RestaurantMediaElement;
