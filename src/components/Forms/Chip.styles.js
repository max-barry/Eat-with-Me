import styled, { css } from 'react-emotion';
import {
    colors,
    shevy,
    bs,
    bsint,
    fontWeights,
    sInteractive,
    transitionTimes,
    easings,
    dimensions
} from '../../settings/styles';

export const CHIP_EDGE_PADDING = bs(0.75);
export const CHIP_VERTICAL_DOT_PADDING = `${bsint(0.25)}px`;
export const CHIP_MAX_WIDTH = '230px';
export const CHIP_HEIGHT = dimensions.chip;
export const CHIP_DOT_DIMENSION = 16;

// export const chipFocusClass = css({
//     boxShadow: shadows.focused
// });

export const ChipLabel = styled('label')(
    sInteractive,
    {
        fontSize: shevy.h6.fontSize,
        fontWeight: fontWeights.medium,
        position: 'relative',
        border: `1px solid`,
        height: CHIP_HEIGHT,
        borderRadius: dimensions.borderRadius * 2,
        zIndex: 0,
        overflow: 'hidden',
        display: 'inline-block',
        backgroundColor: 'white',
        maxWidth: CHIP_MAX_WIDTH,
        paddingTop: CHIP_VERTICAL_DOT_PADDING,
        paddingBottom: CHIP_VERTICAL_DOT_PADDING,
        paddingLeft: `${bsint(2)}px`,
        paddingRight: `${bsint(0.5)}px`
    },
    `
    &::before {
        content: "×";
        width: ${CHIP_DOT_DIMENSION}px;
        height: ${CHIP_DOT_DIMENSION}px;
        font-size: ${CHIP_DOT_DIMENSION + 4}px;
        line-height: ${CHIP_DOT_DIMENSION + 2}px;
        text-align: center;
        display: block;
        position: absolute;
        right: ${CHIP_EDGE_PADDING};
        border-radius: 50%;
        transform: scale(0);
    }

    &:focus-within {
        outline: 1px dashed ${colors.greyDark};
        outline-offset: 3px;
    }
    `
);

export const chipActiveClass = css``;

export const chipLabelTextClass = css({
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    willChange: 'transform'
});

export const chipDotClass = css`
    height: ${CHIP_DOT_DIMENSION}px;
    width: ${CHIP_DOT_DIMENSION}px;
    left: ${CHIP_EDGE_PADDING};
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    top: 22%;
    z-index: -1;
    will-change: transform;
    transform-origin: center;
    transition: transform ${transitionTimes.short}ms ${easings.standard};
    &:focus {
        outline: 0;
    }
`;

export const chipDotActiveClass = css`
    transform: scale(30);
`;
