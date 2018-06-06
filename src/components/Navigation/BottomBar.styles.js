import styled, { css } from 'react-emotion';
import {
    sFlexed,
    dimensions,
    colors,
    easings,
    transitionTimes,
    breakpoints
} from '../../settings/styles';

export const BottomBarList = styled('nav')(sFlexed, {
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTop: `1px solid ${colors.grey2}`
});

export const BottomBarInterior = styled('div')(sFlexed, {
    maxWidth: breakpoints.mobile,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
});

export const headroomClass = css({
    '&.headroom--unfixed': {
        position: 'relative',
        transform: 'none',
        transition: `transform ${transitionTimes.minimal}ms ${easings.in}`
    },
    '&.headroom--scrolled': {
        // transition: transform 200ms ease-in-out;
    },
    '.headroom--unpinned': {
        transform: 'translate3d(0%, 100%, 0)',
        transition: `transform ${transitionTimes.minimal}ms ${easings.out}`
    },
    '.headroom--pinned': {
        transform: 'none',
        transition: `transform ${transitionTimes.minimal}ms ${easings.in}`
    }
});
