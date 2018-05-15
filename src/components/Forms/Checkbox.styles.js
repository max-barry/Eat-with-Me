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

export const CheckboxCheckedClass = 'CheckboxBox--checked';

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

export const CheckboxBoxWrap = css(
    sFlexedCenter,
    sInteractive,
    {
        minWidth: dimensions.tap,
        minHeight: dimensions.tap
    },
    `&:focus {outline: 0}`
);

export const CheckboxBoxInnerStyles = css(
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
    .${CheckboxBoxWrap}:not(.${CheckboxCheckedClass}) & svg {
        opacity: 0;
    } 
    .${CheckboxBoxWrap}:not(.${CheckboxCheckedClass}):focus & {
        outline: 0;
        background-color: ${colors.grey1};
    }
    .${CheckboxBoxWrap}:not(.${CheckboxCheckedClass}):focus & svg {
        opacity: 0.2;
    }
    .${CheckboxBoxWrap}:not(.${CheckboxCheckedClass}):hover & svg {
        opacity: 0.1;
    }
    .${CheckboxBoxWrap}.${CheckboxCheckedClass} & {
        background-color: ${colors.secondary};
        border-color: ${colors.secondary};
    }
    .${CheckboxBoxWrap}.${CheckboxCheckedClass}:focus & {
        background-color: ${colors.secondaryDark};
        box-shadow: ${shadows.focused};
    }
`
);

export const CheckboxTitleStyles = css(shevy.h6, {
    em: {
        color: colors.greyDark
    }
});

export const CheckboxTagStyles = css(shevy.h6, {
    color: colors.greyDark,
    fontWeight: shevy.content.fontWeight
});
