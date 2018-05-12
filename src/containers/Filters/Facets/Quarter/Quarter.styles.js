import styled from 'react-emotion';
import { bs } from '../../../../settings/styles';

export const QUARTER_ITEM_WIDTH = 360;

export const QuarterList = styled('ul')({
    display: 'inline-flex',
    flexWrap: 'wrap',
    maxWidth: QUARTER_ITEM_WIDTH * 2
});

export const QuarterListItem = styled('li')(
    {
        maxWidth: QUARTER_ITEM_WIDTH,
        width: '100%'
        // minWidth: QUARTER_ITEM_WIDTH * 0.75
    },
    `
    &:not(:last-child) { margin-bottom: ${bs()} }
    `
);

export const QuarterTag = styled('span')(
    {
        maxWidth: 300,
        // paddingRight: bs(),
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    `&:nth-child(odd) {padding-right: ${bs()};}`
);
