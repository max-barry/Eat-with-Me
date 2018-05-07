import styled from 'react-emotion';
import { shevy, sFlexed, bs, fontWeights, colors } from '../../settings/styles';

export const ToggleLabel = styled('label')(sFlexed, { alignItems: 'center' });
export const ToggleLabelText = styled('div')({
    marginRight: bs(),
    width: 220
});

const textStyles = { ...shevy.h6, marginBottom: 0 };
export const ToggleTitle = styled('h5')({
    ...textStyles,
    fontWeight: fontWeights.medium
});
export const ToggleTag = styled('h6')({
    ...textStyles,
    color: colors.greyText
});
