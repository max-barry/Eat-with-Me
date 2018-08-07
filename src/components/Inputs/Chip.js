import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Spring, animated, config } from 'react-spring';
import styled, { css } from 'react-emotion';
import { compose, onlyUpdateForKeys } from 'recompose';
import { readableColor, ellipsis, padding, size } from 'polished';
import {
    bsint,
    colors,
    bs,
    fontWeights,
    shevy,
    transitionTimes,
    easings,
    dimensions,
    styles
} from '../../settings';
import { changeActions, defaultColor } from './Inputs.shared';

const CHIP_EDGE_PADDING = bs(0.75);
const CHIP_VERTICAL_DOT_PADDING = bs(0.25);
const CHIP_MAX_WIDTH = dimensions.input;
const CHIP_HEIGHT = dimensions.icon;
const CHIP_DOT_DIMENSION = 16;

const dot = {
    height: CHIP_DOT_DIMENSION,
    width: CHIP_DOT_DIMENSION,
    left: CHIP_EDGE_PADDING,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: '50%',
    top: '22%',
    zIndex: -1,
    willChange: 'transform',
    transformOrigin: 'center',
    transition: `transform ${transitionTimes.short}ms ${easings.standard}`,
    '&:focus': {
        outline: 0
    }
};

const Label = onlyUpdateForKeys(['checked', 'color'])(
    styled('label')(({ checked, color }) => {
        const readable = readableColor(color);
        return {
            cursor: 'pointer',
            backgroundColor: checked ? color : colors.white,
            color: checked ? readable : colors.black,
            fontSize: shevy.h6.fontSize,
            fontWeight: fontWeights.medium,
            position: 'relative',
            border: `1px solid ${colors.grey1}`,
            height: CHIP_HEIGHT,
            lineHeight: `${CHIP_HEIGHT}px`,
            borderRadius: dimensions.bevel * 2,
            zIndex: 0,
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            maxWidth: CHIP_MAX_WIDTH,
            ...padding(
                CHIP_VERTICAL_DOT_PADDING,
                bs(0.5),
                CHIP_VERTICAL_DOT_PADDING,
                bs(2)
            ),
            '&:before': {
                content: '"×"',
                right: CHIP_EDGE_PADDING,
                fontSize: CHIP_DOT_DIMENSION + 4,
                lineHeight: `${CHIP_DOT_DIMENSION + 2}px`,
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                borderRadius: '50%',
                transform: checked ? 'none' : 'scale(1)',
                color: checked ? color : 'transparent',
                backgroundColor: checked ? readable : 'transparent',
                ...size(CHIP_DOT_DIMENSION, CHIP_DOT_DIMENSION)
            },
            '&:focus-within': {
                backgroundColor: colors.grey1
            },
            '& *:focus': {
                backgroundColor: styles.fn.focus(color)
            }
        };
    })
);

const Chip = ({
    label,
    onChange,
    checked,
    color,
    name,
    tabIndex,
    disabled,
    ...props
}) => {
    const labelStyles = { ...ellipsis(), display: 'block' };
    const checkmarkClass = css({
        ...dot,
        backgroundColor: color,
        transform: checked ? 'scale(30)' : 'none'
    });

    const labelId = `label_${name}`;
    const checkId = `checkbox_${name}`;

    const attrs = {
        ...changeActions(onChange, !checked),
        'aria-disabled': disabled
    };

    return (
        <Label
            color={color}
            checked={checked}
            id={labelId}
            htmlFor={checkId}
            {...attrs}
            {...props}
        >
            <Spring
                native
                config={config.stiff}
                to={{
                    x: checked ? -1 * CHIP_DOT_DIMENSION - bsint(0.75) : 0
                }}
            >
                {({ x }) => (
                    <Fragment>
                        <animated.span
                            style={{
                                ...labelStyles,
                                transform: x.interpolate(
                                    x => `translate3d(${x}px, 0px, 0)`
                                )
                            }}
                        >
                            {label}
                        </animated.span>
                        <animated.span
                            id={checkId}
                            role="checkbox"
                            aria-checked={checked}
                            aria-labelledby={labelId}
                            tabIndex={disabled ? null : tabIndex}
                            className={checkmarkClass}
                            {...attrs}
                        />
                    </Fragment>
                )}
            </Spring>
        </Label>
    );
};

Chip.defaultProps = {
    color: defaultColor,
    tabIndex: 0,
    disabled: false
};

Chip.propTypes = {
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number
};

const enhance = compose(onlyUpdateForKeys(['checked']));

export default enhance(Chip);
