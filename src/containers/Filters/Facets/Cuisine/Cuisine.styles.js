import { css } from 'emotion';
import {
    dimensions,
    bs,
    sFlexed,
    shevy,
    fontWeights,
    sInteractive,
    colors,
    mq,
    transitionTimes,
    isCursor
} from '../../../../settings/styles';

export const cuisineTabsClass = css(
    mq({
        maxWidth: [dimensions.filtersComponentMinWidth * 1.5, 'none'],
        marginBottom: bs(2)
    })
);

export const cuisineHeaderListClass = css(
    mq({
        display: ['inline-flex', 'flex'],
        borderBottom: `1px solid ${colors.grey2}`,
        marginBottom: bs(1.5)
    })
);

export const cuisineHeaderClass = css(shevy.h6, sInteractive, {
    fontWeight: fontWeights.medium,
    padding: `${bs(0.5)} ${bs(0.25)}`,
    margin: `0 ${bs(0.25)} 0 ${bs(0.25)}`,
    position: 'relative',
    color: colors.greyDark,
    '&::before': {
        content: '""',
        height: 3,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transition: `background-color ${transitionTimes.weak}ms,
                        transform ${transitionTimes.weak}ms`,
        transform: 'scaleY(0)',
        transformOrigin: 'bottom'
    },
    '&.react-tabs__tab--selected': {
        '&::before': {
            backgroundColor: colors.secondaryDark,
            transform: 'none'
        }
    },
    [isCursor]: {
        '&.react-tabs__tab--selected:focus': {
            backgroundColor: colors.grey1
        },
        '&:focus, &:hover': {
            outline: 0,
            backgroundColor: colors.grey1,
            '&::before': {
                backgroundColor: colors.grey1,
                transform: 'none'
            }
        }
    }
});

export const cuisinePanelClass = css(sFlexed, {
    flexWrap: 'wrap'
});

export const cuisineChipClass = css({
    margin: bs(0.25)
});
