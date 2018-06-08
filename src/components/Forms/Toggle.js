import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys, compose, setPropTypes } from 'recompose';
import { transparentize } from 'polished';
import {
    ToggleLabel,
    ToggleLabelText,
    ToggleTitle,
    ToggleTag
} from './Toggle.styles';
import { requiredPropTypes } from './Forms.shared';
import { colors } from '../../settings/styles';

// TODO : Make this totally controlled by the parent

const enhanceToggle = compose(
    setPropTypes(requiredPropTypes),
    onlyUpdateForKeys(['checked'])
);

const Toggle = enhanceToggle(({ checked, onChange, name }) => (
    <Switch
        // className={toggleSwitchClass}
        checked={checked}
        onChange={onChange}
        id={name}
        offColor={colors.greyDark}
        onColor={colors.secondary}
        activeBoxShadow={`0px 0px 2px 3px ${transparentize(0.7, colors.black)}`}
    />
));

export default Toggle;

const propsRequiredWithLabel = {
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
    ]).isRequired,
    tag: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
    ]),
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
                    {typeof TitleComponent === 'string' ? (
                        TitleComponent
                    ) : (
                        <TitleComponent />
                    )}
                </ToggleTitle>
                {TagComponent && (
                    <ToggleTag>
                        {typeof TagComponent === 'string' ? (
                            TagComponent
                        ) : (
                            <TagComponent />
                        )}
                    </ToggleTag>
                )}
            </ToggleLabelText>
            <Toggle {...props} />
        </ToggleLabel>
    )
);
