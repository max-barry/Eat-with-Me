import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys, compose, setPropTypes } from 'recompose';
import {
    ToggleLabel,
    ToggleLabelText,
    ToggleTitle,
    ToggleTag
} from './Toggle.styles';

const propsRequired = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

const enhanceToggle = compose(
    onlyUpdateForKeys(['checked']),
    setPropTypes(propsRequired)
);

const Toggle = enhanceToggle(
    class extends Component {
        state = { checked: this.props.checked };

        update() {
            const checked = !this.state.checked;
            this.setState({ checked });
            this.props.onChange(checked);
        }

        render() {
            return (
                <Switch
                    checked={this.state.checked}
                    onChange={() => this.update()}
                    id={this.props.id}
                />
            );
        }
    }
);

export default Toggle;

const propsRequiredWithLabel = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    tag: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ...propsRequired
};

const enhanceToggleLabel = compose(
    onlyUpdateForKeys(['checked']),
    setPropTypes(propsRequiredWithLabel)
);

export const ToggleWithLabel = enhanceToggleLabel(
    ({ title: TitleComponent, tag: TagComponent, ...props }) => (
        <ToggleLabel for={props.id}>
            <ToggleLabelText>
                <ToggleTitle>
                    <TitleComponent />
                </ToggleTitle>
                {TagComponent && (
                    <ToggleTag>
                        <TagComponent />
                    </ToggleTag>
                )}
            </ToggleLabelText>
            <Toggle {...props} />
        </ToggleLabel>
    )
);
