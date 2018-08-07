import React from 'react';
import styled from 'react-emotion';
import lazySizes from 'lazysizes';
import PropTypes from 'prop-types';
import { colors, transitionTimes } from '../../settings';

lazySizes.cfg = { ...lazySizes.cfg, ...{} }; // Merge custom opts
lazySizes.init(); // TODO : Only init lazy sizes if it isn't already

const responsiveStyles = (width, height) => ({
    position: 'relative',
    height: 0,
    width: '100%',
    paddingBottom: `${(height / width) * 100}%`,
    'img, iframe, video': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block'
    }
});

const Figure = styled('figure')(({ responsive, h, w }) => ({
    margin: 0,
    display: 'block',
    backgroundColor: colors.grey1,
    ...(responsive ? responsiveStyles(w, h) : null)
}));

const Image = styled('img')({
    transition: `opacity ${transitionTimes.minimal}ms`,
    '&:not(.lazyloaded)': {
        opacity: 0
    }
});

const Img = ({ src, alt, responsive, height, width, ...props }) => (
    <Figure role="presentation" responsive={responsive} h={height} w={width}>
        <Image
            alt={alt}
            data-src={src}
            className="lazyload"
            height={responsive ? null : height}
            width={responsive ? null : width}
            {...props}
        />
    </Figure>
);

Img.defaultProps = {
    responsive: false
};

Img.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    responsive: PropTypes.bool
};

export default Img;
