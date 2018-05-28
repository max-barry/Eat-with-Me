import styled, { css } from 'react-emotion';
import {
    dimensions,
    sFlexed,
    bs,
    colors,
    shadows,
    bsint
} from '../../settings/styles';

export const FILTER_NAV_SPACING = bsint(0.75);

export const FiltersContainer = styled('nav')({
    maxWidth: dimensions.container,
    width: '100%',
    borderBottom: `1px solid ${colors.grey2}`,
    marginBottom: FILTER_NAV_SPACING,
    paddingTop: FILTER_NAV_SPACING
    // flexDirection: 'column',
    // paddingLeft: bs(0.5),
    // paddingRight: bs(0.5)
});

const filtersNavBar = css(sFlexed, {
    alignItems: 'center',
    paddingBottom: FILTER_NAV_SPACING
    // minHeight: dimensions.filtersBar,
});

export const FiltersButtonList = styled('ul')(filtersNavBar, {});
export const FiltersStatusArea = styled('div')(filtersNavBar, {});

export const filtersStatusElementClass = css`
    &:not(:last-child) {
        margin-right: ${bs(0.5)};
    }
`;

export const filtersModalSimple = ({ top, left }) => ({
    overlay: {
        top,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    content: {
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
    }
});

export const filtersModalAdvanced = ({ top, left }) => ({
    overlay: {
        top,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 'auto',
        backgroundColor: 'transparent'
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minWidth: dimensions.filtersComponentMinWidth,
        border: 0,
        background: 'transparent',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: dimensions.borderRadius,
        outline: 'none',
        padding: 0
    }
});
