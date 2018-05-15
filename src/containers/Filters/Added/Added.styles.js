import { css } from 'emotion';
import styled from 'react-emotion';

export const AddedList = styled('ul')({
    height: '500px',
    width: '350px',
    position: 'relative'
});

export const addedListItemClass = css({
    position: 'absolute',
    top: 0
});
