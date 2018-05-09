import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { css, cx } from 'emotion';
import {
    CheckboxBoxWrap,
    CheckboxTitleStyles,
    CheckboxTagStyles,
    CheckboxContainer,
    CheckboxLabel,
    CheckboxCheckedClass,
    CheckboxBoxInnerStyles
} from './Checkbox.styles';
import { tick as svgtick } from '../SVGs/paths';
import { ariaCheckboxProps, requiredPropTypes } from './shared';

class Checkbox extends Component {
    state = { checked: this.props.checked };
    checkboxRef = React.createRef();

    update(event) {
        // Update the component state change
        this.setState({ checked: !this.state.checked });
        // Call the passed onChange function
        this.props.onChange(this.state.checked, event);
    }

    render() {
        const { checked } = this.state;
        const { title: TitleComponent, tag: TagComponent, name } = this.props;
        const checkboxProps = ariaCheckboxProps(
            checked,
            this.update.bind(this),
            {
                id: name,
                tabIndex: this.props.tabIndex
            }
        );
        return (
            <CheckboxContainer>
                <span
                    ref={this.checkboxRef}
                    {...checkboxProps}
                    className={cx(
                        CheckboxBoxWrap,
                        checked ? CheckboxCheckedClass : null
                    )}
                >
                    <span className={css(CheckboxBoxInnerStyles)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill={checked ? 'white' : 'black'}
                                fillRule="evenodd"
                                d={svgtick}
                            />
                        </svg>
                    </span>
                </span>
                <CheckboxLabel
                    for={name}
                    onClick={() => {
                        this.checkboxRef.current.focus();
                        this.update();
                    }}
                >
                    <span className={CheckboxTitleStyles}>
                        <TitleComponent />
                    </span>
                    {TagComponent && (
                        <span className={CheckboxTagStyles}>
                            <TagComponent />
                        </span>
                    )}
                </CheckboxLabel>
            </CheckboxContainer>
        );
    }
}

const ElementOrFunc = [PropTypes.element, PropTypes.func];

const enhance = compose(
    setPropTypes({
        title: PropTypes.oneOfType(ElementOrFunc).isRequired,
        tag: PropTypes.oneOfType(ElementOrFunc),
        ...requiredPropTypes
    })
);

export default enhance(Checkbox);
