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

class Checkbox extends Component {
    state = { checked: this.props.checked };
    checkboxRef = React.createRef();
    labelName = `${this.props.name}`;

    update(event) {
        // Update the component state change
        this.setState({ checked: !this.state.checked });
        // Call the passed onChange function
        this.props.onChange(this.state.checked, event);
    }

    render() {
        const { checked } = this.state;
        const { title: TitleComponent, tag: TagComponent } = this.props;
        return (
            <CheckboxContainer>
                <span
                    id={this.props.name}
                    ref={this.checkboxRef}
                    tabIndex={this.props.tabIndex || 0}
                    role="checkbox"
                    aria-checked={checked}
                    aria-labelledby={this.labelName}
                    onClick={event => this.update(event)}
                    className={cx(
                        CheckboxBoxWrap,
                        checked ? CheckboxCheckedClass : null
                    )}
                    onKeyPress={event =>
                        [32, 13].includes(event.charCode)
                            ? this.update(event)
                            : null
                    }
                >
                    <span className={css(CheckboxBoxInnerStyles)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            // height={dimensions.icon}
                            // width={dimensions.icon}
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
                    for={this.labelName}
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
        name: PropTypes.string.isRequired,
        title: PropTypes.oneOfType(ElementOrFunc).isRequired,
        onChange: PropTypes.func.isRequired,
        checked: PropTypes.bool.isRequired,
        tabIndex: PropTypes.number,
        tag: PropTypes.oneOfType(ElementOrFunc)
    })
);

export default enhance(Checkbox);
