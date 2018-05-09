import styled, { css, keyframes } from 'react-emotion';
import {
    shevy,
    sFlexedCenter,
    bs,
    colors,
    sFlexed
} from '../../settings/styles';
import { darken, lighten } from 'polished';

export const BigSearchThemes = {
    default: {
        background: colors.offWhite,
        darkerColor: darken(0.45, colors.offWhite),
        focusBorderColor: colors.secondary
    },
    primary: {
        background: colors.primary,
        darkerColor: darken(0.3, colors.primary),
        focusBorderColor: 'white'
    }
};

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
    border-bottom: 3px solid ${props => lighten(0.3, props.theme.darkerColor)};
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

export const BigSearchLongContainer = styled('div')(sFlexed, {
    marginTop: bs(2)
});

export const bigSearchLongClass = css`
    margin-left: ${bs(1)};
    margin-right: ${bs(1)};
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
    li:last-child {
        margin-bottom: 0;
    }
`;

const lineHeight = 26;
const color = colors.skeleton;
const shineColor = colors.offWhite;

// @link https://codepen.io/oslego/pen/XdvWmd
const bigSearchLoadingAnimation = keyframes`
    0% {
        transform: translate3d(-${lineHeight * 3}px, 0, 0);
    }
    
    100% {
        transform: translate3d(200px, 0, 0);
    }
`;

export const bigSearchItemClass = css`
    position: relative;
    margin-bottom: ${bs(1)};
    will-change: opacity, transform;

    &:last-child {
        margin-bottom: 0;
    }
    &:empty {
        overflow: hidden;
        width: 130px;
    }

    &::before,
    &::after {
        content: '';
        // position: absolute;
        display: none;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        width: 100%;
        height: ${lineHeight}px;
        border-radius: 5px;
    }
    &::before {
        background-color: ${color};
    }
    &::after {
        position: absolute;
        top: 0;
        background-image: linear-gradient(
            90deg,
            transparent ${lineHeight}px,
            ${shineColor} ${lineHeight * 2}px,
            transparent
        );
        width: ${lineHeight * 3}px;
        transform: translate3d(-${lineHeight * 3}px, 0, 0);
        animation: ${bigSearchLoadingAnimation} 2000ms infinite;
    }
    &:empty::before,
    &:empty::after {
        display: block;
    }
    &:empty::before {
    }
    &:empty::after {
    }
`;

// export const BigSearchItemLoading = css`
//     &
// `;
