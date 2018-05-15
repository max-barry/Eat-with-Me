import React from 'react';
import lazySizes from 'lazysizes';
import { cx, css } from 'emotion';
import { responsiveFigureClass, figureClass } from './Img.styles';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';

const opts = {};
lazySizes.cfg = { ...lazySizes.cfg, ...opts };
lazySizes.init();

const Img = ({ src, alt, className, responsive, height, width, ...props }) => (
    <figure
        role="presentation"
        className={cx(
            figureClass,
            { [responsiveFigureClass]: !!responsive },
            `${
                responsive
                    ? css({ paddingBottom: `${height / width * 100}%` })
                    : ''
            }`
        )}
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

const enhance = compose(
    setPropTypes({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        responsive: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
        className: PropTypes.string
    })
);

export default enhance(Img);
