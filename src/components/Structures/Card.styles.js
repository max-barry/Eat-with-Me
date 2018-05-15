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

export const cardStrapClass = css(shevy.h6, {
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

export const CardStrap = styled('h4')(cardStrapClass);

export const CardBadge = styled('span')(shevy.overline, {
    // color: colors.greyDark
    backgroundColor: colors.primary,
    color: colors.black,
    textTransform: 'none',
    marginRight: bs(0.5),
    borderRadius: dimensions.borderRadius,
    padding: `${bs(0.0625)} ${bs(0.25)}`
});

export const cardDeckClass = css(shevy.h6, {
    marginBottom: 0,
    fontWeight: fontWeights.light
});

export const CardDeck = styled('p')(cardDeckClass);

export const CardActionRow = styled('div')(
    sFlexed,
    { marginTop: bs(0.5) },
    `
    > * {margin-left: ${bs(0.25)}; margin-right: ${bs(0.25)}}
    > *:first-child {margin-left: 0;}
    > *:last-child {margin-right: 0;}
`
);
