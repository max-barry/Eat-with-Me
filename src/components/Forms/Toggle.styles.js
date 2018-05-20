import styled, { css } from 'react-emotion';
import { shevy, sFlexed, bs, fontWeights, colors } from '../../settings/styles';

export const ToggleLabel = styled('label')(sFlexed, { alignItems: 'center' });
export const ToggleLabelText = styled('div')({
    marginRight: bs(),
    width: 220
});

export const ToggleTitle = styled('h5')(shevy.h6, {});
export const ToggleTag = styled('h6')(shevy.h6, {
    fontWeight: shevy.content.fontWeight,
    color: colors.greyDark
});
