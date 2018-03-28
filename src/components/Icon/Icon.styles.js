import styled, { css } from 'react-emotion';

import { InteractiveStyle } from '../../styles/common.states';

const ICON_TOUCH_AREA = 48;
const ICON_VISUAL_DIMENSION = 36;

export const IconBaseStyle = css({
    width: ICON_TOUCH_AREA,
    height: ICON_TOUCH_AREA,
    display: 'inline-block',
    padding: (ICON_TOUCH_AREA - ICON_VISUAL_DIMENSION) / 2
});

export const IconWithTextContainer = styled('div')(InteractiveStyle, {
    display: 'flex',
    alignItems: 'center',
    lineHeight: `${ICON_TOUCH_AREA}px`
});
