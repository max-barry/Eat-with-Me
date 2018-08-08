import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { shade, readableColor, tint } from 'polished';
import { colors, bs, shevy, dimensions, styles } from '../../settings';

const Simple = styled('button')(
    shevy.h6,
    ({ color, recessive, disabled, icon, fullWidth, mini }) => {
        const readable = readableColor(color);
        const focus = recessive ? tint(0.1, color) : styles.fn.focus(color);
        const active = recessive ? tint(0.2, color) : styles.fn.active(color);
        return {
            outline: 0,
            border: 0,
            boxShadow: 'none',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            padding: bs(0.5),
            borderRadius: dimensions.bevel,
            opacity: disabled ? 0.3 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
            userSelect: 'none',
            lineHeight: 1,
            width: fullWidth ? '100%' : 'auto',
            minHeight: dimensions.button,
            fontSize: mini ? 10 : shevy.h6.fontSize,
            backgroundColor: recessive || mini ? 'transparent' : color,
            color: recessive ? color : readable,
            '&:hover, &:focus': {
                outline: 0,
                backgroundColor: mini ? 'transparent' : focus,
                '&::after': {
                    backgroundColor: focus
                }
            },
            '&:active': {
                backgroundColor: mini ? 'transparent' : active,
                '&::after': {
                    backgroundColor: active
                }
            },
            '&::after, &::before': {
                zIndex: -1
            },
            '&::after': {
                content: mini && !recessive ? '""' : null,
                backgroundColor: color,
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: shevy.h6.fontSize,
                paddingTop: bs(0.5),
                paddingBottom: bs(0.5),
                borderRadius: dimensions.bevel,
                transform: 'translateY(-50%)'
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
                transformOrigin: 'center',
                filter:
                    !recessive && readable === '#fff'
                        ? 'invert(100%)'
                        : undefined
            }
        };
    }
);

Simple.defaultProps = {
    color: colors.grey1,
    disabled: false,
    recessive: false,
    fullWidth: false,
    mini: false
};

Simple.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    recessive: PropTypes.bool,
    icon: PropTypes.string,
    fullWidth: PropTypes.bool,
    mini: PropTypes.bool
};

export default Simple;
