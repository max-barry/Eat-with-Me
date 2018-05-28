import styled, { css } from 'react-emotion';
import { darken } from 'polished';
import {
    bs,
    sInteractive,
    fontWeights,
    sFlexedCenter,
    sFlexed,
    dimensions,
    shevy,
    colors,
    transitionTimes,
    shadows
} from '../../settings/styles';

export const checkboxCheckedClass = 'CheckboxBox--checked';

export const CheckboxContainer = styled('div')(sFlexed, {
    alignItems: 'center'
});

export const CheckboxLabel = styled('label')(
    sFlexed,
    sInteractive,
    {
        marginBottom: bs(1),
        flexDirection: 'column',
        paddingLeft: bs(0.5)
    },
    `&:last-child { margin-bottom: 0; }`
);

export const checkboxBoxWrapClass = css(
    sFlexedCenter,
    sInteractive,
    {
        minWidth: dimensions.tap,
        minHeight: dimensions.tap
    },
    `&:focus {outline: 0}`
);

export const checkboxBoxInnerClass = css(
    {
        display: 'block',
        borderRadius: dimensions.borderRadius,
        height: dimensions.icon,
        width: dimensions.icon,
        padding: '6px',
        backgroundColor: 'white',
        border: `1px solid ${colors.greyDark}`,
        transition: `background-color ${transitionTimes.weak}ms`
    },
    `
    .${checkboxBoxWrapClass}:not(.${checkboxCheckedClass}) & svg {
        opacity: 0;
    } 
    .${checkboxBoxWrapClass}:not(.${checkboxCheckedClass}):focus & {
        outline: 0;
        background-color: ${colors.grey1};
    }
    .${checkboxBoxWrapClass}:not(.${checkboxCheckedClass}):focus & svg {
        opacity: 0.2;
    }
    .${checkboxBoxWrapClass}:not(.${checkboxCheckedClass}):hover & svg {
        opacity: 0.1;
    }
    .${checkboxBoxWrapClass}.${checkboxCheckedClass} & {
        background-color: ${colors.secondary};
        border-color: ${colors.secondary};
    }
    .${checkboxBoxWrapClass}.${checkboxCheckedClass}:focus & {
        background-color: ${colors.secondaryDark};
        box-shadow: ${shadows.focused};
    }
`
);

export const checkboxTitleClass = css(shevy.h6, {
    em: {
        color: colors.greyDark
    }
});

export const checkboxTagClass = css(shevy.h6, {
    color: colors.greyDark,
    fontWeight: shevy.content.fontWeight
});
