import React from 'react';
import { compose, setPropTypes, onlyUpdateForKeys } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import { requiredPropTypes, withAriaProps } from './Forms.shared';
import {
    ChipLiteLabel as Label,
    chipLiteActiveClass as activeClass,
    ChipCheckboxProxy as CheckboxProxy,
    CHIP_LITE_DOT_DIMENSION,
    CHIP_LITE_COLOR
} from './ChipLite.styles';
import { tick } from '../SVGs/paths';
import { Svg } from '../SVGs';

const ChipLite = ({
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
        {...props}
        className={cx(className, checked ? activeClass : null)}
    >
        <CheckboxProxy {...aria}>
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

const enhance = compose(
    setPropTypes({
        ...requiredPropTypes,
        label: PropTypes.string.isRequired
    }),
    withAriaProps(),
    onlyUpdateForKeys(['checked'])
);

export default enhance(ChipLite);
