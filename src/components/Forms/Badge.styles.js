import styled from 'react-emotion';
import {
    fontWeights,
    transitionTimes,
    dimensions
} from '../../settings/styles';

const DIMENSION = dimensions.badge;

export const BadgeWrap = styled('span')(
    {
        fontSize: 10,
        lineHeight: `${DIMENSION}px`,
        display: 'inline-block',
        width: DIMENSION,
        height: DIMENSION,
        borderRadius: '50%',
        textAlign: 'center',
        fontWeight: fontWeights.medium,
        transformOrigin: 'center',
        transition: `transform ${transitionTimes.minimal}ms`
    },
    `
    &:empty {
        transform: scale(0);
    }
`
);
