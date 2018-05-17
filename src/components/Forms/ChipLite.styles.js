import styled, { css } from 'react-emotion';
import {
    sInteractive,
    shevy,
    dimensions,
    colors,
    bs,
    transitionTimes,
    sFlexed,
    sFlexedCenter,
    easings
} from '../../settings/styles';

export const CHIP_LITE_DOT_DIMENSION = 16;
export const CHIP_LITE_COLOR = colors.secondary;
export const CHIP_LITE_COLOR_FOCUS = colors.secondaryDark;
export const CHIP_LABEL_PADDING = bs(0.5);

export const ChipLiteLabel = styled('label')(
    sInteractive,
    shevy.h6,
    {
        height: dimensions.chip,
        padding: `${bs(0.25)} ${CHIP_LABEL_PADDING}`,
        borderRadius: dimensions.borderRadius,
        backgroundColor: colors.grey1,
        position: 'relative',
        paddingLeft: bs(1.75),
        transition: `colors ${transitionTimes.minimal}ms, background-color ${
            transitionTimes.minimal
        }ms`
    },
    `&:hover {background-color: ${colors.grey2}}`
);

export const chipLiteFocusedClass = css({
    outline: `1px dashed ${colors.greyDark}`,
    outlineOffset: dimensions.outlineOffset
});

export const chipLiteActiveClass = css(
    {
        backgroundColor: CHIP_LITE_COLOR,
        color: colors.white
    },
    `&:hover {background-color: ${CHIP_LITE_COLOR_FOCUS}}
    svg {transform: none !important;}`
);

export const ChipCheckboxProxy = styled('span')(
    sFlexedCenter,
    {
        borderRadius: '50%',
        height: CHIP_LITE_DOT_DIMENSION,
        width: CHIP_LITE_DOT_DIMENSION,
        backgroundColor: colors.white,
        position: 'absolute',
        left: CHIP_LABEL_PADDING,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    `&:focus {outline:0}
    svg {transform: scale(0); transition: transform ${
        transitionTimes.minimal
    }ms ${easings.standard}}`
);
