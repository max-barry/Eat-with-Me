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
import {
    ariaCheckboxProps,
    requiredPropTypes,
    withAriaProps
} from './Forms.shared';

class Checkbox extends Component {
    // state = { checked: this.props.checked };
    // checkboxRef = React.createRef();

    // constructor(props) {
    //     super(props);
    //     this.update = this.update.bind(this);
    // }

    // update(event) {
    //     // // Update the component state change
    //     // this.setState({ checked: !this.state.checked });
    //     // Call the passed onChange function
    //     this.props.onChange(this.state.checked, event);
    // }

    render() {
        const {
            checked,
            title: TitleComponent,
            tag: TagComponent,
            aria,
            ariaLabel,
            ...props
            // name
        } = this.props;
        return (
            <CheckboxContainer>
                <span
                    // ref={this.checkboxRef}
                    {...aria}
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
                <CheckboxLabel {...ariaLabel}>
                    <span className={CheckboxTitleStyles}>
                        {typeof TitleComponent === 'string' ? (
                            TitleComponent
                        ) : (
                            <TitleComponent />
                        )}
                    </span>
                    {TagComponent && (
                        <span className={CheckboxTagStyles}>
                            {typeof TagComponent === 'string' ? (
                                TagComponent
                            ) : (
                                <TagComponent />
                            )}
                        </span>
                    )}
                </CheckboxLabel>
            </CheckboxContainer>
        );
    }
}

const enhance = compose(
    setPropTypes({
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
            .isRequired,
        tag: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        ...requiredPropTypes
    }),
    withAriaProps(true)
);

export default enhance(Checkbox);
