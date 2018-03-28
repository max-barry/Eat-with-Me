import React, { Component } from 'react';
import { css } from 'react-emotion';

import Favourite from '../Icon/Favourite';
import ListAdd from '../Icon/ListAdd';
import { IconWithText } from '../Icon/Icon';
import MediaElement from './MediaElement';
import { MediaElementActionList } from './MediaElement.styles';

class RestaurantMediaElement extends Component {
    state = { favourited: false, addedToList: false };
    favourite = () =>
        this.setState(state => ({ favourited: !this.state.favourited }));
    addToList = () =>
        this.setState(state => ({ addedToList: !this.state.addedToList }));
    render() {
        return (
            <MediaElement>
                <MediaElementActionList>
                    <li>
                        <IconWithText
                            text={'Favourite it'}
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

export default RestaurantMediaElement;
