import { readableColor } from 'polished';
import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import PropTypes from 'prop-types';
import { colors, dimensions, transitionTimes } from '../../settings';

export const BADGE_SIZE = dimensions.icon / 2;

const Badge = styled('span')(({ color, small }) => ({
    fontSize: 10,
    lineHeight: `${small ? BADGE_SIZE / 2 : BADGE_SIZE}px`,
    display: 'inline-block',
    width: small ? BADGE_SIZE / 2 : BADGE_SIZE,
    height: small ? BADGE_SIZE / 2 : BADGE_SIZE,
    borderRadius: '50%',
    textAlign: 'center',
    transformOrigin: 'center',
    transition: `transform ${transitionTimes.minimal}ms`,
    backgroundColor: color,
    color: readableColor(color),
    '&:empty': {
        transform: 'scale(0)'
    }
}));

Badge.defaultProps = {
    small: false,
    color: colors.primaryLight
};

Badge.propTypes = {
    color: PropTypes.string,
    small: PropTypes.bool
};

export default onlyUpdateForKeys(['children'])(Badge);
