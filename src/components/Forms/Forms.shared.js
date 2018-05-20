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

const clickAction = (action, result) => event => action(result);
const keyPressAction = (action, result) => ({ charCode: key, ...event }) =>
    key === 32 || key === 13 ? action(result) : null;

export const makeAriaCheckboxProps = (
    checked,
    name,
    tabIndex = 0,
    disabled = false,
    action = false
) => ({
    role: 'checkbox',
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-labelledby': `label_${name}`,
    id: `checkbox_${name}`,
    tabIndex: disabled ? null : tabIndex,
    onClick: action ? clickAction(action, !checked) : null,
    onKeyPress: action ? keyPressAction(action, !checked) : null
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
    onClick: clickAction(onChange, !checked),
    onKeyPress: keyPressAction(onChange, !checked)
});

export const withAriaProps = (includeActionOnCheckbox = false) =>
    withProps(({ checked, name, onChange, tabIndex }) => ({
        aria: makeAriaCheckboxProps(
            checked,
            name,
            tabIndex,
            false,
            includeActionOnCheckbox ? onChange : false
        ),
        ariaLabel: makeAriaLabelProps(checked, name, onChange)
    }));

export const requiredPropTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number
};
