import React from 'react';
import PropTypes from 'prop-types';
import {
    MediaElementContainer as Container,
    MediaElementStrap as Strap,
    MediaElementTitle
} from './MediaElement.styles';
import { Img } from '../Performance';
import { bs, breakpoints } from '../../settings/styles';

const MediaElement = ({
    title,
    src,
    alt,
    strap,
    width,
    smallFont,
    ...props
}) => (
    <Container width={width} smallFont={smallFont} {...props}>
        {src && (
            <Img
                src={src}
                alt={alt || title}
                width={width * (1 / 3)}
                style={{
                    marginRight: bs(0.5)
                }}
            />
        )}
        <div style={{ flex: 1 }}>
            <MediaElementTitle>{title}</MediaElementTitle>
            {strap && <Strap>{strap}</Strap>}
        </div>
    </Container>
);

MediaElement.propTypes = {
    title: PropTypes.string.isRequired,
    strap: PropTypes.string,
    img: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    smallFont: PropTypes.bool
};

MediaElement.defaultProps = {
    width: breakpoints.mobile,
    smallFont: false
};

export default MediaElement;
