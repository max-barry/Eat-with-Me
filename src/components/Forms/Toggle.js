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
import { requiredPropTypes } from './shared';
import { colors } from '../../settings/styles';

const enhanceToggle = compose(
    onlyUpdateForKeys(['checked']),
    setPropTypes(requiredPropTypes)
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
                    id={this.props.name}
                    offColor={colors.grey2}
                    onColor={colors.secondary}
                />
            );
        }
    }
);

export default Toggle;

const propsRequiredWithLabel = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    tag: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ...requiredPropTypes
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
