import styled, { css } from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import {
    sFlexedCenter,
    colors,
    bs,
    shevy,
    sFlexed,
    sInteractive,
    dimensions,
    transitionTimes,
    isCursor
} from '../../settings/styles';

const ITEM_HEIGHT = 48;
const EXTERIOR_BORDER = `1px solid ${colors.greyDark}`;
const RADIUS = dimensions.borderRadius * 1;

const capBevel = side => ({
    [`borderTop${side}Radius`]: RADIUS
});

export const RangeList = styled('ul')(sFlexed);

export const RangeListItem = styled('li')(sFlexedCenter, {});

export const RangeLabel = styled('label')(sInteractive, shevy.h6, {
    textAlign: 'center',
    minHeight: ITEM_HEIGHT,
    minWidth: ITEM_HEIGHT,
    lineHeight: `${ITEM_HEIGHT}px`,
    border: EXTERIOR_BORDER,
    borderRight: 0,
    padding: `0 ${bs(0.5)}`,
    position: 'relative',
    '&[aria-disabled="true"]': { display: 'none' },
    'li:first-child &': { ...capBevel('Left') },
    'li:last-child &': {
        ...capBevel('Right'),
        borderRight: EXTERIOR_BORDER
    },
    [isCursor]: {
        transition: `background-color ${transitionTimes.weak}ms`,
        '&:hover, &:focus-within': {
            backgroundColor: colors.grey1
        }
    }
});

export const rangeActiveClass = css({
    backgroundColor: colors.secondary,
    color: colors.white,
    [isCursor]: {
        '&:hover, &:focus-within': {
            backgroundColor: colors.secondaryDark
        },
        'span:focus': {
            borderColor: colors.white
        }
    }
});

export const RangeCheck = onlyUpdateForKeys([])(
    styled('span')({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        border: '1px dashed transparent',
        '&:focus': {
            outline: 0,
            borderColor: colors.greyDark
        }
    })
);
