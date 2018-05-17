import React, { Component, Fragment } from 'react';
import {
    compose,
    setPropTypes,
    onlyUpdateForKeys,
    withState,
    defaultProps,
    withHandlers,
    lifecycle
} from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config, Keyframes, interpolate } from 'react-spring';
import {
    ChipLabel as Label,
    chipDotClass as dotClass,
    chipActiveClass as activeClass,
    chipDotActiveClass as dotActiveClass,
    chipFocusClass as focusClass,
    chipLabelTextClass as textClass,
    CHIP_EDGE_PADDING,
    CHIP_DOT_DIMENSION,
    CHIP_HEIGHT
} from './Chip.styles';
import {
    ariaCheckboxProps,
    requiredPropTypes,
    withAriaProps
} from './Forms.shared';
import { colors, bs, bsint } from '../../settings/styles';
import { cross as crossSvgPath } from '../SVGs/paths';
import Svg from '../SVGs';
import { cx, css, keyframes } from 'emotion';

// Move these basic update and state handlers to an abstract

class Chip extends Component {
    render() {
        // const { checked, onChange, label, ...props } = this.props;
        const {
            aria,
            ariaLabel,
            label,
            className,
            onChange,
            checked,
            name,
            ...props
        } = this.props;

        // const checkboxProps = ariaCheckboxProps(checked, onChange, props);
        // We want the tab index on the label not on the checkbox TODO : check roles aren't fucked with here
        // delete checkboxProps.tabIndex;

        return (
            <Label
                {...ariaLabel}
                // tabIndex={props.tabIndex || 0}
                className={cx(
                    className,
                    checked
                        ? css(
                              activeClass,
                              `&::before {color: ${
                                  props.color
                              }; background-color: ${
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
    }
}

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
    withAriaProps
    // onlyUpdateForKeys([])
);

export default enhance(Chip);
