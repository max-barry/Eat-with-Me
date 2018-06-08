import styled, { css } from 'react-emotion';
import {
    bs,
    sInteractive,
    sFlexedCenter,
    sFlexed,
    dimensions,
    shevy,
    colors,
    transitionTimes,
    shadows,
    isCursor,
    mq
} from '../../settings/styles';

export const checkboxCheckedClass = 'CheckboxBox--checked';

export const CheckboxContainer = styled('div')(
    sFlexed,
    mq({
        alignItems: 'center',
        maxWidth: ['none', 320]
    })
);

export const CheckboxLabel = styled('label')(
    sFlexed,
    sInteractive,
    mq({
        flexDirection: 'column',
        paddingRight: (dimensions.tap - dimensions.icon) / 2,
        paddingLeft: [bs(0.5), 0]
    })
);

export const checkboxBoxWrapClass = css(sFlexedCenter, sInteractive, {
    minWidth: dimensions.tap,
    minHeight: dimensions.tap,
    '&:focus': { outline: 0 }
});

const unchecked = `.${checkboxBoxWrapClass}:not(.${checkboxCheckedClass})`;
const checked = `.${checkboxBoxWrapClass}.${checkboxCheckedClass}`;

export const checkboxBoxInnerClass = css({
    display: 'block',
    borderRadius: dimensions.borderRadius,
    height: dimensions.icon,
    width: dimensions.icon,
    padding: '6px',
    backgroundColor: 'white',
    border: `1px solid ${colors.greyDark}`,
    transition: `background-color ${transitionTimes.weak}ms`,
    [`${unchecked} & svg`]: {
        opacity: 0
    },
    [`${checked} &`]: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary
    },
    [isCursor]: {
        [`${unchecked}:focus &`]: {
            outline: 0,
            backgroundColor: colors.grey1
        },
        [`${unchecked}:focus & svg, ${unchecked}:hover & svg`]: {
            opacity: 0.2
        },
        [`${checked}:focus &`]: {
            backgroundColor: colors.secondaryDark,
            boxShadow: shadows.focused
        }
    }
});

export const checkboxTitleClass = css(shevy.h6, {
    em: {
        color: colors.greyDark
    }
});

export const checkboxTagClass = css(shevy.h6, {
    color: colors.greyDark,
    fontWeight: shevy.content.fontWeight
});
