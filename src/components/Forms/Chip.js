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
import { readableColor } from 'polished';

// Move these basic update and state handlers to an abstract

const Chip = ({
    aria,
    ariaLabel,
    label,
    onChange,
    checked,
    color = colors.secondary,
    ...props
}) => (
    <Label
        {...ariaLabel}
        {...props}
        color={color}
        checked={checked}
        textColor={readableColor(color)}
        // className={cx(className, {
        //     [activeClass]: checked,
        //     [css({
        //         color: textColor,
        //         borderColor: color,
        //         '&::before': {
        //             color,
        //             backgroundColor: textColor
        //         }
        //     })]: checked
        // })}
    >
        <Spring
            native
            to={{
                x: checked ? -1 * CHIP_DOT_DIMENSION - bsint(0.75) : 0
            }}
            config={config.stiff}
        >
            {({ x }) => (
                <Fragment>
                    <animated.span
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
                            css({
                                backgroundColor: color
                            }),
                            {
                                [dotActiveClass]: checked
                            }
                        )}
                    />
                </Fragment>
            )}
        </Spring>
    </Label>
);

Chip.propTypes = {
    ...requiredPropTypes,
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    textColor: PropTypes.string
};

const enhance = compose(withAriaProps(), onlyUpdateForKeys(['checked']));

export default enhance(Chip);
