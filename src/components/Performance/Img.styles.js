import styled, { css } from 'react-emotion';
import { colors, transitionTimes } from '../../settings/styles';

export const figureClass = css({
    margin: 0,
    display: 'block',
    backgroundColor: colors.grey1
});

export const responsiveFigureClass = css({
    position: 'relative',
    height: 0,
    width: '100%',
    'img, iframe, video': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block'
    }
});

export const imgClass = css({
    transition: `opacity ${transitionTimes.minimal}ms`,
    '&:not(.lazyloaded)': {
        opacity: 0
    }
});
