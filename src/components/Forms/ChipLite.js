import React, { Component } from 'react';
import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import {
    requiredPropTypes,
    ariaCheckboxProps,
    withAriaProps
} from './Forms.shared';
import {
    ChipLiteLabel as Label,
    chipLiteFocusedClass as focusedClass,
    chipLiteActiveClass as activeClass,
    ChipCheckboxProxy as CheckboxProxy,
    CHIP_LITE_DOT_DIMENSION,
    CHIP_LITE_COLOR
} from './ChipLite.styles';
import { tick } from '../SVGs/paths';
import Svg from '../SVGs';
import { colors } from '../../settings/styles';

class ChipLite extends Component {
    state = { focused: false };

    // componentDidUpdate(prevProps) {
    //     Object.keys(this.props).forEach(key => {
    //         if (this.props[key] !== prevProps[key]) {
    //             console.log(
    //                 key,
    //                 'changed from',
    //                 prevProps[key],
    //                 'to',
    //                 this.props[key]
    //             );
    //         }
    //     });
    // }

    render() {
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
        return (
            <Label
                {...ariaLabel}
                {...props}
                className={cx(
                    className,
                    checked ? activeClass : null,
                    this.state.focused ? focusedClass : null
                )}
            >
                <CheckboxProxy
                    {...aria}
                    onFocus={() => this.setState({ focused: true })}
                    onBlur={() => this.setState({ focused: false })}
                >
                    <Svg
                        height={CHIP_LITE_DOT_DIMENSION * 0.75}
                        width={CHIP_LITE_DOT_DIMENSION * 0.75}
                        fill={CHIP_LITE_COLOR}
                        path={tick}
                    />
                </CheckboxProxy>
                {label}
            </Label>
        );
    }
}

const enhance = compose(
    setPropTypes({
        ...requiredPropTypes,
        label: PropTypes.string.isRequired
    }),
    withAriaProps
);

export default enhance(ChipLite);
