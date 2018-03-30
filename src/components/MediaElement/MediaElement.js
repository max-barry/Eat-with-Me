import React from 'react';

// import Favourite from '../Icons/Favourite';

import {
    MediaElementContainer,
    MediaElementImage,
    MediaElementBody
} from './MediaElement.styles';

const MediaElement = ({ children }) => (
    <MediaElementContainer>
        <MediaElementImage src="https://placehold.it/200x150" />
        <MediaElementBody>{children}</MediaElementBody>
    </MediaElementContainer>
);

export default MediaElement;
