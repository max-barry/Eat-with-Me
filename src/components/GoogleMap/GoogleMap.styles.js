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

export const googleMapContainerClass = moize((width, height) =>
    css({
        height,
        width
    })
);

export const googleMapWrapClass = css({
    height: '100%'
});

const MARKER_PAD = bsint(0.25);
const MARKER_POINT_DIMENSION = 9;
const MARKER_BORDER_COLOR = darken(0.1, colors.grey2);

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

const DOT_DIMENSION = 12;
export const DOT_WIDTH = DOT_DIMENSION;
export const DOT_HEIGHT = DOT_DIMENSION;

export const googleMapDotClass = css({
    height: DOT_DIMENSION,
    width: DOT_DIMENSION,
    boxShadow: shadows.heavy,
    border: `1px solid ${colors.white}`,
    borderRadius: '50%',
    backgroundColor: colors.grey1
});

export const googleMapDotActiveClass = css({
    backgroundColor: colors.secondary,
    borderColor: colors.white
});
