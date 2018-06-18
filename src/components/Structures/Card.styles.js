import styled, { css } from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { ellipsis } from 'polished';
import moize from 'moize';
import {
    dimensions,
    sFlexed,
    bs,
    colors,
    shevy,
    fontWeights,
    transitionTimes,
    bsint
} from '../../settings/styles';

const { card: CARD_WIDTH } = dimensions;

export const CARD_IMG_HEIGHT = 180;
export const CARD_IMG_WIDTH = 270;

const linear = (color, size) =>
    `linear-gradient(${color} ${size}px, transparent 0),`;

const withPx = (top, left = 0) => `${left}px ${top}px,`;

const skeletonStyles = moize((hasStrap, hasDeck, hasAction) =>
    `
    /* layer 4: image */ ${linear(colors.grey1, CARD_IMG_HEIGHT)}
    /* layer 3: strap */ ${hasStrap && linear(colors.grey1, shevy.pHeight)}
    /* layer 2: title */ ${linear(colors.grey2, shevy.pHeight)}
    /* layer 1: deck */ ${hasDeck && linear(colors.grey1, shevy.pHeight)}
    /* layer 0: action */ ${hasAction &&
        linear(colors.grey2, dimensions.button)}
    `
        .trim()
        .slice(0, -1)
);

const skeletonPositions = moize((hasStrap, hasDeck, hasAction) => {
    const m = bsint(0.5);
    const el = shevy.pHeight + m + 0.5 * m;
    return `
        /* layer 4: image */ ${withPx(0)}
        /* layer 3: strap */ ${hasStrap && withPx(CARD_IMG_HEIGHT + m)}
        /* layer 2: title */ ${withPx(
            CARD_IMG_HEIGHT + m + (hasStrap ? el : 0)
        )}
        /* layer 1: deck */ ${withPx(
            CARD_IMG_HEIGHT + el + (hasStrap ? el : 0)
        )}
        /* layer 0: action */ ${withPx(
            CARD_IMG_HEIGHT + el + (hasStrap ? el : 0) + (hasDeck ? el : 0)
        )}
    `
        .trim()
        .slice(0, -1);
});

const skeletonSizes = moize((hasStrap, hasDeck, hasAction) =>
    `
    /* layer 4: image */ auto auto,
    /* layer 3: strap */ ${hasStrap && 'auto auto'},
    /* layer 2: title */ ${'75% auto'},
    /* layer 1: deck */ ${hasDeck && '60% auto'},
    /* layer 0: action */ ${hasAction && withPx(dimensions.button, 74)}
    `
        .trim()
        .slice(0, -1)
);

export const CardContainer = styled('div')(
    ({ isLoading, hasStrap, hasDeck, hasAction }) => ({
        maxWidth: CARD_WIDTH,
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: isLoading
            ? skeletonStyles(hasStrap, hasDeck, hasAction)
            : 'none',
        backgroundSize: isLoading
            ? skeletonSizes(hasStrap, hasDeck, hasAction)
            : '0',
        backgroundPosition: isLoading
            ? skeletonPositions(hasStrap, hasDeck, hasAction)
            : 'auto',
        '> *': {
            transition: `opacity ${transitionTimes.minimal}ms`,
            opacity: isLoading ? 0 : 1
        }
    })
);

export const cardImgClass = css({
    borderRadius: dimensions.borderRadius
});

export const cardStrapClass = css(shevy.h6, ellipsis, {
    marginTop: bs(0.5),
    color: colors.greyDark
});

export const CardTitle = onlyUpdateForKeys([])(
    styled('h3')(shevy.h5, {
        marginTop: bs(0.5),
        marginBottom: 0
    })
);

export const CardStrap = onlyUpdateForKeys([])(styled('h4')(cardStrapClass));

export const CardBadge = onlyUpdateForKeys([])(
    styled('span')(shevy.overline, {
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
