import PropTypes from 'prop-types';

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
    onClick: event => {
        console.log('checked');
        updateFunc(!checked);
    },
    onKeyPress: ({ charCode: key, ...event }) =>
        key === 32 || key === 13 ? updateFunc(!checked) : null
});

export const requiredPropTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number
};
