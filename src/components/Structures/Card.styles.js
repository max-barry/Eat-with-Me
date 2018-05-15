import styled, { css } from 'react-emotion';
import {
    dimensions,
    sFlexed,
    bs,
    colors,
    shevy,
    fontWeights,
    bsint,
    sElipsify
} from '../../settings/styles';

const { card: CARD_WIDTH } = dimensions;

export const CardContainer = styled('div')({
    maxWidth: CARD_WIDTH,
    width: '100%'
});

export const cardImgClass = css({
    borderRadius: dimensions.borderRadius
});

export const CardStrap = styled('h4')(shevy.h6, {
    marginTop: bs(0.5),
    color: colors.greyDark
});

export const CardTitle = styled('h3')(shevy.h5, {
    marginTop: bs(0.5),
    marginBottom: bs(0)
    // marginTop: bs(0.5),
    // marginBottom: bs(0.5),
    // color: colors.greyDark,
    // fontWeight: fontWeights.medium
});

export const CardBadge = styled('span')(shevy.overline, {
    // color: colors.greyDark
    backgroundColor: colors.primary,
    color: colors.black,
    textTransform: 'none',
    marginRight: bs(0.5),
    borderRadius: dimensions.borderRadius,
    padding: `${bs(0.0625)} ${bs(0.25)}`
});

export const CardDeck = styled('p')(shevy.h6, {
    marginBottom: 0,
    fontWeight: fontWeights.light
    // color: colors.greyDark
});

export const CardActionRow = styled('div')(
    sFlexed,
    { marginTop: bs(0.5) },
    `
    > * {margin-left: ${bs(0.25)}; margin-right: ${bs(0.25)}}
    > *:first-child {margin-left: 0;}
    > *:last-child {margin-right: 0;}
`
);

export const CardCompactContainer = styled('div')({
    height: dimensions.cardCompact + bsint(1),
    width: '100%',
    padding: bs(0.5)
});

export const CardCompactTitle = styled('h4')(shevy.h6, sElipsify);

export const cardCompactActionsClass = css({
    height: dimensions.simpleButton
});
