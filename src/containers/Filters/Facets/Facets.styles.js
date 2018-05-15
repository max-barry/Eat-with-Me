import styled from 'react-emotion';
import { shevy, colors, fontWeights, bs } from '../../../settings/styles';

export const FacetActionsList = styled('ul')(shevy.h6, {
    display: 'block',
    textAlign: 'right',
    marginLeft: 'auto',
    paddingTop: bs(0.75),
    borderTop: `1px solid ${colors.grey2}`,
    marginBottom: 0
});

export const FacetActionsListItem = styled('li')(
    {
        display: 'inline-block',
        color: colors.greyDark,
        fontWeight: fontWeights.medium
    },
    `
    &:first-child {margin-right: ${bs(2)};}
    `
);
