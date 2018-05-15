import React, { Component } from 'react';
import { compose, setPropTypes, onlyUpdateForKeys, withState } from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config } from 'react-spring';
import {
    ChipLabel as Label,
    chipDotClass as checkDot,
    chipFocusClass as focusClass,
    chipLabelTextClass as textClass,
    CHIP_EDGE_PADDING,
    CHIP_DOT_DIMENSION
} from './Chip.styles';
import { ariaCheckboxProps, requiredPropTypes } from './shared';
import { colors, bs } from '../../settings/styles';
import { cross as crossSvgPath } from '../SVGs/paths';
import Svg from '../SVGs';
import { cx, css } from 'emotion';

// Move these basic update and state handlers to an abstract

const Chip = ({
    checked,
    onChange,
    label,
    color = colors.secondary,
    textColor = colors.white,
    ...props
}) => {
    const checkboxProps = ariaCheckboxProps(checked, onChange, props);
    // We want the tab index on the label not on the checkbox TODO : check roles aren't fucked with here
    delete checkboxProps.tabIndex;

    return (
        <Label
            onClick={checkboxProps.onClick}
            onKeyPress={checkboxProps.onKeyPress}
            tabIndex={props.tabIndex || 0}
            htmlFor={checkboxProps.id}
            className={props.className}
            data-checked={checked}
            style={{
                borderColor: checked ? color : colors.grey1
            }}
        >
            <Spring
                native
                config={config.gentle}
                from={{
                    backgroundColor: color
                }}
                to={{
                    transform: checked ? `scale(20)` : `scale(1)`,
                    transformLabel: checked
                        ? `translate3d(-${bs(1.5)}, 0px, 0)`
                        : `translate3d(0px, 0px, 0)`,
                    scaleClose: checked ? 'scale(1)' : 'scale(0)'
                }}
            >
                {styles => (
                    <animated.span>
                        <animated.span
                            id={props.name}
                            className={textClass}
                            style={{
                                color: checked ? textColor : 'inherit',
                                transform: styles.transformLabel
                            }}
                        >
                            {label}
                        </animated.span>
                        <animated.span
                            className={checkDot}
                            {...checkboxProps}
                            style={{
                                backgroundColor: styles.backgroundColor,
                                transform: styles.transform,
                                left: CHIP_EDGE_PADDING,
                                transformOrigin: `1px center`,
                                pointerEvents: checked ? 'none' : 'default'
                            }}
                        />
                        <animated.span
                            className={checkDot}
                            style={{
                                transform: styles.scaleClose,
                                right: CHIP_EDGE_PADDING,
                                backgroundColor: textColor
                            }}
                        >
                            <Svg
                                height={CHIP_DOT_DIMENSION * 0.65}
                                width="100%"
                                fill={color}
                                path={crossSvgPath}
                            />
                        </animated.span>
                    </animated.span>
                )}
            </Spring>
        </Label>
    );
};

const enhance = compose(
    setPropTypes({
        ...requiredPropTypes,
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        textColor: PropTypes.string
    })
);

export default enhance(Chip);
