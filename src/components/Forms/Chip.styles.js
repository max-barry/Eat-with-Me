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
import { ellipsis } from 'polished';
import { onlyUpdateForKeys } from 'recompose';

export const CHIP_EDGE_PADDING = bs(0.75);
export const CHIP_VERTICAL_DOT_PADDING = bs(0.25);
export const CHIP_MAX_WIDTH = '230px';
export const CHIP_HEIGHT = dimensions.chip;
export const CHIP_DOT_DIMENSION = 16;

export const ChipLabel = onlyUpdateForKeys(['checked', 'color', 'textColor'])(
    styled('label')(sInteractive, ({ checked, color, textColor }) => ({
        backgroundColor: checked ? color : colors.white,
        color: checked ? textColor : colors.black,
        fontSize: shevy.h6.fontSize,
        fontWeight: fontWeights.medium,
        position: 'relative',
        border: `1px solid ${colors.grey1}`,
        height: CHIP_HEIGHT,
        borderRadius: dimensions.borderRadius * 2,
        zIndex: 0,
        overflow: 'hidden',
        display: 'inline-block',
        maxWidth: CHIP_MAX_WIDTH,
        paddingTop: CHIP_VERTICAL_DOT_PADDING,
        paddingBottom: CHIP_VERTICAL_DOT_PADDING,
        paddingLeft: bs(2),
        paddingRight: bs(0.5),
        '&:before': {
            content: '"×"',
            width: CHIP_DOT_DIMENSION,
            height: CHIP_DOT_DIMENSION,
            right: CHIP_EDGE_PADDING,
            fontSize: CHIP_DOT_DIMENSION + 4,
            lineHeight: `${CHIP_DOT_DIMENSION + 2}px`,
            textAlign: 'center',
            display: 'block',
            position: 'absolute',
            borderRadius: '50%',
            transform: checked ? 'none' : 'scale(1)',
            color: checked ? color : 'transparent',
            backgroundColor: checked ? textColor : 'transparent'
        },
        '&:focus-within': {
            outline: `1px dashed ${colors.greyDark}`,
            outlineOffset: 3
        }
    }))
);

export const chipLabelTextClass = css(ellipsis('100%'), {
    display: 'block',
    willChange: 'transform'
});

export const chipDotClass = css({
    height: CHIP_DOT_DIMENSION,
    width: CHIP_DOT_DIMENSION,
    left: CHIP_EDGE_PADDING,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: '50%',
    top: '22%',
    zIndex: -1,
    willChange: 'transform',
    transformOrigin: 'center',
    transition: `transform ${transitionTimes.short}ms ${easings.standard}`,
    '&:focus': {
        outline: 0
    }
});

export const chipDotActiveClass = css({ transform: 'scale(30)' });
