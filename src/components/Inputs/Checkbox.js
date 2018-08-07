import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { position } from 'polished';
import { dimensions, colors, styles, mq } from '../../settings';
import successSvg from '../../../public/images/icons/success.svg';
import {
    changeActions,
    Label,
    LabelTitle,
    LabelTag,
    defaultColor
} from './Inputs.shared';

const INTERIOR_SPACE = (dimensions.tap - dimensions.icon) / 2;

const INTERIOR_POSITIONING = position(
    INTERIOR_SPACE,
    INTERIOR_SPACE,
    INTERIOR_SPACE,
    INTERIOR_SPACE
);

const Outer = styled('div')(
    mq({
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        maxWidth: dimensions.input
    })
);

const Checkmark = styled('span')(({ color }) => ({
    minHeight: dimensions.tap,
    minWidth: dimensions.tap,
    position: 'relative',
    display: 'block',
    '&:hover, &:focus': {
        outline: 0
    },
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        ...INTERIOR_POSITIONING
    },
    '&::before': {
        backgroundColor: colors.white,
        borderRadius: dimensions.bevel,
        border: `1px solid ${colors.greyDark}`
    },
    '&:active::before': {
        backgroundColor: colors.grey1
    },
    '&::after': {
        backgroundImage: `url(${successSvg})`,
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0
    },
    '&:active::after, &:hover::after, &:focus::after': {
        opacity: 0.18
    },
    '&[aria-checked="true"]::before': {
        backgroundColor: color
    },
    '&[aria-checked="true"]::after': {
        opacity: 1,
        filter: 'invert(1)'
    },
    '&[aria-checked="true"]:focus::before': {
        backgroundColor: styles.fn.focus(color)
    }
}));

const labelClass = css(
    mq({
        paddingLeft: [(dimensions.tap - dimensions.icon) / 2, 0],
        paddingRight: (dimensions.tap - dimensions.icon) / 2,
        maxWidth: [
            dimensions.input - dimensions.tap,
            `calc(100% - ${dimensions.tap}px)`
        ]
    })
);

const Checkbox = ({
    checked,
    name,
    disabled,
    onChange,
    tabIndex,
    title,
    tag,
    badge,
    color,
    ...props
}) => {
    const attrs = {
        ...changeActions(onChange, !checked),
        'aria-disabled': disabled
    };

    const labelId = `label_${name}`;
    const checkId = `checkbox_${name}`;

    return (
        <Outer {...props}>
            <Checkmark
                id={checkId}
                role="checkbox"
                aria-checked={checked}
                aria-labelledby={labelId}
                tabIndex={disabled ? null : tabIndex}
                color={color}
                {...attrs}
            />
            <Label
                checked={checked}
                id={labelId}
                htmlFor={checkId}
                className={labelClass}
                {...attrs}
            >
                <LabelTitle>
                    {title} {badge && <em>{badge}</em>}
                </LabelTitle>
                {tag && <LabelTag>{tag}</LabelTag>}
            </Label>
        </Outer>
    );
};

Checkbox.defaultProps = {
    checked: false,
    disabled: false,
    tabIndex: 0,
    color: defaultColor
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    color: PropTypes.string.isRequired,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Checkbox;
