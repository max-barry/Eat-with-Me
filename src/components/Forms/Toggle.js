import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
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

const Toggle = ({ checked, onChange, name }) => (
    <Switch
        // className={toggleSwitchClass}
        checked={checked}
        onChange={onChange}
        id={name}
        offColor={colors.greyDark}
        onColor={colors.secondary}
        activeBoxShadow={`0px 0px 2px 3px ${transparentize(0.7, colors.black)}`}
    />
);

Toggle.propTypes = requiredPropTypes;

export default onlyUpdateForKeys(['checked'])(Toggle);

const toggleWithLabel = ({
    title: TitleComponent,
    tag: TagComponent,
    ...props
}) => (
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
);

toggleWithLabel.propTypes = {
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

export const ToggleWithLabel = onlyUpdateForKeys(['checked'])(toggleWithLabel);
