import React from 'react';
import {
    compose,
    onlyUpdateForKeys,
    setPropTypes,
    defaultProps
} from 'recompose';
import PropTypes from 'prop-types';
import { BadgeWrap } from './Badge.styles';
import { colors } from '../../settings/styles';

const Badge = ({ count, color, backgroundColor, style, ...props }) => (
    <BadgeWrap style={{ color, backgroundColor, ...style }} {...props}>
        {count || null}
    </BadgeWrap>
);

const enhance = compose(
    onlyUpdateForKeys(['count']),
    defaultProps({
        color: colors.black,
        backgroundColor: colors.primaryLight
    }),
    setPropTypes({
        count: PropTypes.number.isRequired,
        color: PropTypes.string,
        backgroundColor: PropTypes.string
    })
);

export default enhance(Badge);
