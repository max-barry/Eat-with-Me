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
import { darken, transitions } from 'polished';

export const cuisineTabsClass = css({
    maxWidth: dimensions.filtersComponentMinWidth * 1.5,
    // padding: bs(0.5)
    marginBottom: bs(2)
});

export const cuisineHeaderListClass = css({
    display: 'inline-flex',
    borderBottom: `1px solid ${colors.greyMid}`,
    marginBottom: bs(1.5)
    // display: 'inline-grid',
    // justifyItems: 'start',
    // 'grid-template-columns': '1fr 1fr 1fr'
});

export const cuisineHeaderClass = css(
    shevy.h6,
    sInteractive,
    {
        fontWeight: fontWeights.medium,
        padding: `${bs(0.5)} ${bs(0.25)}`,
        margin: `0 ${bs(0.25)} 0 ${bs(0.25)}`,
        position: 'relative',
        color: colors.greyText
        // borderBottom: `3px solid ${colors.greyMid}`
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
        background-color: ${colors.offWhite};
        &::before {
            background-color: ${colors.greyLight};
            transform: none;
        }
    }
    &.react-tabs__tab--selected {
        background-color: ${colors.offWhite};
        
        &::before {
            background-color: ${colors.primary};
            transform: none;
        }
        
        &:focus {
            background-color: ${darken(0.05, colors.offWhite)};
        }
    }
`
);

export const cuisinePanelClass = css(sFlexed, {
    // display: 'flex',
    flexWrap: 'wrap'

    // gridTemplateColumns: 'auto auto auto auto auto',
    // gridTemplateRows: '140px 100fr',
    // justifyItems: 'start',
    // gridGap: `${bs(1)} ${bs(0.5)}`
    // gridColumnGap: 20,
    // gridRowGap: 20
    //     justify-items: stretch,
    //     align-items: stretch,
});

export const cuisineChipClass = css({
    margin: bs(0.25)
});

// .container {
//
//  }
