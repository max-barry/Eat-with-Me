import { injectGlobal } from 'emotion';
import { shevy, fontFamily } from './settings/styles';

const { content, ...headings } = shevy;

const hs = [1, 2, 3, 4, 5, 6]
    .map(
        size => `
            h${size} {
                font-size: ${headings[`h${size}`].fontSize};
                line-height: ${headings[`h${size}`].lineHeight};
                margin-bottom: ${headings[`h${size}`].marginBottom};
            }
    `
    )
    .join('\n');

const typography = `
    html, body {
        font-size: ${content.fontSize};
        line-height: ${content.lineHeight};
        font-family: ${fontFamily};
        letter-spacing: 0.01em;
    }

    p {
        font-size: ${content.fontSize};
        line-height: ${content.lineHeight};
        margin-bottom: ${content.marginBottom};
    }
    
    ${hs}
`;

injectGlobal`
    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body, h1, h2, h3, h4, h5, h6, p, ol, ul {
        margin: 0;
        padding: 0;
        font-weight: normal;
    }

    ol, ul {
        list-style: none;
        margin-bottom: 0;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    ${typography}
`;
