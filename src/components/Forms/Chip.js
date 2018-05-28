import React, { Component, Fragment } from 'react';
import {
    compose,
    setPropTypes,
    defaultProps,
    onlyUpdateForKeys
} from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config } from 'react-spring';
import { cx, css } from 'emotion';
import {
    ChipLabel as Label,
    chipDotClass as dotClass,
    chipActiveClass as activeClass,
    chipDotActiveClass as dotActiveClass,
    chipLabelTextClass as textClass,
    CHIP_DOT_DIMENSION
} from './Chip.styles';
import { requiredPropTypes, withAriaProps } from './Forms.shared';
import { colors, bsint } from '../../settings/styles';

// Move these basic update and state handlers to an abstract

const Chip = ({
    aria,
    ariaLabel,
    label,
    className,
    onChange,
    checked,
    name,
    ...props
}) => (
    <Label
        {...ariaLabel}
        // tabIndex={props.tabIndex || 0}
        className={cx(
            className,
            checked
                ? css(
                      activeClass,
                      `&::before {color: ${props.color}; background-color: ${
                          props.textColor
                      }; transform: scale(1);}; `
                  )
                : null
        )}
        style={{
            borderColor: checked ? props.color : colors.grey1,
            color: checked ? props.textColor : null
        }}
    >
        <Spring
            native
            to={{
                x: checked ? -1 * CHIP_DOT_DIMENSION - bsint(0.75) : 0
            }}
            config={config.stiff}
        >
            {({ x }) => {
                return (
                    <Fragment>
                        <animated.span
                            id={props.name}
                            className={textClass}
                            style={{
                                transform: x.interpolate(
                                    x => `translate3d(${x}px, 0px, 0)`
                                )
                            }}
                        >
                            {label}
                        </animated.span>
                        <animated.span
                            {...aria}
                            className={cx(
                                dotClass,
                                checked ? dotActiveClass : null
                            )}
                            style={{
                                backgroundColor: props.color
                            }}
                        />
                    </Fragment>
                );
            }}
        </Spring>
    </Label>
);

const enhance = compose(
    defaultProps({
        color: colors.secondary,
        textColor: colors.white
    }),
    setPropTypes({
        ...requiredPropTypes,
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        textColor: PropTypes.string
    }),
    withAriaProps(),
    onlyUpdateForKeys(['checked'])
);

export default enhance(Chip);
