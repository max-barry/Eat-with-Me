import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { shade, readableColor, tint } from 'polished';
import { colors, bs, shevy, dimensions } from '../../settings';

const Simple = styled('button')(
    shevy.h6,
    ({ color, recessive, disabled, icon, fullWidth }) => ({
        outline: 0,
        border: 0,
        boxShadow: 'none',
        cursor: 'pointer',
        lineHeight: 1,
        backgroundColor: recessive ? 'transparent' : color,
        color: recessive ? color : readableColor(color),
        padding: bs(0.5),
        borderRadius: dimensions.bevel,
        minHeight: dimensions.button,
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        '&:hover, &:focus': {
            backgroundColor: recessive ? tint(0.1, color) : shade(0.95, color),
            outline: 0
        },
        '&:active': {
            backgroundColor: recessive ? tint(0.2, color) : shade(0.9, color)
        },
        '&::before': {
            content: icon ? '""' : null,
            display: 'inline-block',
            width: shevy.h6.fontSize,
            height: shevy.h6.fontSize,
            marginRight: bs(0.25),
            backgroundImage: `url(${icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
            transformOrigin: 'center'
        }
    })
);

Simple.defaultProps = {
    color: colors.grey1,
    disabled: false,
    recessive: false,
    fullWidth: false
};

Simple.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    recessive: PropTypes.bool,
    icon: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default Simple;
