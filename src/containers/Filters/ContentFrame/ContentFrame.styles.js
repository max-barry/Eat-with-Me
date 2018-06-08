import styled from 'react-emotion';
import { mq, shevy, colors, fontWeights, bs } from '../../../settings/styles';

export const ContentFrameExterior = styled('div')({});
export const ContentFrameInterior = styled('div')(
    mq({
        maxHeight: ['none', '80vh']
    })
);

export const ActionsList = styled('ul')(shevy.h6, {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginLeft: 'auto',
    paddingTop: bs(0.75),
    borderTop: `1px solid ${colors.grey2}`,
    marginBottom: 0
});

export const ActionsListItem = styled('li')({
    display: 'inline-block',
    color: colors.greyDark,
    fontWeight: fontWeights.medium,
    '&:not(:last-child)': {
        marginRight: bs(2)
    }
});
