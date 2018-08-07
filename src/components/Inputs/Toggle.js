import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { transparentize } from 'polished';
import styled from 'react-emotion';
import { colors, bs, mq } from '../../settings';
import {
    changeActions,
    Label,
    LabelTitle,
    LabelTag,
    defaultColor
} from './Inputs.shared';

const Outer = styled('div')(
    mq({
        display: 'flex',
        alignItems: 'center',
        justifyContent: ['flex-start', 'space-between']
    })
);

const activeBoxShadow = `0px 0px 2px 3px ${transparentize(0.7, colors.black)}`;

const Toggle = ({ checked, onChange, name, disabled, color, title, tag }) => {
    const attrs = {
        ...changeActions(onChange, !checked),
        'aria-disabled': disabled,
        style: { paddingRight: bs() }
    };

    const labelId = `label_${name}`;
    const checkId = `checkbox_${name}`;

    return (
        <Outer>
            <Label checked={checked} id={labelId} htmlFor={checkId} {...attrs}>
                {title && <LabelTitle>{title}</LabelTitle>}
                {tag && <LabelTag>{tag}</LabelTag>}
            </Label>
            <Switch
                id={checkId}
                role="checkbox"
                checked={checked}
                aria-checked={checked}
                aria-labelledby={labelId}
                disabled={disabled}
                onChange={onChange}
                offColor={colors.greyDark}
                onColor={color}
                activeBoxShadow={activeBoxShadow}
            />
        </Outer>
    );
};

Toggle.defaultProps = {
    color: defaultColor
};

Toggle.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    title: PropTypes.string,
    tag: PropTypes.string,
    color: PropTypes.string
};

export default Toggle;
