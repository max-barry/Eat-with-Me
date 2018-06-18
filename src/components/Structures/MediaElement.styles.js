import styled from 'react-emotion';
import { sFlexed, bs, mq, shevy, colors } from '../../settings/styles';

export const MediaElementContainer = styled('div')(
    sFlexed,
    ({ width: maxWidth, smallFont }) =>
        mq({
            maxWidth,
            alignItems: 'flex-start',
            '> div > *': {
                fontSize: smallFont
                    ? shevy.overline.fontSize
                    : shevy.h6.fontSize
            }
        })
);

export const MediaElementTitle = styled('h5')(shevy.h6, {
    marginBottom: 0
});

export const MediaElementStrap = styled('h6')(shevy.h6, {
    color: colors.greyDark
});
