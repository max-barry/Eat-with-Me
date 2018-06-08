import React from 'react';
import { readableColor } from 'polished';
import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import PropTypes from 'prop-types';
import { colors } from '../../settings/styles';
import { transitionTimes, dimensions } from '../../settings/styles';

const Outer = styled('span')({
    fontSize: 10,
    lineHeight: `${dimensions.badge}px`,
    display: 'inline-block',
    width: dimensions.badge,
    height: dimensions.badge,
    borderRadius: '50%',
    textAlign: 'center',
    transformOrigin: 'center',
    transition: `transform ${transitionTimes.minimal}ms`,
    '&:empty': {
        transform: 'scale(0)'
    }
});

const Badge = ({
    count,
    style,
    backgroundColor = colors.primaryLight,
    ...props
}) => (
    <Outer
        style={{
            backgroundColor,
            color: readableColor(backgroundColor),
            ...style
        }}
        {...props}
    >
        {count || null}
    </Outer>
);

Badge.propTypes = {
    count: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string
};

export default onlyUpdateForKeys(['count'])(Badge);
