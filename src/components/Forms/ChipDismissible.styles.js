import styled, { css } from 'react-emotion';
import {
    sInteractive,
    shevy,
    colors,
    dimensions,
    sFlexedCenter,
    sFlexed,
    bs,
    transitionTimes,
    sElipsify
} from '../../settings/styles';

export const ChipDismissibleContainer = styled('div')({});

export const ChipDismissibleWrap = styled('div')(sFlexed, {
    maxWidth: dimensions.simpleButton * 6
});

export const ChipDismissibleLabel = styled('span')(shevy.overline, {
    display: 'block',
    marginTop: bs(0.5)
});

const chipDismissibleButton = css(
    sInteractive,
    shevy.h6,
    {
        backgroundColor: 'transparent',
        position: 'relative',
        border: `1px dashed transparent`,
        height: dimensions.simpleButton,
        lineHeight: 1,
        padding: `0 ${bs(0.5)}`,
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
        backgroundColor: colors.grey1,
        borderTopRightRadius: dimensions.borderRadius,
        borderBottomRightRadius: dimensions.borderRadius
    },
    `&:focus, &:hover { background-color: ${colors.grey2} }
     &:focus:not(:active) { border-color: ${colors.greyDark} }`
);
