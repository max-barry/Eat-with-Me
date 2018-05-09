import styled, { css } from 'react-emotion';
import {
    colors,
    shevy,
    bs,
    bsint,
    fontWeights,
    sInteractive,
    transitionTimes,
    shadows
} from '../../settings/styles';

const weak = transitionTimes.weak;

export const CHIP_EDGE_PADDING = bs(0.75);
export const CHIP_VERTICAL_DOT_PADDING = `${bsint(0.25)}px`;
export const CHIP_MAX_WIDTH = '180px';
export const CHIP_DOT_DIMENSION = 16;

console.log();

export const chipFocusClass = css({
    boxShadow: shadows.focused
});

export const ChipLabel = styled('label')(
    sInteractive,
    {
        // backgroundColor: colors.offWhite,
        fontSize: shevy.h6.fontSize,
        fontWeight: fontWeights.medium,
        position: 'relative',
        border: `1px solid`,
        borderRadius: 6,
        zIndex: 0,
        overflow: 'hidden',
        display: 'inline-block',
        backgroundColor: 'white',
        transition: `background-color ${weak}ms, color ${weak}ms, box-shadow ${weak}ms`,
        willChange: 'background-color, color, box-shadow',
        maxWidth: CHIP_MAX_WIDTH,
        paddingTop: CHIP_VERTICAL_DOT_PADDING,
        paddingBottom: CHIP_VERTICAL_DOT_PADDING,
        paddingLeft: `${bsint(2)}px`,
        paddingRight: `${bsint(0.5)}px`
    },
    `
    &:hover {background-color: ${colors.offWhite}}
    &:focus {outline: 0;}
    `
);

export const chipLabelTextClass = css({
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

export const chipDotClass = css`
    height: ${CHIP_DOT_DIMENSION}px;
    width: ${CHIP_DOT_DIMENSION}px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    top: 22%;
    z-index: -1;
    will-change: transform;
    &:focus {
        outline: 0;
    }
`;
