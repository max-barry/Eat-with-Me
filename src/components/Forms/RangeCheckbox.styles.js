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
    transitionTimes
} from '../../settings/styles';

const pure = onlyUpdateForKeys([]);

const ITEM_HEIGHT = 48;
const EXTERIOR_BORDER = `1px solid ${colors.greyDark}`;
const RADIUS = dimensions.borderRadius * 1;
const capBevel = side => `
    border-top-${side}-radius: ${RADIUS}px;
    border-bottom-${side}-radius: ${RADIUS}px;
`;

export const RangeList = styled('ul')(sFlexed);

export const RangeListItem = styled('li')(sFlexedCenter, {});

export const RangeLabel = styled('label')(
    sInteractive,
    shevy.h6,
    {
        textAlign: 'center',
        minHeight: ITEM_HEIGHT,
        minWidth: ITEM_HEIGHT,
        lineHeight: `${ITEM_HEIGHT}px`,
        border: EXTERIOR_BORDER,
        borderRight: 0,
        padding: `0 ${bs(0.5)}`,
        position: 'relative',
        transition: `background-color ${transitionTimes.weak}ms`
    },
    `
    &[aria-disabled="true"] {
        display: none;
    }

    li:first-child & {
        ${capBevel('left')};
    }

    li:last-child & {
        ${capBevel('right')};
        border-right: ${EXTERIOR_BORDER};
    }
    
    &:hover, &:focus-within {
        background-color: ${colors.grey1};
    }
`
);

export const rangeActiveClass = css(
    {
        backgroundColor: colors.secondary,
        color: colors.white
    },
    `
    &:hover, &:focus-within {
        background-color: ${colors.secondaryDark};
    }

    span:focus {
        border-color: ${colors.white};
    }
`
);

export const RangeCheck = pure(
    styled('span')(
        {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            border: '1px dashed transparent'
        },
        `
    &:focus {
        outline: 0;
        // background-color: ${colors.grey2};
        border-color: ${colors.greyDark};
    }
`
    )
);
