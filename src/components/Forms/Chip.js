import React, { Component } from 'react';
import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config } from 'react-spring';
import {
    ChipLabel as Label,
    chipDotClass as checkDot,
    chipLabelTextClass as textClass,
    CHIP_EDGE_PADDING,
    CHIP_DOT_DIMENSION
} from './Chip.styles';
import { ariaCheckboxProps, requiredPropTypes } from './shared';
import { colors, bs } from '../../settings/styles';
import { cross as crossSvgPath } from '../SVGs/paths';
import Svg from '../SVGs';

// Move these basic update and state handlers to an abstract

class Chip extends Component {
    state = { checked: this.props.checked };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    update(event) {
        // Update the component state change
        this.setState({ checked: !this.state.checked });
        // Call the passed onChange function
        this.props.onChange(this.state.checked, event);
    }

    render() {
        const {
            color = colors.primary,
            textColor = 'white',
            title,
            ...props
        } = this.props;
        const checkboxProps = ariaCheckboxProps(
            this.state.checked,
            this.update,
            props
        );
        // const { paddingTop: top, paddingLeft: left } = chipLabelPadding;
        return (
            <Label
                onClick={this.update}
                htmlFor={props.id}
                style={{
                    color: this.state.checked ? textColor : 'inherit'
                }}
            >
                <Spring
                    native
                    config={config.gentle}
                    from={{
                        backgroundColor: color
                    }}
                    to={{
                        transform: this.state.checked
                            ? `scale(25)`
                            : `scale(1)`,
                        transformLabel: this.state.checked
                            ? `translate3d(-${bs(1.5)}, 0px, 0)`
                            : `translate3d(0px, 0px, 0)`,
                        scaleClose: this.state.checked ? 'scale(1)' : 'scale(0)'
                    }}
                >
                    {styles => (
                        <animated.span>
                            <animated.span
                                className={checkDot}
                                style={{
                                    backgroundColor: styles.backgroundColor,
                                    transform: styles.transform,
                                    left: CHIP_EDGE_PADDING
                                }}
                                {...checkboxProps}
                            />
                            <animated.span
                                className={textClass}
                                style={{
                                    transform: styles.transformLabel
                                }}
                            >
                                {title}
                                {/* My rather long label */}
                            </animated.span>
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
                                    width={CHIP_DOT_DIMENSION * 0.8}
                                    fill={color}
                                    path={crossSvgPath}
                                />
                            </animated.span>
                        </animated.span>
                    )}
                </Spring>
            </Label>
        );
    }
}

const enhance = compose(
    setPropTypes({
        ...requiredPropTypes,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        textColor: PropTypes.string
    })
);

export default enhance(Chip);
