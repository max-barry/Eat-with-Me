import styled, { css } from 'react-emotion';
import { ellipsis, darken } from 'polished';
import moize from 'moize';
import {
    bsint,
    colors,
    shevy,
    dimensions,
    fontWeights,
    shadows
} from '../../settings/styles';
import tickSvg from '../SVGs/images/flaticons/success-1.svg';

const MARKER_PAD = bsint(0.25);
const MARKER_POINT_DIMENSION = 9;
const MARKER_BORDER_COLOR = darken(0.1, colors.grey2);
const DOT_DIMENSION = 16;
const DOT_COLOR = colors.white;
const DOT_OUTLINE_COLOR = colors.secondary;

export const googleMapContainerClass = moize((width, height) =>
    css({
        height,
        width
    })
);

export const googleMapWrapClass = css({
    height: '100%'
});

export const MARKER_WIDTH = bsint(4);
export const MARKER_HEIGHT =
    MARKER_PAD * 2 + shevy.overline.fontSize + MARKER_POINT_DIMENSION * 0.5;

export const googleMapMarkerClass = css({
    height: MARKER_HEIGHT,
    position: 'relative',
    zIndex: 0
});

export const GoogleMapMarkerText = styled('span')(shevy.overline, ellipsis, {
    padding: MARKER_PAD,
    fontWeight: fontWeights.medium,
    borderRadius: dimensions.borderRadius,
    boxShadow: `0 0 0 1px ${MARKER_BORDER_COLOR} inset`,
    textTransform: 'none',
    color: colors.black,
    backgroundColor: colors.white,
    width: MARKER_WIDTH,
    maxWidth: MARKER_WIDTH,
    display: 'block',
    textAlign: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        backgroundColor: colors.white,
        width: MARKER_POINT_DIMENSION,
        height: 1,
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)'
    }
});

export const GoogleMapMarkerArrow = styled('span')({
    zIndex: -1,
    position: 'absolute',
    left: '50%',
    bottom: 1,
    transform: 'translate(-50%, 0) rotate(45deg)',
    display: 'block',
    backgroundColor: colors.white,
    height: MARKER_POINT_DIMENSION,
    width: MARKER_POINT_DIMENSION,
    border: `1px solid ${MARKER_BORDER_COLOR}`
});

export const DOT_WIDTH = DOT_DIMENSION;
export const DOT_HEIGHT = DOT_DIMENSION;

export const googleMapDotClass = css({
    height: DOT_DIMENSION,
    width: DOT_DIMENSION,
    boxShadow: '0px 0px 1px black',
    border: `2px solid ${DOT_COLOR}`,
    borderRadius: '50%',
    backgroundColor: DOT_OUTLINE_COLOR,
    position: 'relative',
    '&::before': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '65%',
        backgroundPosition: 'center',
        filter: 'brightness(0) invert(1)'
    }
});

export const googleMapDotActiveClass = css({
    '&::before': {
        content: "''",
        backgroundImage: `url(${tickSvg})`
    }
});
