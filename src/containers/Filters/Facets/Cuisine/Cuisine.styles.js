import { css } from 'emotion';
import {
    dimensions,
    bs,
    sFlexed,
    shevy,
    fontWeights,
    sInteractive,
    colors,
    transitionTimes
} from '../../../../settings/styles';

export const cuisineTabsClass = css({
    maxWidth: dimensions.filtersComponentMinWidth * 1.5,
    marginBottom: bs(2)
});

export const cuisineHeaderListClass = css({
    display: 'inline-flex',
    borderBottom: `1px solid ${colors.grey2}`,
    marginBottom: bs(1.5)
});

export const cuisineHeaderClass = css(
    shevy.h6,
    sInteractive,
    {
        fontWeight: fontWeights.medium,
        padding: `${bs(0.5)} ${bs(0.25)}`,
        margin: `0 ${bs(0.25)} 0 ${bs(0.25)}`,
        position: 'relative',
        color: colors.greyDark
    },
    `
    &::before {
        content: "";
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: background-color ${transitionTimes.weak}ms,
                    transform ${transitionTimes.weak}ms;
        transform: scaleY(0);
        transform-origin: bottom;
    }
    &:focus, &:hover {
        outline: 0;
        background-color: ${colors.grey1};
        &::before {
            background-color: ${colors.grey1};
            transform: none;
        }
    }
    &.react-tabs__tab--selected {
        
        &::before {
            background-color: ${colors.secondaryDark};
            transform: none;
        }
        
        &:focus {
            background-color: ${colors.grey1};
        }
    }
`
);

export const cuisinePanelClass = css(sFlexed, {
    flexWrap: 'wrap'
});

export const cuisineChipClass = css({
    margin: bs(0.25)
});
