import styled, { css } from 'react-emotion';
import { CHIP_HEIGHT } from '../../../../components/Forms/Chip.styles';
import { bs, colors } from '../../../../settings/styles';

export const cuisineContainerClass = css({
    // height: 'auto',
    // overflow: 'auto',
    backgroundColor: colors.offWhite
});
export const CuisineList = styled('ul')({});
export const CuisineListItem = styled('li')(
    { height: CHIP_HEIGHT, marginBottom: bs() },
    `
    &:last-child {margin-bottom: 0;}
`
);
