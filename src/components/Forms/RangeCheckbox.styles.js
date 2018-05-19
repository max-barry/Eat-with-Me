import styled, { css } from 'react-emotion';
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

const ITEM_HEIGHT = 48;
const EXTERIOR_BORDER = `1px solid ${colors.greyDark}`;
const RADIUS = dimensions.borderRadius * 1;
// const titlecase = str => str[0].toUpperCase() + str.substring(1);
const capBevel = side => `
    border-top-${side}-radius: ${RADIUS}px;
    border-bottom-${side}-radius: ${RADIUS}px;
`;

// export const RangeContainer = styled('div')({
//     position: 'relative'
// });

export const RangeList = styled('ul')({});

export const RangeListItem = styled('li')(sFlexedCenter, {
    // borderRadius: dimensions.borderRadius * 2
    // borderTop: EXTERIOR_BORDER,
    // borderBottom: EXTERIOR_BORDER
});

export const RangeLabel = styled('label')(
    sInteractive,
    shevy.h6,
    {
        // height: HANDLE_DIMENSION,
        // width: HANDLE_DIMENSION,
        // position: 'relative'
        // alignItems: 'center',

        textAlign: 'center',
        minHeight: ITEM_HEIGHT,
        minWidth: ITEM_HEIGHT,
        lineHeight: `${ITEM_HEIGHT}px`,
        border: EXTERIOR_BORDER,
        borderRight: 0,
        // border
        // lineHeight: ITEM_DIMENSION
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

export const RangeCheck = styled('span')(
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
);

// export const rangeNoPreviousClass = css(capBevel('left'), {
//     // borderRight: EXTERIOR_BORDER
// });

// export const rangeNoNextClass = css(capBevel('right'), {
//     // borderLeft: EXTERIOR_BORDER
// });

// export const rangeActiveClass = css({
//     backgroundColor: colors.secondary,
//     color: colors.white
// });

// export const RangeHandleWrap = styled('div')({
//     position: 'absolute',
//     backgroundColor: 'rgba(255, 0, 0, 0.5)',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0
// });

// export const RangeHandle = styled('span')({
//     // position: 'absolute',
//     backgroundColor: 'rgba(0, 255, 0, 0.5)',
//     height: HANDLE_DIMENSION,
//     width: HANDLE_DIMENSION * 2,
//     display: 'block',
//     borderRadius: 10
//     // left: 0,
//     // right: 0,
//     // top: 0,
//     // bottom: 0
// });

// export const RangeHandleConnector = styled('span')({
//     // position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 255, 0.5)',
//     height: HANDLE_DIMENSION,
//     width: 0
//     // left: 0,
//     // right: 0,
//     // top: 0,
//     // bottom: 0
// });

// export const rangeActiveClass = css({
//     backgroundColor: colors.secondary,
//     color: colors.white
// });

// export const rangeActiveCapClass = css({});
