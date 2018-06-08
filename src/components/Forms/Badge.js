import React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import PropTypes from 'prop-types';
import { BadgeWrap } from './Badge.styles';
import { colors } from '../../settings/styles';
import { readableColor } from 'polished';

const Badge = ({
    count,
    style,
    backgroundColor = colors.primaryLight,
    ...props
}) => (
    <BadgeWrap
        style={{
            backgroundColor,
            color: readableColor(backgroundColor),
            ...style
        }}
        {...props}
    >
        {count || null}
    </BadgeWrap>
);

Badge.propTypes = {
    count: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string
};

export default onlyUpdateForKeys(['count'])(Badge);
