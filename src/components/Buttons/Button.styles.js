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
    bsint,
    isCursor
} from '../../settings/styles';
import { darken } from 'polished';

export const buttonBaseClass = css(sInteractive, sFlexed, shevy.h6, {
    padding: bs(0.5),
    backgroundColor: 'transparent',
    textDecoration: 'none',
    border: 0,
    margin: 0,
    lineHeight: 1,
    transition: `background-color ${time.weak}ms`,
    alignItems: 'center',
    height: dimensions.button,
    position: 'relative'
});

export const buttonSimpleClass = css(shevy.h6, buttonBaseClass, {
    marginBottom: 0,
    borderRadius: dimensions.borderRadius,
    border: '1px solid transparent',
    backgroundColor: colors.grey1,
    [isCursor]: {
        '&:hover, &:focus': {
            outline: 0,
            backgroundColor: darken(0.01, colors.grey2)
        },
        '&:focus:not(:active)': {
            border: `1px dashed ${colors.greyDark}`
        },
        '&:active': {
            backgroundColor: darken(0.03, colors.grey2)
        }
    }
});

export const atcClass = css({
    position: 'relative',
    overflow: 'hidden',
    transition: `background-color ${transitionTimes.minimal}ms, color ${
        transitionTimes.weak
    }ms`,
    willChange: 'background-color'
});

export const atcActiveClass = css({
    backgroundColor: colors.secondary,
    color: colors.white,
    [isCursor]: {
        '&:focus:not(:active)': {
            borderColor: colors.white
        },
        '&:focus, &:hover': {
            backgroundColor: darken(0.1, colors.secondary)
        }
    }
});

export const atcSecondTextClass = css({
    position: 'absolute',
    lineHeight: 1,
    left: bsint(0.75) + 16 + 'px'
});
