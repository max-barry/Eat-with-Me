import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import set from 'lodash/set';

import Favourite from '../Icon/Favourite';
import ListAdd from '../Icon/ListAdd';
import { IconWithText } from '../Icon/Icon';
import MediaElement from './MediaElement';
import { MediaElementActionList } from './MediaElement.styles';
import { GET_RESTAURANTS } from '../../data/queries';
import { UPDATE_RESTAURANT_LIKES } from '../../data/mutations';

class RestaurantMediaElement extends Component {
    state = { favourited: false, addedToList: false };

    favourite = async () => {
        const { restaurant: { id, ...attributes } } = this.props;

        this.props.like({
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
            update: (cache, { data: { like } }) => {
                const oldData = cache.readQuery({
                    query: GET_RESTAURANTS
                });
                const idx = oldData.restaurants.findIndex(
                    restaurant => restaurant.id === like.id
                );
                const data = set(
                    oldData,
                    `restaurants[${idx}].likes`,
                    like.likes
                );
                cache.writeQuery({
                    query: GET_RESTAURANTS,
                    data
                });
            }
        });
    };
    addToList = () => {
        this.setState(state => ({ addedToList: !this.state.addedToList }));
    };
    render() {
        const { name, likes } = this.props.restaurant;
        return (
            <MediaElement>
                {name}
                <MediaElementActionList>
                    <li>
                        <IconWithText
                            text={`${likes} likes`}
                            onClick={this.favourite}
                        >
                            <Favourite active={this.state.favourited} />
                        </IconWithText>
                    </li>
                    <li>
                        <IconWithText
                            text={'Add to list'}
                            onClick={this.addToList}
                        >
                            <ListAdd active={this.state.addedToList} />
                        </IconWithText>
                    </li>
                </MediaElementActionList>
            </MediaElement>
        );
    }
}

export default graphql(UPDATE_RESTAURANT_LIKES, { name: 'like' })(
    RestaurantMediaElement
);
