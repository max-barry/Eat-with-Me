import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { readableColor } from 'polished';
import {
    colors,
    shevy,
    dimensions,
    isCursor,
    bs,
    styles,
    mq
} from '../../settings';
import {
    changeActions,
    defaultColor,
    LabelTitle,
    LabelTag
} from './Inputs.shared';

const border = `1px solid ${colors.greyDark}`;
const bevel = dimensions.bevel;
const size = dimensions.tap;

const List = styled('ul')(({ disabled, hasLabel }) => ({
    display: 'flex',
    marginTop: hasLabel ? bs(0.5) : 0,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    cursor: disabled ? 'not-allowed' : 'auto'
}));

const Step = styled('li')(shevy.h6, ({ checked, color }) => ({
    border,
    cursor: 'pointer',
    textAlign: 'center',
    minHeight: size,
    minWidth: size,
    lineHeight: `${size}px`,
    borderRight: 0,
    padding: `0 ${bs(0.5)}`,
    position: 'relative',
    backgroundColor: checked ? color : 'transparent',
    color: checked ? readableColor(color) : colors.black,
    userSelect: 'none',
    '&[aria-disabled="true"]': { display: 'none' },
    '&:first-child': {
        borderTopLeftRadius: bevel,
        borderBottomLeftRadius: bevel
    },
    '&:last-child': {
        borderTopRightRadius: bevel,
        borderBottomRightRadius: bevel,
        borderRight: border
    },
    [isCursor]: {
        '&:hover, &:focus': {
            outline: 0,
            backgroundColor: checked ? styles.fn.focus(color) : colors.grey1
        }
    }
}));

const Outer = styled('div')(mq({ maxWidth: [dimensions.input, 'none'] }));

const tagClass = css({ marginTop: 0, whiteSpace: 'normal', display: 'block' });

const Range = ({
    onChange,
    name,
    color,
    steps,
    title,
    tag,
    disabled,
    ...props
}) => (
    <Outer {...props}>
        {title && <LabelTitle>{title}</LabelTitle>}
        {tag && <LabelTag className={tagClass}>{tag}</LabelTag>}
        <List disabled={disabled} hasLabel={title || tag}>
            {steps.map(({ label, value, checked, skip }, i) => {
                const key = `${name}_${i}`;
                const attrs = {
                    key,
                    checked,
                    color,
                    id: key,
                    tabIndex: 0,
                    role: 'checkbox',
                    'aria-checked': checked,
                    ...changeActions(onChange, value || label)
                };
                return !skip && <Step {...attrs}>{label}</Step>;
            })}
        </List>
    </Outer>
);

Range.defaultProps = {
    color: defaultColor,
    disabled: false
};

Range.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            checked: PropTypes.bool.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            skip: PropTypes.bool
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    color: PropTypes.string,
    title: PropTypes.string,
    tag: PropTypes.string
};

export default Range;
