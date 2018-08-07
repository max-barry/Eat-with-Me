import styled, { css } from 'react-emotion';
import {
    bs,
    dimensions,
    colors,
    shadows,
    bsint,
    mq,
    styles,
    shevy,
    fontWeights
} from '../../settings';

const mobileBottomBarSize = dimensions.tap + bsint();

export const Controls = styled('nav')({
    display: 'flex',
    paddingTop: bs(0.5),
    paddingBottom: bs(0.5)
});

export const ActionsList = styled('div')({
    marginTop: bs(),
    paddingTop: bs(),
    borderTop: `1px solid ${colors.grey2}`,
    display: 'flex',
    justifyContent: 'flex-end',
    '> *:not(:last-child)': {
        marginRight: bs()
    }
});

export const Outer = styled('div')(
    mq({ position: 'relative', minHeight: [0, '100vh'] })
);

export const Inner = styled('div')(
    mq({
        padding: [0, styles.fn.pad(0.5, 0.5, `${mobileBottomBarSize}px`, 0.5)]
    })
);

export const MobileTopArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: styles.fn.pad(0.5),
    borderBottom: `1px solid ${colors.grey2}`
});

export const MobileTopTitle = styled('h6')(shevy.h6, {
    color: colors.greyDark
});

export const MobileBottomArea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: styles.fn.pad(0.5),
    borderTop: `1px solid ${colors.grey2}`
});

export const RenderedWrap = styled('div')({
    '&:not(:last-child)': { marginBottom: bs() }
});

export const MODAL_WIDTH = dimensions.input + 2 * bsint(2);

export const modalOverlay = top =>
    css({
        top,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    });

export const modalContent = left =>
    css({
        left,
        position: 'absolute',
        top: 0,
        right: 'auto',
        bottom: 'auto',
        minWidth: MODAL_WIDTH,
        border: `1px solid ${colors.greyDark}`,
        background: 'white',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: dimensions.bevel,
        outline: 'none',
        boxShadow: shadows.overlay,
        padding: bs()
    });

export const Main = styled('div')(
    mq({
        display: 'grid',
        gridTemplateColumns: ['2fr 1fr', '100%'],
        gridGap: styles.fn.pad2(2, 1)
    })
);

export const ResultsArea = styled('div')(
    mq({
        '.ais-InfiniteHits-list': {
            display: 'grid',
            gridTemplateColumns: ['1fr 1fr', '100%'],
            gridGap: styles.fn.pad2(2, 1),
            justifyItems: 'center'
        },
        '.ais-InfiniteHits-loadMore': {
            height: dimensions.button,
            lineHeight: `${dimensions.button}px`,
            width: '100%',
            maxWidth: [dimensions.input, 'none'],
            backgroundColor: colors.secondary,
            fontWeight: fontWeights.medium,
            color: colors.white,
            borderRadius: dimensions.bevel,
            display: 'block',
            margin: styles.fn.pad(1, 'auto', 1, 'auto'),
            '&:focus, &:hover': {
                outline: 0,
                backgroundColor: styles.fn.focus(colors.secondary)
            }
        }
    })
);

export const AddedArea = styled('div')(mq({}));
