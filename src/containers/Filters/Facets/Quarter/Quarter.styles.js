import styled, { css } from 'react-emotion';
import { bs, mq, sElipsify, dimensions } from '../../../../settings/styles';

export const QUARTER_ITEM_WIDTH = 360;

export const QuarterList = styled('ul')(
    mq({
        display: 'inline-flex',
        flexWrap: 'wrap',
        maxWidth: QUARTER_ITEM_WIDTH * 2
        // maxHeight: ['none', '80vh']
    })
);

export const QuarterListItem = styled('li')({
    maxWidth: QUARTER_ITEM_WIDTH,
    width: '100%',
    '&:not(:last-child)': {
        marginBottom: bs()
    }
});

export const quarterTagClass = css(
    sElipsify,
    mq({
        // The width of this is the max-width of a mobile checkbox (320)
        // minus the tap dimension (which is the size of the checkbox)
        // minus the little right hand side padding we add to make the element symmetrical
        // this right hand side padding is the gap between the checkbox tap size (about 48)
        // and the actual visual checkbox within the tap zone (over 2)
        maxWidth: [
            'none',
            320 - dimensions.tap - (dimensions.tap - dimensions.icon) / 2
        ],
        display: 'block',
        '&:nth-child(odd)': {
            paddingRight: [bs(), 0]
        }
    })
);
