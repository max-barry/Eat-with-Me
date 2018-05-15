import { css } from 'react-emotion';
import {
    bs,
    sInteractive,
    fontFamily,
    fontWeights,
    transitionTimes as time,
    sFlexed,
    shevy,
    dimensions,
    colors,
    transitionTimes,
    bsint
} from '../../settings/styles';
import { darken } from 'polished';

export const ButtonBase = css(sInteractive, sFlexed, {
    fontFamily,
    fontWeight: fontWeights.medium,
    paddingTop: bs(0.5),
    paddingBottom: bs(0.5),
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    backgroundColor: 'transparent',
    border: 0,
    margin: 0,
    lineHeight: 1,
    transition: `background-color ${time.weak}ms`,
    alignItems: 'center'
});

export const buttonSimpleClass = css(
    shevy.h6,
    ButtonBase,
    {
        marginBottom: 0,
        height: dimensions.simpleButton,
        borderRadius: dimensions.borderRadius,
        border: `1px solid transparent`,
        backgroundColor: colors.grey1
    },
    `
    &:hover {
        background-color: ${darken(0.01, colors.grey2)};
    }
    &:focus {
        outline: none;
        border: 1px dashed ${colors.greyDark};
        background-color: ${darken(0.01, colors.grey2)};
    }
    &:active {
        background-color: ${darken(0.03, colors.grey2)};
    }
`
);

export const atcClass = css({
    position: 'relative',
    overflow: 'hidden',
    transition: `background-color ${transitionTimes.minimal}ms, color ${
        transitionTimes.weak
    }ms`,
    willChange: 'background-color'
});

export const atcActiveClass = css(
    {
        backgroundColor: colors.secondary,
        color: colors.white
    },
    `
    &:focus {
        border-color: ${colors.white};
    }
    &:focus, &:hover {
        background-color: ${darken(0.1, colors.secondary)};
    }
`
);

export const atcSecondTextClass = css({
    position: 'absolute',
    lineHeight: 1,
    // left: parseFloat(bsint(1)) + 16 + 'px'
    left: bsint(0.75) + 16 + 'px'
});
