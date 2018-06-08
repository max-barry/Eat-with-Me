import React from 'react';
import lazySizes from 'lazysizes';
import { cx, css } from 'emotion';
import { responsiveFigureClass, figureClass } from './Img.styles';
import PropTypes from 'prop-types';

const opts = {};
lazySizes.cfg = { ...lazySizes.cfg, ...opts };
lazySizes.init(); // TODO : Only init lazy sizes if it isn't already

const Img = ({ src, alt, className, responsive, height, width, ...props }) => (
    <figure
        role="presentation"
        className={cx(figureClass, {
            [css(responsiveFigureClass, {
                paddingBottom: `${height / width * 100}%`
            })]: !!responsive
        })}
    >
        <img
            className={cx(className, 'lazyload')}
            data-src={src}
            alt={alt}
            height={responsive ? null : height}
            width={responsive ? null : width}
            {...props}
        />
    </figure>
);

Img.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    responsive: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string
};

export default Img;
