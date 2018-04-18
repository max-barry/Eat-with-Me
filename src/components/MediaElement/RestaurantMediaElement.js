import React, { Component } from 'react';

import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';

import Favourite from '../Icon/Favourite';
import ListAdd from '../Icon/ListAdd';
import { IconWithText } from '../Icon/Icon';
import MediaElement from './MediaElement';
import { MediaElementActionList } from './MediaElement.styles';
import urls from '../../settings/urls';

class RestaurantMediaElement extends Component {
    render() {
        const {
            updateLikes,
            hasLiked,
            restaurant: { likes = 0, name, slug, ...attributes },
            ...props
        } = this.props;

        return (
            <MediaElement
                {...props}
                link={urls.RESTAURANT_SLUG.pathname.replace(':slug', slug)}
            >
                {name} + {attributes.id}
                <MediaElementActionList>
                    <li>
                        <IconWithText
                            text={`${likes} likes`}
                            onClick={_ => updateLikes(!hasLiked)}
                        >
                            <Favourite active={hasLiked} />
                        </IconWithText>
                    </li>
                    <li>
                        <IconWithText
                            text={'Add to list'}
                            onClick={this.addToList}
                        >
                            <ListAdd active={false} />
                        </IconWithText>
                    </li>
                </MediaElementActionList>
            </MediaElement>
        );
    }
}

// const RestaurantMediaElement = ({
//     updateLikes,
//     hasLiked,
//     restaurant: { likes = 0, name, slug, ...attributes },
//     ...props
// }) => (
//     <MediaElement
//         {...props}
//         link={urls.RESTAURANT_SLUG.pathname.replace(':slug', slug)}
//     >
//         {name} + {attributes.id}
//         <MediaElementActionList>
//             <li>
//                 <IconWithText
//                     text={`${likes} likes`}
//                     onClick={_ => updateLikes(!hasLiked)}
//                 >
//                     <Favourite active={hasLiked} />
//                 </IconWithText>
//             </li>
//             <li>
//                 <IconWithText text={'Add to list'} onClick={this.addToList}>
//                     <ListAdd active={false} />
//                 </IconWithText>
//             </li>
//         </MediaElementActionList>
//     </MediaElement>
// );

const propsCheck = setPropTypes({
    restaurant: PropTypes.object.isRequired
});

const enhance = compose(propsCheck);

export default enhance(RestaurantMediaElement);
