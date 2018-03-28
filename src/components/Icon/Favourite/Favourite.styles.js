import styled, { css } from 'react-emotion';

import { IconBaseStyle } from '../Icon.styles.js';
import { InteractiveStyle } from '../../../styles/common.states';
import { COLORS } from '../../../styles/constants.colors';

export const FavouriteContainer = styled('div')(IconBaseStyle, {
    position: 'relative'
});

export const FavouriteIconElement = css(IconBaseStyle, InteractiveStyle, {
    position: 'absolute',
    top: 0,
    left: 0,
    color: COLORS.favourite
});

export const FavouriteIconInterior = css(IconBaseStyle, InteractiveStyle, {
    willChange: 'transform, opacity'
});
