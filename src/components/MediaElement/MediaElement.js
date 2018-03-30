import React from 'react';
import { Link } from 'react-router-dom';

// import Favourite from '../Icons/Favourite';

import {
    MediaElementContainer,
    MediaElementImage,
    MediaElementBody
} from './MediaElement.styles';

const MediaElement = ({ children, link }) => (
    <MediaElementContainer>
        <Link to={link}>
            <MediaElementImage src="https://placehold.it/200x150" />
        </Link>
        <MediaElementBody>{children}</MediaElementBody>
    </MediaElementContainer>
);

export default MediaElement;
