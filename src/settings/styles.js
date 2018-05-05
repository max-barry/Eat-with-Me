import { css } from 'react-emotion';
import Shevy from 'shevyjs';

export const fontFamily = `"HK Nova", Helvetica Neue, sans-serif`;

export const shevy = new Shevy({
    baseFontSize: '17px',
    baseLineHeight: 1.3,
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

export const { lineHeightSpacing: lhs, baseSpacing: bs } = shevy;

export const sInteractive = css({
    cursor: 'pointer',
    userSelect: 'none'
});

export const sFlexed = css({
    display: 'flex',
    flexDirection: 'row'
});

export const colors = {
    primary: 'blue',
    favourite: 'red',
    valid: 'green',
    greyLight: '#f1f1f1'
};

export const dimensions = {
    navigation: 80,
    navigation__logo: 52,
    filters: 60
};

export const fontWeights = {
    light: 300,
    medium: 500,
    heavy: 600
};

export const transitionTimes = {
    weak: 80
};
