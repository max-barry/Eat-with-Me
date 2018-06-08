import styled, { css } from 'react-emotion';
import { ellipsis, shade } from 'polished';
import {
    sInteractive,
    shevy,
    colors,
    dimensions,
    sFlexedCenter,
    sFlexed,
    bs,
    transitionTimes,
    fontWeights,
    isCursor
} from '../../settings/styles';

export const ChipDismissibleContainer = styled('div')({});

export const ChipDismissibleWrap = styled('div')(sFlexed, {
    maxWidth: dimensions.button * 5
});

export const ChipDismissibleLabel = styled('span')(shevy.overline, {
    display: 'block',
    marginTop: bs(0.5)
});

const shared = css(sInteractive, shevy.overline, {
    textTransform: 'none',
    fontWeight: fontWeights.medium,
    backgroundColor: 'transparent',
    position: 'relative',
    border: '1px dashed transparent',
    padding: `${bs(0.25)} ${bs(0.5)}`,
    [isCursor]: {
        transition: `background-color ${transitionTimes.weak}ms`,
        '&:focus': { outline: 0 }
    }
});

export const ChipDismissibleActionButton = styled('button')(
    ellipsis('100%'),
    shared,
    ({ color = colors.greyDark, backgroundColor = colors.grey1 }) => ({
        color,
        backgroundColor,
        borderTopLeftRadius: dimensions.borderRadius,
        borderBottomLeftRadius: dimensions.borderRadius,
        '&:focus, &:hover': {
            backgroundColor: shade(0.98, backgroundColor)
        },
        '&:focus:not(:active)': {
            borderColor: shade(0.9, backgroundColor)
        }
    })
);

export const ChipDismissibleDismissButton = styled('button')(
    sFlexedCenter,
    shared,
    ({ backgroundColor = colors.grey1 }) => ({
        borderTopRightRadius: dimensions.borderRadius,
        borderBottomRightRadius: dimensions.borderRadius,
        backgroundColor: shade(0.94, backgroundColor),
        '&:focus, &:hover': { backgroundColor: shade(0.92, backgroundColor) },
        '&:focus:not(:active)': {
            borderColor: shade(0.84, backgroundColor)
        }
    })
);
