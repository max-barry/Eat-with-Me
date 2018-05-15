import styled from 'react-emotion';
import { shevy, sFlexed, bs, fontWeights, colors } from '../../settings/styles';

export const ToggleLabel = styled('label')(sFlexed, { alignItems: 'center' });
export const ToggleLabelText = styled('div')({
    marginRight: bs(),
    width: 220
});

const textStyles = { ...shevy.h6 };
export const ToggleTitle = styled('h5')({
    ...textStyles
});
export const ToggleTag = styled('h6')({
    ...textStyles,
    fontWeight: shevy.content.fontWeight,
    color: colors.greyDark
});
