import styled, { css } from 'react-emotion';
import {
    dimensions,
    sFlexed,
    bs,
    colors,
    shevy,
    fontWeights
} from '../../settings/styles';
import { onlyUpdateForKeys } from 'recompose';
// import {  } from '../../shared';

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

export const CardTitle = onlyUpdateForKeys([])(
    styled('h3')(shevy.h5, {
        marginTop: bs(0.5),
        marginBottom: bs(0)
    })
);

export const CardStrap = onlyUpdateForKeys([])(styled('h4')(cardStrapClass));

export const CardBadge = onlyUpdateForKeys([])(
    styled('span')(shevy.overline, {
        // color: colors.greyDark
        backgroundColor: colors.primary,
        color: colors.black,
        textTransform: 'none',
        marginRight: bs(0.5),
        borderRadius: dimensions.borderRadius,
        padding: `${bs(0.0625)} ${bs(0.25)}`
    })
);

export const cardDeckClass = css(shevy.h6, {
    marginBottom: 0,
    fontWeight: fontWeights.light
});

export const CardDeck = onlyUpdateForKeys([])(styled('p')(cardDeckClass));

export const CardActionRow = styled('div')(
    sFlexed,
    { marginTop: bs(0.5) },
    `
    > * {margin-left: ${bs(0.25)}; margin-right: ${bs(0.25)}}
    > *:first-child {margin-left: 0;}
    > *:last-child {margin-right: 0;}
`
);
