import styled, { css } from 'react-emotion';
import {
    dimensions,
    sFlexed,
    bs,
    colors,
    shadows,
    bsint,
    mq
} from '../../../settings/styles';

export const FILTER_NAV_SPACING = bsint(0.5);

export const FiltersContainer = styled('nav')(
    mq({
        maxWidth: dimensions.container,
        width: '100%',
        borderBottom: [`1px solid ${colors.grey2}`, '0'],
        marginBottom: [FILTER_NAV_SPACING, 0],
        paddingTop: [FILTER_NAV_SPACING, 0]
    })
);

export const FiltersButtonList = styled('ul')(sFlexed, {
    alignItems: 'center',
    paddingBottom: FILTER_NAV_SPACING
});

export const filtersModalSimple = ({ top, left }) => ({
    overlayClass: css({
        top,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }),
    contentClass: css({
        left,
        position: 'absolute',
        top: 0,
        right: 'auto',
        bottom: 'auto',
        minWidth: dimensions.filtersComponentMinWidth,
        border: `1px solid ${colors.greyDark}`,
        background: 'white',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: dimensions.borderRadius,
        outline: 'none',
        boxShadow: shadows.overlay,
        padding: bs()
    })
});

// export const filtersModalAdvanced = ({ top, left }) => ({
//     overlay: {
//         top,
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         height: 'auto',
//         backgroundColor: 'transparent'
//     },
//     content: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         minWidth: dimensions.filtersComponentMinWidth,
//         border: 0,
//         background: 'transparent',
//         overflow: 'auto',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: dimensions.borderRadius,
//         outline: 'none',
//         padding: 0
//     }
// });
