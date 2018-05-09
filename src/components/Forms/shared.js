import PropTypes from 'prop-types';

export const ariaCheckboxProps = (
    checked,
    updateFunc,
    { id, tabIndex = 0 }
) => ({
    id,
    tabIndex,
    role: 'checkbox',
    'aria-checked': checked,
    'aria-labelledby': id,
    onClick: event => updateFunc(event),
    onKeyPress: ({ charCode: key, ...event }) =>
        key === 32 || key === 13 ? updateFunc(event) : null
});

const ElementOrFunc = [PropTypes.element, PropTypes.func];

export const requiredPropTypes = {
    name: PropTypes.string.isRequired,
    // title: PropTypes.oneOfType(ElementOrFunc).isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number
    // tag: PropTypes.oneOfType(ElementOrFunc)
};

// id={this.props.name}
// tabIndex={this.props.tabIndex || 0}
// role="checkbox"
// aria-checked={checked}
// aria-labelledby={this.labelName}
// onClick={event => this.update(event)}
// onKeyPress={event =>
//     [32, 13].includes(event.charCode)
//         ? this.update(event)
//         : null
// }

// ref={this.checkboxRef}

// id={this.props.name}
// tabIndex={this.props.tabIndex || 0}
// role="checkbox"
// aria-checked={checked}
// aria-labelledby={this.labelName}
// onClick={event => this.update(event)}
// onKeyPress={event =>
//     [32, 13].includes(event.charCode)
//         ? this.update(event)
//         : null
// }
