import styled, { css } from 'react-emotion';
import { darken } from 'polished';
import {
    sInteractive,
    shevy,
    colors,
    dimensions,
    sFlexedCenter,
    sFlexed,
    bs,
    transitionTimes,
    sElipsify,
    fontWeights
} from '../../settings/styles';

export const ChipDismissibleContainer = styled('div')({});

export const ChipDismissibleWrap = styled('div')(sFlexed, {
    maxWidth: dimensions.button * 5
});

export const ChipDismissibleLabel = styled('span')(shevy.overline, {
    display: 'block',
    marginTop: bs(0.5)
});

const chipDismissibleButton = css(
    sInteractive,
    shevy.overline,
    {
        textTransform: 'none',
        fontWeight: fontWeights.medium,
        backgroundColor: 'transparent',
        position: 'relative',
        border: `1px dashed transparent`,
        // height: dimensions.button,
        lineHeight: 1,
        padding: `${bs(0.25)} ${bs(0.5)}`,
        transition: `background-color ${transitionTimes.weak}ms`
    },
    `&:focus { outline: 0; }`
);

export const ChipDismissibleActionButton = styled('button')(
    sElipsify,
    chipDismissibleButton,
    {
        borderTopLeftRadius: dimensions.borderRadius,
        borderBottomLeftRadius: dimensions.borderRadius
    }
);

export const ChipDismissibleDismissButton = styled('button')(
    sFlexedCenter,
    chipDismissibleButton,
    {
        backgroundColor: colors.grey2,
        borderTopRightRadius: dimensions.borderRadius,
        borderBottomRightRadius: dimensions.borderRadius
    },
    `&:focus, &:hover { background-color: ${darken(0.03, colors.grey2)} }
     &:focus:not(:active) { border-color: ${colors.greyDark} }`
);
