import styled, { css } from 'react-emotion';
import {
    colors,
    shevy,
    bs,
    fontWeights,
    sInteractive,
    transitionTimes
} from '../../settings/styles';

export const CHIP_EDGE_PADDING = bs(0.75);
export const CHIP_MAX_WIDTH = '180px';
export const CHIP_DOT_DIMENSION = 16;

export const ChipLabel = styled('label')(
    sInteractive,
    {
        // backgroundColor: colors.offWhite,
        fontSize: shevy.h6.fontSize,
        fontWeight: fontWeights.medium,
        position: 'relative',
        border: `1px solid ${colors.greyLight}`,
        borderRadius: 6,
        zIndex: 0,
        overflow: 'hidden',
        display: 'inline-block',
        transition: `background-color ${transitionTimes.weak}ms, color ${
            transitionTimes.weak
        }ms`,
        // width: '100%',
        maxWidth: CHIP_MAX_WIDTH,
        paddingTop: bs(0.25),
        paddingBottom: bs(0.25),
        paddingLeft: bs(2),
        paddingRight: bs(0.5)
    },
    `&:hover {background-color: ${colors.offWhite}}`
);

export const chipLabelTextClass = css({
    display: 'block',
    whiteSpace: 'nowrap',
    // width: '100%',
    overflow: 'hidden',
    // maxWidth: `calc(${CHIP_MAX_WIDTH} - ${bs(0.5)})`,
    textOverflow: 'ellipsis'
});

export const chipDotClass = css`
    height: ${CHIP_DOT_DIMENSION}px;
    width: ${CHIP_DOT_DIMENSION}px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    top: 22%;
    z-index: -1;
    &:focus {
        outline: 0;
    }
`;
