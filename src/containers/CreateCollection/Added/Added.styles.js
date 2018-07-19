import { css } from 'emotion';
import styled from 'react-emotion';
import { bs, bsint, dimensions, shevy, colors } from '../../../settings/styles';
import {
    cardDeckClass,
    cardStrapClass
} from '../../../components/Structures/Card.styles';
import { buttonSimpleClass } from '../../../components/Buttons/Button.styles';
import { ellipsis } from 'polished';

export const AddedList = styled('ul')({
    height: '500px',
    width: '350px',
    position: 'relative'
});

export const addedItemContainerClass = css({
    position: 'absolute',
    top: 0,
    height: dimensions.cardCompact + bsint(1),
    width: '100%'
    // padding: bs(0.5)
});

export const addedItemTitleClass = props =>
    css(shevy.h6, ellipsis('100%'), {
        lineHeight: 1.3,
        color: props.color || colors.secondaryDark
    });

export const addedItemStrapClass = css(cardStrapClass, {
    marginTop: bs(0.25),
    marginBottom: bs(0.25),
    lineHeight: 1
});

export const addedItemDeckClass = css(cardDeckClass, ellipsis('100%'), {
    lineHeight: 1.3
});

export const addedItemButtonClass = css(buttonSimpleClass, {
    marginTop: bs(0.5)
});

// export const cardCompactActionsClass = css({
//     height: dimensions.button
// });
