import { css } from 'react-emotion';
import Shevy from 'shevyjs';
import facepaint from 'facepaint';

export const sInteractive = css({
    cursor: 'pointer',
    userSelect: 'none'
});

export const sFlexed = css({
    display: 'flex',
    flexDirection: 'row'
});

export const sFlexedCenter = css(sFlexed, {
    justifyContent: 'center',
    alignItems: 'center'
});

export const colors = {
    primary: '#ffdd03',
    primaryLight: '#ffff54',
    primaryDark: '#c7ac00',
    secondary: '#0325ff',
    secondaryLight: '#7055ff',
    secondaryDark: '#0000ca',
    valid: '#66bb6a',
    error: '#B00020',
    grey1: '#f5f5f5',
    grey2: '#eeeeee',
    greyDark: '#9e9e9e',
    skeleton: '#E7ECEF',
    black: '#131313',
    white: '#fff'
};

export const dimensions = {
    container: 1024,
    badge: 18,
    mast: 80,
    mastLogo: 52,
    filtersBar: 60,
    card: 270,
    cardCompact: 60,
    button: 36,
    filtersComponentMinWidth: 400,
    borderRadius: 3,
    chip: 30,
    tap: 48,
    icon: 32,
    svg: 14,
    outlineOffset: 3,
    swipeDismiss: 165
};

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    heavy: 600
};

export const transitionTimes = {
    weak: 65,
    minimal: 110,
    short: 300,
    ink: 500,
    pageMovement: 700
};

export const easings = {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    in: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    out: 'cubic-bezier(0.4, 0.0, 1, 1)'
};

export const shadows = {
    heavy: `0px 0px 4px rgba(0, 0, 0, 0.6), 0px 0px 8px rgba(0, 0, 0, 0.4)`,
    focused: `0px 0px 4px rgba(0, 0, 0, 0.3)`,
    overlay: `0px 0px 4px rgba(0, 0, 0, 0.1)`
};

export const fontFamily = `"HK Nova", Helvetica Neue, sans-serif`;

export const breakpoints = {
    mobile: 480,
    tablet: 980,
    desktop: 1280
};

export const mediaqueries = Object.entries(breakpoints).map(
    ([_, s]) => `@media(max-width: ${s}px)`
);

export const pointerqueries = ['coarse', 'fine'].map(
    pointer => `@media (pointer: ${pointer})`
);

export const isTouch = pointerqueries[0];
export const isCursor = pointerqueries[1];

export const mq = facepaint(
    Object.entries(breakpoints).map(([n, s]) => `@media(max-width: ${s}px)`)
);

const baseFontSize = 17;
const baseLineHeight = 1.4;

const shevyConf = new Shevy({
    baseLineHeight,
    baseFontSize: `${baseFontSize}px`,
    // AirBnb do a [0.7, 0.85, 1, 1.2, 1.45, 1.75] scale around 20
    // This takes that same scale but from a base of 17
    baseFontScale: [
        2.05882352941176,
        1.70588235294118,
        1.41176470588235,
        1.17647058823529,
        1,
        0.823529411764706
    ],
    addMarginBottom: true,
    proximity: true,
    proximityFactor: 0.85
});

shevyConf.content.fontWeight = fontWeights.regular;

shevyConf.h6.fontWeight = fontWeights.medium;
shevyConf.h6.marginBottom = 0;

shevyConf.overline = {
    ...shevyConf.h6,
    fontSize: 12,
    fontWeight: fontWeights.heavy,
    lineHeight: 1,
    color: colors.greyDark,
    textTransform: 'uppercase'
};

shevyConf.pHeight = Math.floor(baseFontSize * baseLineHeight);

// TODO : Add an unselectable to the overline

export const { lineHeightSpacing: lhs, baseSpacing: bs } = shevyConf;
export const shevy = shevyConf;

export const bsint = (n, fixed) => parseFloat(bs(n).replace('px'));
