import styled from 'react-emotion';
import { shevy, sFlexedCenter, bs } from '../../settings/styles';
import { darken } from 'polished';

export const BigSearchContainer = styled('div')`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.background};

    ${props => sFlexedCenter};
`;

export const BigSearchInput = styled('input')`
    font-size: ${shevy.h1.fontSize};
    line-height: ${shevy.h1.lineHeight};
    border: 0;
    border-bottom: 3px solid ${props => props.theme.darkerColor};
    color: ${props => props.theme.darkerColor};
    min-width: 300px;
    max-width: 700px;
    background: transparent;
    padding-top: ${bs(0.25)};
    padding-bottom: ${bs(0.25)};

    &:focus {
        outline: 0;
        border-color: ${props => props.theme.focusBorderColor};
        background-color: ${props => darken(0.02, props.theme.background)};
    }

    &::-moz-selection {
        color: white;
        background: ${props => props.theme.focusBorderColor};
    }

    &::selection {
        color: white;
        background: ${props => props.theme.focusBorderColor};
    }

    &::placeholder {
        color: ${props => props.theme.darkerColor};
        opacity: 0.5;
    }

    &:-ms-input-placeholder {
        color: ${props => props.theme.darkerColor};
        opacity: 0.5;
    }

    &::-ms-input-placeholder {
        color: ${props => props.theme.darkerColor};
        opacity: 0.5;
    }
`;
