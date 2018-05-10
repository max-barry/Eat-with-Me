import PropTypes from 'prop-types';

export const ariaCheckboxProps = (
    checked,
    updateFunc,
    { id, tabIndex = 0 }
) => ({
    tabIndex,
    role: 'checkbox',
    'aria-checked': checked,
    'aria-labelledby': id,
    onClick: event => updateFunc(event),
    onKeyPress: ({ charCode: key, ...event }) =>
        key === 32 || key === 13 ? updateFunc(event) : null
});

export const requiredPropTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number
};
