import styled, { css } from 'react-emotion';

export const figureClass = css({ margin: 0, display: 'block' });

export const responsiveFigureClass = css(
    {
        position: 'relative',
        height: 0,
        width: '100%'
    },
    `
    img, iframe, video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
    }
`
);
