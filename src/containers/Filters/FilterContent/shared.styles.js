import styled from 'react-emotion';
import { shevy, colors, fontWeights, bs } from '../../../settings/styles';

export const ActionsList = styled('ul')(shevy.h6, {
    display: 'block',
    textAlign: 'right',
    // justifyContent: 'space-between',
    // maxWidth: dimensions.filtersComponentMinWidth * 0.5,
    marginLeft: 'auto',
    paddingTop: bs(0.75),
    borderTop: `1px solid ${colors.greyMid}`,
    marginBottom: 0
});

export const ActionsListItem = styled('li')(
    {
        display: 'inline-block',
        color: colors.greyText,
        fontWeight: fontWeights.medium
    },
    `
    &:first-child {margin-right: ${bs(2)};}
    `
);
