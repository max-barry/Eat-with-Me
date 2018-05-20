import PropTypes from 'prop-types';
import { withProps } from 'recompose';

export const ariaCheckboxProps = (
    checked,
    updateFunc,
    { name, tabIndex = 0 }
) => ({
    tabIndex,
    role: 'checkbox',
    'aria-checked': checked,
    'aria-labelledby': name,
    id: `id_${name}`,
    onClick: event => updateFunc(!checked),
    onKeyPress: ({ charCode: key, ...event }) =>
        key === 32 || key === 13 ? updateFunc(!checked) : null
});

export const makeAriaCheckboxProps = (
    checked,
    name,
    tabIndex = 0,
    disabled = false
) => ({
    role: 'checkbox',
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-labelledby': `label_${name}`,
    id: `checkbox_${name}`,
    tabIndex: disabled ? null : tabIndex
});

export const makeAriaLabelProps = (
    checked,
    name,
    onChange,
    disabled = false
) => ({
    checked,
    id: `label_${name}`,
    'aria-disabled': disabled,
    htmlFor: `checkbox_${name}`,
    onClick: event => onChange(!checked),
    onKeyPress: ({ charCode: key, ...event }) =>
        key === 32 || key === 13 ? onChange(!checked) : null
});

export const withAriaProps = withProps(
    ({ checked, name, onChange, tabIndex }) => ({
        aria: makeAriaCheckboxProps(checked, name, tabIndex),
        ariaLabel: makeAriaLabelProps(checked, name, onChange)
    })
);

export const requiredPropTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number
};
